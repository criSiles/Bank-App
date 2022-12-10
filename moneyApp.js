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
  calculatingSavings();
});

function printHistory(movement) {
  const histroyList = document.querySelector("#history");

  let idNumber = document.querySelectorAll("#history article").length;

  const movementElement = document.createElement("article");
  movementElement.setAttribute("id", idNumber);

  let movementContent = `
  <p>${movement.description} <span>${movement.amount}</span></p>
  <button onclick="deleteTransaction(${idNumber})" id="removeTransaction">Delete transaction</button>`;

  movementElement.innerHTML = movementContent;
  histroyList.prepend(movementElement);
}

function printMoney(money, add = true) {
  let mySelector;

  if (money > 0) {
    mySelector = document.querySelector("#income");
  } else {
    mySelector = document.querySelector("#outcome");
  }

  if (add == true) {
    mySelector.innerHTML = (parseFloat(mySelector.innerHTML) + Math.abs(money)).toFixed(2);
  } else {
    mySelector.innerHTML = (parseFloat(mySelector.innerHTML) - Math.abs(money)).toFixed(2);
  }
}

function deleteTransaction(transactionID) {
  console.log(transactionID);

  const removeConfirmation = window.confirm(
    "Are you sure of deleting this transaction?"
  );

  if (removeConfirmation) {
    const transactionElement = document.getElementById(transactionID);
    printMoney(parseFloat(transactionElement.querySelector("p span").innerHTML), false);
    calculatingSavings();

    transactionElement.remove();
  }
}

function calculatingSavings() {
  const income = parseFloat(document.querySelector("#income").innerHTML);
  const outcome = parseFloat(document.querySelector("#outcome").innerHTML);
  const savings = document.querySelector("#savings");

  savings.innerHTML = (income - outcome).toFixed(2);
}
