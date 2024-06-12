(() => {
  "use strict";
  const monitoredFieldCodes = ["日付", "サイボウズ製品", "管理番号"];

  const productObj = {
    kintone: "KN",
    Garoon: "GR",
    "サイボウズ Office": "OF",
    Mailwise: "MW",
  };

  const createEventsArray = monitoredFieldCodes.map(
    (code) => `app.record.create.change.${code}`
  );
  const editEventsArray = monitoredFieldCodes.map(
    (code) => `app.record.edit.change.${code}`
  );

  kintone.events.on(
    ["app.record.create.show", "app.record.edit.show"],
    (event) => {
      event.record["重複禁止項目_文字列"].disabled = true;
      return event;
    }
  );

  kintone.events.on([...createEventsArray, ...editEventsArray], (event) => {
    const dateValue = event.record["日付"].value;
    const productValue = event.record["サイボウズ製品"].value;
    const manageValue = event.record["管理番号"].value;

    // dateValueがundefinedの場合も重複を許さない
    const formattedDateValue = dateValue
      ? dateFns.format(dateValue, "yyyyMMdd")
      : "";
    const convertedProductValue = productObj[productValue];
    const joinedValue = `${formattedDateValue}-${convertedProductValue}-${manageValue}`;

    // dateValueがundefinedの場合も重複を許さない
    if (!convertedProductValue || !manageValue) {
      event.record["重複禁止項目_文字列"].value = "";
      return event;
    }
    event.record["重複禁止項目_文字列"].value = joinedValue;
    return event;
  });
})();
