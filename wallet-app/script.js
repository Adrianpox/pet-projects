
const textInput = document.querySelector('#transaction-text');
const amountInput = document.querySelector('#transaction-amount');
const addBtn = document.querySelector('#add-btn');
const balanceDisplay = document.querySelector('.balance-value');
const historyList = document.querySelector('#history-list');
let operationType = document.querySelector('#operation');
const savedData = localStorage.getItem('myWalletData');
const transactions = JSON.parse(savedData) || [];

let currentBalance = 0;
balanceDisplay.innerText = `${currentBalance} ₽`;
renderPage();
addBtn.addEventListener('click', function () {

    const transactionName = textInput.value;
    const transactionAmount = Number(amountInput.value);

    if (transactionName === '') { alert("Введите название!"); return; }
    if (transactionAmount <= 0) { alert("Введите сумму!"); return; }

    const newTransaction = {
        id: Date.now(),
        text: transactionName,
        amount: transactionAmount,
        type: operationType.value
    };

    transactions.push(newTransaction);

    saveToLocalStorage();

    renderPage();

    textInput.value = '';
    amountInput.value = '';
});


function saveToLocalStorage() {
    const jsonString = JSON.stringify(transactions);
    localStorage.setItem('myWalletData', jsonString);
}

function renderPage() {
    historyList.innerHTML = '';
    currentBalance = 0;
    transactions.forEach((transaction) => {
        if (transaction.type === 'income') {
            currentBalance += transaction.amount;
        } else {
            currentBalance -= transaction.amount;
        }
        const newLi = document.createElement('li');
        newLi.classList.add('history-item');
        const amountClass = transaction.type === 'income' ? 'positive' : 'negative';
        const sign = transaction.type === 'income' ? '+' : '-';

        newLi.innerHTML = `
        <span>${transaction.text}</span>
        <div class="transaction-right">
        <span class="amount ${amountClass}">${sign}${transaction.amount} ₽</span>
        <button class="delete-btn" data-id="${transaction.id}">×</button>
        </div>
        `;
        historyList.prepend(newLi);
    });
    balanceDisplay.innerText = `${currentBalance} ₽`;
}


historyList.addEventListener('click', function (event) {


    if (event.target.classList.contains('delete-btn')) {

        const idToDelete = Number(event.target.dataset.id);
        const index = transactions.findIndex((transaction) => transaction.id === idToDelete);

        if (index !== -1) {

            transactions.splice(index, 1);
        }

        saveToLocalStorage();

        renderPage();
    }
});