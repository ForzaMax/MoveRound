const roundNode = document.querySelector(".round");
const dataOfTimeClick = [];
const LENGTH_OF_HISTORY_LIST = 8;
roundNode.addEventListener("click", moveRound);

function moveRound(e) {
  roundNode.style.animation = "none";

  if (document.querySelector("h1")) document.querySelector("h1").remove();

  const history = document.querySelector(".history");

  if (!history.classList.contains("show")) {
    history.classList.add("show");
  }

  const viewportWidth = window.innerWidth - history.offsetWidth;
  const viewportHeight = window.innerHeight;

  console.log(viewportWidth, viewportHeight);

  const roundNodeWidth = roundNode.offsetWidth;
  const roundNodeHeight = roundNode.offsetHeight;

  console.log(roundNodeWidth, roundNodeHeight);

  const maxWidth = viewportWidth - roundNodeWidth;
  const maxHeight = viewportHeight - roundNodeHeight;

  console.log(maxWidth, maxHeight);

  const randomX = Math.random() * maxWidth;
  const randomY = Math.random() * maxHeight;

  console.log(randomX, randomY);

  roundNode.style.transform = `translate(${randomX}px, ${randomY}px)`;

  let time = e.timeStamp / 1000;

  dataOfTimeClick.push(time);
  console.log(`Время: ${time} с`);

  renderHistoryBlock();
}

let differenceData = [];
let lastDifference = 0;
let bestResult = 0;

function renderHistoryBlock() {
  const historyList = document.querySelector(".history-list");
  const listItem = document.createElement("li");
  listItem.classList.add("list-item");
  const currentResult = document.querySelector(".current-result");
  const bestResultNode = document.querySelector(".best-result");

  if (dataOfTimeClick.length >= 2) {
    if (dataOfTimeClick.length > 2) {
      let theBestResult = Math.min(...differenceData);
      bestResultNode.classList.add("show");
      bestResultNode.textContent = theBestResult;

      if (bestResult === 0 || theBestResult < bestResult) {
        bestResult = theBestResult;
        showNewRecordAnimation();
      } else {
        bestResult = theBestResult;
      }
    }

    let secondLastNumber = parseFloat(
      dataOfTimeClick[dataOfTimeClick.length - 2]
    );
    let lastNumber = parseFloat(dataOfTimeClick[dataOfTimeClick.length - 1]);
    let currentDifference = Math.abs(
      parseFloat((secondLastNumber - lastNumber).toFixed(3))
    );

    differenceData.push(currentDifference);

    if (lastDifference === 0) {
      lastDifference = currentDifference;
    } else {
      if (currentDifference > lastDifference) {
        listItem.style.borderColor = "rgb(247, 247, 247)";
        listItem.style.backgroundColor = "#ff8282";
        currentResult.style.borderBottom = "4px #ff8282 solid";
      } else if (currentDifference < lastDifference) {
        listItem.style.borderColor = "#90fdf2";
        listItem.style.backgroundColor = "rgb(70, 226, 106)";
        currentResult.style.borderBottom = "4px rgb(70, 226, 106) solid";
      }
    }

    listItem.textContent = `Время: ${currentDifference} с`;
    historyList.append(listItem);

    currentResult.textContent = currentDifference;

    if (historyList.children.length > LENGTH_OF_HISTORY_LIST) {
      historyList.removeChild(historyList.children[0]);
    }

    lastDifference = currentDifference;
  }
}

function showNewRecordAnimation() {
  const newRecordPopup = document.getElementById("newRecord");
  newRecordPopup.style.display = "block";
  newRecordPopup.style.animation = "showNewRecord 2s forwards";

  newRecordPopup.addEventListener(
    "animationend",
    () => {
      newRecordPopup.style.display = "none";
    },
    { once: true }
  );
}
