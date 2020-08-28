import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((total, elemento) => {
      if (elemento.type === 'income') {
        let newTotal = total;
        newTotal += elemento.value;
        return newTotal;
      }
      return total;
    }, 0);

    const outcome = this.transactions.reduce((total, elemento) => {
      if (elemento.type === 'outcome') {
        let newTotal = total;
        newTotal += elemento.value;
        return newTotal;
      }
      return total;
    }, 0);

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
