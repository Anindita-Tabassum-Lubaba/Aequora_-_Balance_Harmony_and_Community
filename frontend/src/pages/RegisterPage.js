// frontend/src/pages/RegisterPage.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { registerUser } from '../services/authService'; // Import the service

const ROLES = ['Resident', 'ServiceProvider', 'Authority'];

function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '', // Used for email in the User model
    password: '',
    role: 'Resident', 
  });
  const [loading, setLoading] = useState(false); // New loading state
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long.');
        setLoading(false);
        return;
    }
    
    try {
        // Call the registration service (Requirement 3.1.1)
        await registerUser(formData);

        setSuccessMessage(`Success! Registered as ${formData.role}. Redirecting to login...`);
        
        // Clear form and navigate to login after a delay
        setFormData({ firstName: '', lastName: '', username: '', password: '', role: 'Resident' });
        setTimeout(() => navigate('/login'), 2000);

    } catch (apiError) {
        // Handle specific errors like duplicate email or username
        let errorMessage = 'Registration failed. Please check your details.';
        if (apiError.email) {
            errorMessage = apiError.email.join(' ');
        } else if (apiError.detail) {
             errorMessage = apiError.detail;
        }

        setError(errorMessage);

    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white shadow-2xl rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-green-700">New User Registration</h1>
      <p className="text-center text-sm text-gray-500 mb-6">
        Register as a Resident, Service Provider, or Authority. (Req 3.1.1)
      </p>
      
      {successMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-3 mb-4" role="alert">
          <p>{successMessage}</p>
        </div>
      )}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">First Name</label>
                <input id="firstName" type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">Last Name</label>
                <input id="lastName" type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" value={formData.lastName} onChange={handleChange} required />
            </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username / Primary Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="email"
            placeholder="e.g., user@community.com"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Minimum 6 characters"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
            Select Your Role
          </label>
          <select
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            {ROLES.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center justify-between">
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register Account'}
          </button>
          <Link to="/login" className="inline-block align-baseline font-bold text-sm text-gray-500 hover:text-green-600">
            Already registered? Log In
          </Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;