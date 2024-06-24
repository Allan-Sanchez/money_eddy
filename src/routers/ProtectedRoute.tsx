import React from 'react';
import PrivateRoute from './PrivateRoute';
import Layout from '../components/Layout';
import Modal from '../components/Modal';

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  return (
    <PrivateRoute>
            <Modal/>
      <Layout>{element}</Layout>
    </PrivateRoute>
  );
};

export default ProtectedRoute;
