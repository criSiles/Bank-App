const addTransactionFormElement = document.querySelector("#addTransactionForm");
addTransactionFormElement.addEventListener("submit", async (event) => {
  event.preventDefault();

  const inputMoneyElement = document.querySelector("#amount");
  const inputDescriptionElement = document.querySelector("#description");

  let transaction = {
    amount: inputMoneyElement.value,
    description: inputDescriptionElement.value,
  };

  inputMoneyElement.value = "";
  inputDescriptionElement.value = "";
  if (transaction.amount != "" && transaction.description != "") {
    printHistory(transaction);
    printMoney(transaction.amount);
    updateSavings();
    addTransactionToLocalStorage(transaction);
  } else {
    window.alert("Please fill both camps");
  }
});

function getTransactionsFromLocalStorage() {
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  return transactions;
}

function addTransactionToLocalStorage(transaction) {
  let transactions = getTransactionsFromLocalStorage();

  transactions.push(transaction);

  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function removeTransactionInLocalStorage(transaction) {
  let transactions = getTransactionsFromLocalStorage();

  // Find the transaction index through its id and its amount
  let transactionIndex = transactions.findIndex(
    t =>
      t.description === transaction.description &&
      parseFloat(t.amount) === transaction.amount
  );

  // Remove the transaction from the array
  transactions.splice(transactionIndex, 1);

  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function printHistory(transaction) {
  const histroyList = document.querySelector("#history");

  let idNumber = document.querySelectorAll("#history article").length;

  const transactionElement = document.createElement("article");
  transactionElement.setAttribute("id", idNumber);

  let transactionContent = `
  <p>${transaction.description} ${transaction.amount}</p>
  <button onclick="deleteTransaction(${idNumber})" id="removeTransaction">Delete transaction</button>`;

  // Write the transaction content in the article

  transactionElement.innerHTML = transactionContent;
  histroyList.prepend(transactionElement);
}

function printMoney(money, add = true) {
  let mySelector;

  if (money > 0) {
    mySelector = document.querySelector("#income");
  } else {
    mySelector = document.querySelector("#outcome");
  }

  if (add == true) {
    mySelector.innerHTML = (
      parseFloat(mySelector.innerHTML) + Math.abs(money)
    ).toFixed(2);
  } else {
    mySelector.innerHTML = (
      parseFloat(mySelector.innerHTML) - Math.abs(money)
    ).toFixed(2);
  }
}

function deleteTransaction(transactionID) {
  const removeConfirmation = window.confirm(
    "Are you sure of deleting this transaction?"
  );

  if (removeConfirmation) {
    const transactionElement = document.getElementById(transactionID);
    let amount = parseFloat(
      transactionElement.querySelector("p").innerHTML.split(" ")[1]
    );
    let description =
      transactionElement.querySelector("p").innerHTML.split(" ")[0];

    removeTransactionInLocalStorage({
      amount: amount,
      description: description,
    });

    // Remove the transaction in the web page
    printMoney(amount, false);

    // Update the savings in the web page
    updateSavings();

    transactionElement.remove();
  }
}

function updateSavings() {
  const income = parseFloat(document.querySelector("#income").innerHTML);
  const outcome = parseFloat(document.querySelector("#outcome").innerHTML);
  const savings = document.querySelector("#savings");

  savings.innerHTML = (income - outcome).toFixed(2);
}

function recoverData() {
  const transactions = getTransactionsFromLocalStorage();

  if (transactions) {
    transactions.forEach((transaction) => {
      printHistory(transaction);
      printMoney(transaction.amount);
    });
  }
}

recoverData();
