"use strict";

const categoryObj = {
  company: "企業情報",
  product: "製品",
  ir: "IR情報",
};

const truncate = (str, len) => {
  return str.length <= len ? str : `${str.substr(0, len)}...`;
};
const assignCategoryClass = (tag, categoryLabel) => {
  Object.keys(categoryObj).forEach((key) => {
    if (categoryLabel === key) {
      tag.classList.add(`cat-${key}`);
      return;
    }
  });
};

const setNewsList = (data) => {
  const tableTag = document.getElementById("news-table");
  data.forEach((datum) => {
    const trTag = document.createElement("tr");
    const dateTdTag = document.createElement("td");
    const categoryTdTag = document.createElement("td");
    const titleTdTag = document.createElement("td");
    const titleATag = document.createElement("a");

    dateTdTag.classList.add("date-cell");
    categoryTdTag.classList.add("category-cell");
    titleTdTag.classList.add("title-cell");

    assignCategoryClass(categoryTdTag, datum.label.value);
  
    dateTdTag.textContent = datum.day.value;
    categoryTdTag.textContent = categoryObj[datum.label.value];
    titleATag.textContent = truncate(datum.content.value, 30);
    titleATag.href = datum.url.value;
    titleATag.target = datum.target.value;

    titleTdTag.appendChild(titleATag);

    trTag.appendChild(dateTdTag);
    trTag.appendChild(categoryTdTag);
    trTag.appendChild(titleTdTag);

    tableTag.appendChild(trTag);
  });
};

const fetchEventList = () => {
  axios
    .get(
      "https://oykh3vmu623yt5rufrstzlyxyi0kitod.lambda-url.ap-northeast-1.on.aws/",
      {
        params: {
          id: "dojo",
          query: "order by day desc limit 3",
        },
      }
    )
    .then((resp) => {
      setNewsList(resp.data);
    })
    .catch((err) => {
      console.error(err);
    });
};
fetchEventList();
