import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Lock } from 'lucide-react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(username, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
                <div className="bg-brand-yellow/10 p-3 rounded-full">
                    <Lock className="w-8 h-8 text-brand-yellow" />
                </div>
            </div>
          <CardTitle>Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-400" htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full bg-gray-700 border-gray-600 text-white rounded-md p-2 focus:ring-brand-yellow focus:border-brand-yellow"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-400" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full bg-gray-700 border-gray-600 text-white rounded-md p-2 focus:ring-brand-yellow focus:border-brand-yellow"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-brand-yellow text-gray-900 font-bold py-2 px-4 rounded-md hover:bg-brand-yellow/90 transition-colors"
            >
              Login
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
