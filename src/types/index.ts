export interface Expense {
  id: string;
  createdAt: Date;
  item: string;
  amount: number;
  message?: string;
}

export interface Transaction extends Expense {
  type: 'expense' | 'credit';
  runningBalance: number;
}
