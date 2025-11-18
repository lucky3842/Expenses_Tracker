import React, { createContext, useContext, useState, ReactNode } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Expense } from '../types';

interface AppContextType {
  walletBalance: number;
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id' | 'createdAt'>) => void;
  addBalance: (amount: number) => void;
  deleteExpense: (expenseId: string) => void;
  isAdmin: boolean;
  login: (user: string, pass: string) => boolean;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [walletBalance, setWalletBalance] = useLocalStorage<number>('walletBalance', 94);
  const [expenses, setExpenses] = useLocalStorage<Expense[]>('expenses', []);
  
  const [isAdmin, setIsAdmin] = useState(false);

  const addExpense = (expense: Omit<Expense, 'id' | 'createdAt'>) => {
    const newExpense: Expense = {
      ...expense,
      id: new Date().toISOString() + Math.random(),
      createdAt: new Date(),
    };
    setExpenses(prev => [newExpense, ...prev]);
    setWalletBalance(prev => prev - expense.amount);
  };

  const addBalance = (amount: number) => {
    setWalletBalance(prev => prev + amount);
    const creditLog: Expense = {
      id: new Date().toISOString() + Math.random(),
      createdAt: new Date(),
      item: 'Balance Added',
      amount: amount,
      message: `Credited by Admin`
    };
    setExpenses(prev => [creditLog, ...prev]);
  };

  const deleteExpense = (expenseId: string) => {
    const expenseToDelete = expenses.find(exp => exp.id === expenseId);
    if (!expenseToDelete) return;

    // Adjust wallet balance based on the type of transaction being deleted
    if (expenseToDelete.item === 'Balance Added') {
      // If deleting a credit, subtract the amount from the balance
      setWalletBalance(prev => prev - expenseToDelete.amount);
    } else {
      // If deleting a regular expense, add the amount back to the balance
      setWalletBalance(prev => prev + expenseToDelete.amount);
    }

    // Filter out the deleted expense from the list
    setExpenses(prev => prev.filter(exp => exp.id !== expenseId));
  };

  const login = (user: string, pass: string) => {
    if (user === 'sandeep' && pass === 'Adithi@2013') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
  };

  return (
    <AppContext.Provider value={{ walletBalance, expenses, addExpense, addBalance, deleteExpense, isAdmin, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
