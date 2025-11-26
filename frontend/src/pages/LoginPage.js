// frontend/src/pages/LoginPage.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { loginUser } from '../services/authService'; // Import the service

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // New loading state
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Call the login service
      const response = await loginUser(username, password);

      // Successfully logged in. Now route to the correct dashboard based on role (Requirement 3.9.1)
      const role = response.role || localStorage.getItem('userRole');

      if (role === 'Resident') {
        navigate('/resident/dashboard');
      } else if (role === 'ServiceProvider') {
        navigate('/serviceprovider/dashboard');
      } else if (role === 'Authority' || role === 'Admin') {
        // Authority and Admin dashboards often share a common management interface
        navigate('/admin/dashboard'); 
      } else {
        setError('Login successful, but role is unknown. Contact support.');
      }

    } catch (apiError) {
      // Handle errors (e.g., 401 Unauthorized from Django)
      const errorMessage = apiError.detail || 'Invalid credentials or login failed.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white shadow-2xl rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">User Login</h1>
      <p className="text-center text-sm text-gray-500 mb-6">Access your role-specific dashboard (Resident, Authority, Service Provider, Admin).</p>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username / Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="email" // Changed to email type for clarity
            placeholder="Username or Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p className="text-xs text-indigo-500 hover:text-indigo-700 cursor-pointer">
            Forgot Password?
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Logging In...' : 'Log In'}
          </button>
          <Link to="/register" className="inline-block align-baseline font-bold text-sm text-gray-500 hover:text-indigo-600">
            Need an account? Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;