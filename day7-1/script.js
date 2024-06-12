(() => {
  "use strict";

  const fetchActionArray = async () => {
    const body = {
      app: kintone.app.getId(),
    };
    try {
      const resp = await kintone.api(
        kintone.api.url("/k/v1/form.json", true),
        "GET",
        body
      );
      const tableProperty = resp.properties.filter(
        (property) => property.code === "Table"
      )[0];
      if (!tableProperty) throw new Error("table property not found");

      const targetField = tableProperty.fields.filter(
        (field) => field.code === "Action5"
      )[0];
      if (!targetField) throw new Error("target field not found");

      return targetField.options;
    } catch (err) {
      throw err;
    }
  };

  kintone.events.on("app.record.create.show", async (event) => {
    try {
      const actionArray = await fetchActionArray(event.record.id);
      const newTableArray = [];
      actionArray.forEach((action, index) => {
        const newRow = {
          id: `${index}`,
          value: {
            Action5: {
              type: "DROP_DOWN",
              value: `${action}`,
            },
            状況: {
              type: "CHECK_BOX",
              value: ["未振り返り"],
            },
            課題: {
              type: "MULTI_LINE_TEXT",
              value: "",
            },
          },
        };
        newTableArray.push(newRow);
      });
      event.record.Table.value = newTableArray;
      return event;
    } catch (err) {
      console.error(err);
      window.alert(
        "フォームデータの取得に失敗しました。リロードして解消されない場合、管理者に問い合わせてください。"
      );
    }
  });
})();
