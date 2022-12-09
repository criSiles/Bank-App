const addTransactionFormElement = document.querySelector("#addTransactionForm");

addTransactionFormElement.addEventListener("submit", async (event) => {
  event.preventDefault();

  const inputMoneyElement = document.querySelector("#amount");
  const inputDescriptionElement = document.querySelector("#description");

  let transaction = {
    amount: inputMoneyElement.value,
    description: inputDescriptionElement.value,
  };

  printHistory(transaction);
  printMoney(transaction.amount);
});

function printHistory(movement) {
  const histroyList = document.querySelector("#history");

  const movementElement = document.createElement("article");

  let movementContent = `
  <p>${movement.description} ${movement.amount}</p>`;

  movementElement.innerHTML = movementContent;
  histroyList.prepend(movementElement);
}

function addIncome(money){
  const totalIncome = document.querySelector("#income");
  // totalIncome.value += money;
  // totalIncome = totalIncome + money;
}

function addOutcome(money){
  const totalOutcome = document.querySelector("#outcome");
  totalOutcome += Math.abs(money);
}

function printMoney(money) {
  if (money > 0) {
    addIncome(money);
  } else {
    addOutcome(money);
  }
}