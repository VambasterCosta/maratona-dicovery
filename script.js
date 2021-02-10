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

const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: 500000,
        date: '23/01/2021'
    },
    {
        id: 2,
        description: 'Água',
        amount: -20000,
        date: '23/01/2021'
    },
    {
        id: 3,
        description: 'Web Site',
        amount: 211,
        date: '23/01/2021'
    }
]

const App = {
    init() {

        transactions.forEach(transaction => {
            DOM.addTransaction(transaction)
        })

        DOM.updateBalance()


    },
    reload() {
        DOM.clearTransaction()
        App.init()
    }
}

const Utils = {

    formatAmount(value) {

        return "value"
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
    all: transactions,

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

        tr.innerHTML = DOM.innerHTMLTransaction(transection)
        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transection) {
        const CSSclass = transection.amount > 0 ? "income" : "expense"
        amount = Utils.formatCurrency(transection.amount)

        const html =
            `   <td class="description">${transection.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transection.date}</td>
            <td> <img src="./assets/minus.svg" alt="Remover transação" /></td>    
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

        object.amount = Utils.formatAmount(object.amount)

        console.log(object)

    },
    formateDate() {
        console.log("Formatar Data")
    },

    submit(event) {
        event.preventDefault()
        try {
            Form.validateField()
            Form.formateDate()
        } catch (error) {
            alert(error.message)
        }



    }

}



App.init()

Transaction.add({
    id: 39,
    description: 'Aluguel',
    amount: 200,
    date: '23/01/2021'
})

Transaction.remove(1)