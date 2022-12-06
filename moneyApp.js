const addTransactionFormElement = document.querySelector("#addTransactionForm");
const histroyList = document.querySelector("#history");

addTransactionFormElement.addEventListener("submit", async (event) => {
  event.preventDefault();

  const inputMoneyElement = document.querySelector("#amount");
  const inputDescriptionElement = document.querySelector("#description");

  let transaction = {
    amount: inputMoneyElement.value,
    description: inputDescriptionElement.value,
  };

});

/*
function printInput() {
    var moneyAmount= document.getElementById('amount').value;
    var result = document.getElementById('result');

    if (moneyAmount > 0) {
         result.textContent = myIncome;
     } else {
         result.textContent = myOutcome;
  }

  submitButton.addEventListener('click', printInput, false);
}*/