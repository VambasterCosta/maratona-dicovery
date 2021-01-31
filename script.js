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
        amount :500000,
        date :'23/01/2021'
    },
    {
        id: 2,
        description: 'Água',
        amount: -20000,
        date : '23/01/2021'
    },
    {
        id: 3,
        description : 'Web Site',
        amount : 200001,
        date : '23/01/2021'
    }
]



const Utils = {
    formatCurrency(value){
        const sinal = Number(value) <0 ? "-" : ""
   
        value = String(value).replace(/\D/g,"")

        value = Number(value)/100

        value = value.toLocaleString("pt-BR",{
            style : "currency",
            currency: "BRL"
        })
        
        return sinal+value
    }
}


const Transaction = {
    incomes(){
        let income = 0;
        transactions.forEach(transection =>{
         
            if(transection.amount > 0){
                income += transection.amount;
            }
        }) 

        return income;

    }, 
    expenses(){

        let expense =0;
        transactions.forEach(transection =>{
            if(transection.amount < 0){
                expense += transection.amount;
            }
        })
        return expense;

    },
    total(){

      
        return Transaction.incomes()+Transaction.expenses();

    }
}

const DOM = {

    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transection, index){
        const tr = document.createElement('tr')

        tr.innerHTML = DOM.innerHTMLTransaction(transection)  
        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transection){
        const CSSclass = transection.amount >0 ? "income":"expense"
        amount = Utils.formatCurrency(transection.amount)

        const html = 
        `   <td class="description">${transection.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transection.date}</td>
            <td> <img src="./assets/minus.svg" alt="Remover transação" /></td>    
        `
        return html
    },

    updateBalance(){
         document.getElementById('incomeDisplay')
         .innerHTML = Utils.formatCurrency(Transaction.incomes())

         document.getElementById('expenseDisplay')
         .innerHTML = Utils.formatCurrency(Transaction.expenses()) 
         
         document.getElementById('totalDisplay')
         .innerHTML = Utils.formatCurrency(Transaction.total())
    }
}



transactions.forEach( function(transaction){
    DOM.addTransaction(transaction)
})

DOM.updateBalance()
