(() => {
  "use strict";

  kintone.events.on(
    ["app.record.create.submit", "app.record.edit.submit"],
    async (event) => {
      try {
        const body = {
          app: kintone.app.getId(),
          fields: ["重複禁止項目"],
        };
        const duplicationCheckValue = event.record["重複禁止項目"].value;
        const resp = await kintone.api(
          kintone.api.url("/k/v1/records.json", true),
          "GET",
          body
        );
        const duplicateFlag = resp.records.some(
          (record) => record["重複禁止項目"].value === duplicationCheckValue
        );
        if (duplicateFlag) {
          return window.confirm(
            "重複しているレコードが存在します。このまま保存しますか？"
          );
        }
      } catch (err) {
        console.error(err);
        window.alert("保存に失敗しました。しばらくしてから再度お試しください");
      }
    }
  );
})();
