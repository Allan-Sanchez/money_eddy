import React from 'react';
import UserTable from '../components/UserTable';
import { useUsers } from '../hooks/useUsers';

const UserPage: React.FC = () => {
  const { data, error, isLoading } = useUsers();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Users</h1>
      {data && <UserTable data={data} />}
    </div>
  );
};

export default UserPage;
