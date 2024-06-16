import React from 'react';
import PrivateRoute from './PrivateRoute';
import Layout from '../components/Layout';

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  return (
    <PrivateRoute>
      <Layout>{element}</Layout>
    </PrivateRoute>
  );
};

export default ProtectedRoute;
