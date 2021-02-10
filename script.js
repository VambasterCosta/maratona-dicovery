const modal = {
    open() {
        document.querySelector(".modal-overlay")
            .classList.add("active")
    },

    close() {
        document.querySelector(".modal-overlay")
            .classList.remove("active")
    }
}

const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("vjc.finances:transactions")) || []
    },
    set(transaction) {
        localStorage.setItem(
            "vjc.finances:transactions", JSON.stringify(transaction)
        )
    }
}



const App = {
    init() {

        Transaction.all.forEach(DOM.addTransaction)

        DOM.updateBalance()

        Storage.set(Transaction.all)
    },
    reload() {
        DOM.clearTransaction()
        App.init()
    }
}

const Utils = {

    formatAmount(value) {
        value = Number(value) * 100

        return value
    },

    formatDate(date) {
        const splittedDate = date.split("-")

        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },
    formatCurrency(value) {
        const sinal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return sinal + value
    }
}


const Transaction = {
    all: Storage.get(),

    add(transaction) {
        Transaction.all.push(transaction);
        App.reload()
    },

    remove(index) {
        Transaction.all.splice(index, 1)
        App.reload()
    },

    incomes() {
        let income = 0;
        Transaction.all.forEach(transection => {

            if (transection.amount > 0) {
                income += transection.amount;
            }
        })

        return income;

    },
    expenses() {

        let expense = 0;
        Transaction.all.forEach(transection => {
            if (transection.amount < 0) {
                expense += transection.amount;
            }
        })
        return expense;

    },
    total() {

        return Transaction.incomes() + Transaction.expenses();

    },


}

const DOM = {

    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transection, index) {
        const tr = document.createElement('tr')
        tr.dataset.index = index

        tr.innerHTML = DOM.innerHTMLTransaction(transection, index)
        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transection, index) {
        const CSSclass = transection.amount > 0 ? "income" : "expense"
        amount = Utils.formatCurrency(transection.amount)

        const html =
            `<td class="id">${transection.id}</td>   
            <td class="description">${transection.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transection.date}</td>
            <td> <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação" /></td>    
        `
        return html
    },

    updateBalance() {
        document.getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())

        document.getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())

        document.getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransaction() {
        DOM.transactionsContainer.innerHTML = ""
    }
}

const Form = {

    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getVelues() {
        return {
            id: Math.random().toString(36).replace(/[^a-z0-9]+/g, '').substr(0, 9),
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    validateField() {
        let object = this.getVelues()
        if (object.description.trim() === "" ||
            object.amount.trim() === "" ||
            object.date.trim() === "") {
            throw new Error("Por Favor, preencha todos os campos!")
        }
    },



    formatValues() {
        let object = this.getVelues()
        object.amount = Utils.formatAmount(object.amount)
        object.date = Utils.formatDate(object.date)
        return object
    },


    clearFields() {
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },

    submit(event) {
        event.preventDefault()
        try {
            Form.validateField()
            const object = Form.formatValues()
            Transaction.add(object)
            console.log(object)
            Form.clearFields()
            modal.close()
        } catch (error) {
            alert(error.message)
        }
    }

}





App.init()
