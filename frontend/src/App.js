// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ResidentDashboard from './pages/ResidentDashboard';
import ServiceProviderDashboard from './pages/ServiceProviderDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AuthWrapper from './components/AuthWrapper'; 
import ReportIssuePage from './pages/ReportIssuePage'; 

function App() {
  return (
    <Router>
      <main className="min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected Routes */}
          <Route element={<AuthWrapper allowedRoles={['Resident']} />}>
            <Route path="/resident/dashboard" element={<ResidentDashboard />} />
            <Route path="/resident/report-issue" element={<ReportIssuePage />} />
          </Route>

          <Route element={<AuthWrapper allowedRoles={['ServiceProvider']} />}>
            <Route path="/serviceprovider/dashboard" element={<ServiceProviderDashboard />} />
          </Route>

          <Route element={<AuthWrapper allowedRoles={['Authority', 'Admin']} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>

          <Route path="*" element={<h1 className="text-center mt-20 text-4xl text-red-500">404: Page Not Found</h1>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;






