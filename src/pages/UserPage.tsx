import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format, isSameDay, isToday } from 'date-fns';
import { useAppContext } from '../context/AppContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Wallet, Calendar, PlusCircle, ShoppingCart, MessageSquare, IndianRupee, UserCog } from 'lucide-react';

const UserPage = () => {
  const { walletBalance, expenses, addExpense } = useAppContext();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!item || isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Please enter a valid item and amount.");
      return;
    }
    addExpense({ item, amount: parsedAmount, message });
    setItem('');
    setAmount('');
    setMessage('');
  };

  const dailyExpenses = useMemo(() => {
    return expenses.filter(exp => isSameDay(exp.createdAt, selectedDate || new Date()) && exp.item !== 'Balance Added');
  }, [expenses, selectedDate]);

  const totalSpentToday = useMemo(() => {
    return dailyExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  }, [dailyExpenses]);

  const remainingBalanceToday = walletBalance;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-brand-yellow">Hi Naga,</h1>
            <p className="text-gray-400">Here's your expense summary.</p>
          </div>
          <Link 
            to="/admin" 
            className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition-colors text-sm sm:text-base"
          >
            <UserCog className="w-5 h-5" />
            <span>Admin Panel</span>
          </Link>
        </header>

        <Card className="mb-6">
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Wallet className="w-8 h-8 text-brand-yellow" />
              <span className="text-lg text-gray-300">Current Wallet Balance:</span>
            </div>
            <span className="text-2xl font-bold text-white">₹{walletBalance.toFixed(2)}</span>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Expense</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <ShoppingCart className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" placeholder="Item Purchased" value={item} onChange={e => setItem(e.target.value)} className="w-full bg-gray-700 border-gray-600 text-white rounded-md p-2 pl-10 focus:ring-brand-yellow focus:border-brand-yellow" required />
                  </div>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="number" placeholder="Amount Spent" value={amount} onChange={e => setAmount(e.target.value)} className="w-full bg-gray-700 border-gray-600 text-white rounded-md p-2 pl-10 focus:ring-brand-yellow focus:border-brand-yellow" required />
                  </div>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea placeholder="Message (Optional)" value={message} onChange={e => setMessage(e.target.value)} className="w-full bg-gray-700 border-gray-600 text-white rounded-md p-2 pl-10 h-24 resize-none focus:ring-brand-yellow focus:border-brand-yellow"></textarea>
                  </div>
                  <button type="submit" className="w-full flex items-center justify-center bg-brand-yellow text-gray-900 font-bold py-2.5 px-4 rounded-md hover:bg-brand-yellow/90 transition-colors">
                    <PlusCircle className="w-5 h-5 mr-2" />
                    Submit Expense
                  </button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Daily Expense Summary ({format(selectedDate || new Date(), 'do MMMM')})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-300">Total Spent Today:</span>
                  <span className="font-semibold text-red-400">- ₹{totalSpentToday.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-300">Remaining Balance:</span>
                  <span className="font-semibold text-green-400">₹{remainingBalanceToday.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="row-start-1 lg:row-auto">
            <Card>
              <CardHeader className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-brand-yellow" />
                <CardTitle>Select Date</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={{ after: new Date() }}
                  initialFocus
                  modifiers={{ today: isToday }}
                  modifiersClassNames={{
                    selected: 'bg-brand-yellow text-gray-900',
                    today: 'border border-brand-yellow',
                  }}
                  className="text-white"
                  styles={{
                    head_cell: { color: '#FBBF24' },
                    day: { color: 'white' },
                    caption: { color: '#FBBF24' },
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
