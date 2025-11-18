import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Transaction } from '../types';
import { format } from 'date-fns';
import Papa from 'papaparse';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Wallet, LogOut, IndianRupee, PlusCircle, Download, QrCode, Trash2 } from 'lucide-react';
import { cn } from '../lib/utils';
import QrCodeModal from '../components/QrCodeModal';
import MobilePaymentModal from '../components/MobilePaymentModal';

const AdminPage = () => {
  const { walletBalance, expenses, addBalance, logout, deleteExpense } = useAppContext();
  const [amountToAdd, setAmountToAdd] = useState('');
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isMobilePayModalOpen, setIsMobilePayModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction? This action cannot be undone.')) {
      deleteExpense(id);
    }
  };

  const handleAddBalance = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(amountToAdd);
    if (!isNaN(amount) && amount > 0) {
      addBalance(amount);
      setAmountToAdd('');
    } else {
      alert("Please enter a valid amount.");
    }
  };

  const transactions = useMemo((): Transaction[] => {
    const sortedExpenses = [...expenses].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    let runningBalance = walletBalance;
    const transactionList: Transaction[] = [];

    for (let i = 0; i < sortedExpenses.length; i++) {
        const current = sortedExpenses[i];
        const isCredit = current.item === 'Balance Added';

        transactionList.push({
            ...current,
            type: isCredit ? 'credit' : 'expense',
            runningBalance: runningBalance,
        });

        if (isCredit) {
            runningBalance -= current.amount;
        } else {
            runningBalance += current.amount;
        }
    }
    return transactionList;
  }, [expenses, walletBalance]);

  const exportToCSV = () => {
    const csvData = transactions.map(t => ({
      Date: format(t.createdAt, 'yyyy-MM-dd'),
      Time: format(t.createdAt, 'HH:mm:ss'),
      Item: t.item,
      Amount: t.amount,
      Type: t.type,
      Message: t.message || '',
      'Remaining Balance': t.runningBalance.toFixed(2)
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `expense_history_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const expensesByDate = useMemo(() => {
    return transactions.reduce((acc, t) => {
        if (t.type === 'expense') {
            const dateStr = format(t.createdAt, 'yyyy-MM-dd');
            if (!acc[dateStr]) {
                acc[dateStr] = 0;
            }
            acc[dateStr] += t.amount;
        }
        return acc;
    }, {} as Record<string, number>);
  }, [transactions]);
  
  const upiAmount = parseFloat(amountToAdd);
  const isUpiAmountValid = !isNaN(upiAmount) && upiAmount > 0;
  const upiUrl = isUpiAmountValid ? `upi://pay?pa=7337772694@ybl&pn=Sandeep&am=${upiAmount}&cu=INR` : '#';
  
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  const handleUpiPayment = (e: React.MouseEvent) => {
    if (!isUpiAmountValid) {
      e.preventDefault();
      alert("Please enter a valid amount to pay.");
      return;
    }
    e.preventDefault();
    if (isMobile) {
      setIsMobilePayModalOpen(true);
    } else {
      setIsQrModalOpen(true);
    }
  };


  return (
    <>
      {isQrModalOpen && isUpiAmountValid && (
        <QrCodeModal 
          upiUrl={upiUrl}
          amount={upiAmount}
          onClose={() => setIsQrModalOpen(false)}
        />
      )}
       {isMobilePayModalOpen && isUpiAmountValid && (
        <MobilePaymentModal
            upiUrl={upiUrl}
            amount={upiAmount}
            onClose={() => setIsMobilePayModalOpen(false)}
        />
      )}
      <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-brand-yellow">Admin Dashboard</h1>
              <p className="text-gray-400">Welcome, Sandeep.</p>
            </div>
            <button onClick={handleLogout} className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition-colors">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className="lg:col-span-1">
              <CardContent className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                  <Wallet className="w-8 h-8 text-brand-yellow" />
                  <span className="text-lg text-gray-300">Current Wallet Balance:</span>
                  </div>
                  <span className="text-2xl font-bold text-white">₹{walletBalance.toFixed(2)}</span>
              </CardContent>
            </Card>
            <Card className="lg:col-span-2">
              <CardHeader><CardTitle>Add Balance / Pay</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handleAddBalance} className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-grow">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="number" placeholder="Enter Amount" value={amountToAdd} onChange={e => setAmountToAdd(e.target.value)} className="w-full bg-gray-700 border-gray-600 text-white rounded-md p-2.5 pl-10 focus:ring-brand-yellow focus:border-brand-yellow" required />
                  </div>
                  <div className="flex gap-4">
                      <button type="submit" className="flex-1 flex items-center justify-center bg-brand-yellow text-gray-900 font-bold py-2.5 px-4 rounded-md hover:bg-brand-yellow/90 transition-colors">
                          <PlusCircle className="w-5 h-5 mr-2" /> Add
                      </button>
                      <button
                        type="button"
                        onClick={handleUpiPayment}
                        disabled={!isUpiAmountValid}
                        className={cn(
                          "flex-1 flex items-center justify-center bg-purple-600 text-white font-bold py-2.5 px-4 rounded-md transition-colors",
                          "disabled:opacity-50 disabled:cursor-not-allowed",
                          isUpiAmountValid && "hover:bg-purple-700"
                        )}
                      >
                        <QrCode className="w-5 h-5 mr-2" /> Pay
                      </button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <Card>
              <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <CardTitle>Expense History</CardTitle>
                  <button onClick={exportToCSV} className="mt-2 sm:mt-0 flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors text-sm">
                      <Download className="w-4 h-4" />
                      <span>Export CSV</span>
                  </button>
              </CardHeader>
              <CardContent>
                  <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm text-gray-300">
                          <thead className="bg-gray-700 text-xs text-gray-200 uppercase">
                              <tr>
                                  <th className="px-4 py-3">Date</th>
                                  <th className="px-4 py-3">Time</th>
                                  <th className="px-4 py-3">Item/Details</th>
                                  <th className="px-4 py-3 text-right">Amount</th>
                                  <th className="px-4 py-3 text-right">Remaining Bal.</th>
                                  <th className="px-4 py-3 text-center">Actions</th>
                              </tr>
                          </thead>
                          <tbody>
                              {transactions.length === 0 ? (
                                  <tr>
                                      <td colSpan={6} className="text-center py-8 text-gray-400">No transactions yet.</td>
                                  </tr>
                              ) : transactions.map((t, index) => {
                                  const dateStr = format(t.createdAt, 'yyyy-MM-dd');
                                  const prevDateStr = index > 0 ? format(transactions[index - 1].createdAt, 'yyyy-MM-dd') : null;
                                  const showDateHeader = index === 0 || dateStr !== prevDateStr;
                                  
                                  return (
                                      <React.Fragment key={t.id}>
                                          {showDateHeader && (
                                              <tr className="bg-gray-700/50">
                                                  <td colSpan={4} className="px-4 py-2 font-bold text-brand-yellow">{format(t.createdAt, 'EEEE, do MMMM yyyy')}</td>
                                                  <td colSpan={2} className="px-4 py-2 font-bold text-red-400 text-right">Total Spent: ₹{expensesByDate[dateStr]?.toFixed(2) || '0.00'}</td>
                                              </tr>
                                          )}
                                          <tr className="border-b border-gray-700 hover:bg-gray-700/50">
                                              <td className="px-4 py-3">{format(t.createdAt, 'dd/MM/yy')}</td>
                                              <td className="px-4 py-3">{format(t.createdAt, 'p')}</td>
                                              <td className="px-4 py-3">
                                                  <p className="font-medium text-white">{t.item}</p>
                                                  {t.message && <p className="text-gray-400 text-xs">{t.message}</p>}
                                              </td>
                                              <td className={`px-4 py-3 text-right font-semibold ${t.type === 'credit' ? 'text-green-400' : 'text-red-400'}`}>
                                                  {t.type === 'credit' ? '+' : '-'} ₹{t.amount.toFixed(2)}
                                              </td>
                                              <td className="px-4 py-3 text-right">₹{t.runningBalance.toFixed(2)}</td>
                                              <td className="px-4 py-3 text-center">
                                                  <button onClick={() => handleDelete(t.id)} className="text-gray-400 hover:text-red-500 transition-colors" aria-label="Delete transaction">
                                                      <Trash2 className="w-4 h-4" />
                                                  </button>
                                              </td>
                                          </tr>
                                      </React.Fragment>
                                  )
                              })}
                          </tbody>
                      </table>
                  </div>
              </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
