(() => {
  "use strict";
  const actionArray = [
    "あくなき探求",
    "不屈の心体",
    "理想への共感",
    "心を動かす",
    "知識を増やす",
    "公明正大",
  ];
  kintone.events.on("app.record.create.show", (event) => {
    const record = event.record;
    console.log(record);
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
  });
})();
