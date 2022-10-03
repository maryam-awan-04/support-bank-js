import fs from 'fs'
import readlineSync from 'readline-sync'
class Transaction {
    constructor(date, from, to, narrative, amount) {
        this.date = date
        this.from = from
        this.to = to
        this.narrative = narrative
        this.amount = amount
    }

    toString() {
        return `on ${this.date}, ${this.from} sent ${this.to} £ ${this.amount} for ${this.narrative}`
    }
}

// new Transaction(date, from, to, narrative, amount)

class Person {
    constructor(from, to, amount, total) {
      this.from = from
      this.to = to
      this.amount = amount
      this.total = total
    }

    toString2() {
        return `${this.from} owes ${this.total} to the bank`
    }
}

function promptLoop() {
    while (true) {
        const userInput = readlineSync.question('What would you like to access?')
        readUserInput(userInput)
    }
}

function readUserInput(userInput) {
    if(userInput === 'list all') {
        listAll()
    }
    else {
        const name = userInput.substring(5)
        console.log(name)
        listAccount(name)
    }
}

function readTransactionsFromCsv() {
    const transactions = []

    const csvFile = fs.readFileSync('Transactions2014.csv', 'utf8');
    const lines = csvFile.split('\n')
    for (let i = 0; i < lines.length; i++) {
        const transactionData = lines[i].split(',')
        const transaction = new Transaction(transactionData[0], transactionData[1], transactionData[2], transactionData[3], transactionData[4])
        transactions.push(transaction)
    }
    
    return transactions
}

function readPeopleFromCsv() {
    const people = []

    const csvFile = fs.readFileSync('Transactions2014.csv', 'utf8');
    const lines = csvFile.split('\n')
    for (let i = 0; i < lines.length; i++) {
        const peopleData = lines[i].split(',')
        const person = new Person(peopleData[1], peopleData[2], peopleData[4], 0)
        people.push(person)
    }
    
    return people
}

function listAll() {

    // read csv file 
    // select all transactions associated to a person 1
    // if the person is in the 'to' column then subtract the values from total 
    // if the person is in the 'from' column then add the values to the total
    // print the person's name and the total 
    // repeat for the next person

    const people = readPeopleFromCsv()

    for (let i = 0; i < people.length; i++) {
        const person = people[i]

        while ((person.from === person[0]) || (person.to === person[0])) {
            if (person.from === person[0]) {
                person.total = person.total + person.amount
            }
            else if (person.to === people[0]) {
                person.total = person.total - person.amount
            }
        }
        console.log(person.toString2())
    }
   
}

function listAccount(name) {
    const transactions = readTransactionsFromCsv()

    for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i]

        if ((transaction.to === name) || (transaction.from === name)) {
            console.log(transaction.toString())
        }
    }
    
}

promptLoop()