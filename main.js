//On window reload
window.onload = function () {
    let arr = [];
    for (let key in localStorage) {
        let x = JSON.parse(localStorage.getItem(key));
        if (x !== null) {

            arr.push(x);
        }
    }
    for (let i = 0; i < arr.length; i++) {
        showExpenseOnHome(arr[i]);
    }
}
function addExpense(event) {
    event.preventDefault();

    let amount = document.getElementById('amount').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('category').value;
    console.log(amount)
    let obj = {
        amount: amount,
        description: description,
        category: category
    }

    localStorage.setItem(obj.description, JSON.stringify(obj));
    showExpenseOnHome(obj);
}

function showExpenseOnHome(obj) {
    let parentEle = document.getElementById('expenseList');
    let childEle = document.createElement('li');
    childEle.id = 'expenseAdded';
    childEle.innerText = `${obj.amount} | ${obj.description} | ${obj.category}`;
    let deleteExpense = document.createElement('input');
    deleteExpense.type = 'button';
    deleteExpense.value = 'Delete Expense';
    deleteExpense.className = 'btn m-3 btn-danger'

    let editExpense = document.createElement('input');
    editExpense.type = 'button';
    editExpense.value = 'Edit Expense';
    editExpense.className = 'btn btn-info';

    deleteExpense.onclick = () => {
        localStorage.removeItem(obj.description);
        parentEle.removeChild(childEle);
    }

    editExpense.onclick = () => {
        let addedExpense = JSON.parse(localStorage.getItem(obj.description));
        document.getElementById('amount').value = obj.amount;
        document.getElementById('description').value = obj.description;
        document.getElementById('category').value = obj.category;

        localStorage.removeItem(obj.description);
        parentEle.removeChild(childEle);
    }

    parentEle.appendChild(childEle);
    childEle.appendChild(deleteExpense);
    childEle.appendChild(editExpense);

}