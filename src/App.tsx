import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import queryClient from './query/queryClient';
import UserPage from './pages/UserPage';
import ProtectedRoute from './routers/ProtectedRoute';
import LoanPage from './pages/LoanPage';
import PaymentsPage from './pages/PaymentsPage';
import BorrowerPage from './pages/BorrowerPage';
import LoanCalculatorPage from './pages/LoanCalculatorPage';

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/usuarios" element={<ProtectedRoute element={<UserPage />} />} />     
            <Route path="/prestatarios" element={<ProtectedRoute element={<BorrowerPage />} />} />     
            <Route path="/prestamos" element={<ProtectedRoute element={<LoanPage />} />} />        
            <Route path="/pagos" element={<ProtectedRoute element={<PaymentsPage />} />} />        
            <Route path="/calculadora" element={<ProtectedRoute element={<LoanCalculatorPage />} />} />        
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
