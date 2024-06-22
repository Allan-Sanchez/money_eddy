import React, { useMemo } from 'react';
import GenericTable from '../components/GenericTable';
import { useBorrowers } from '../hooks/useBorrower';
import { BorrowersResponse } from '../types/Borrowers';
import { ColumnDef } from '@tanstack/react-table';

const BorrowerPage: React.FC = () => {
  const { data, error, isLoading } = useBorrowers();

  const columns = useMemo<ColumnDef<BorrowersResponse>[]>( 
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableSorting: true,
      },
      {
        accessorKey: 'name',
        header: 'Nombre',
        enableSorting: true,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        enableSorting: true,
      },
      {
        accessorKey: 'phoneNumber',
        header: 'Teléfono',
        enableSorting: true,
      },
      {
        accessorKey: 'address',
        header: 'Dirección',
        enableSorting: true,
      },
      // {
      //   accessorKey: 'city',
      //   header: 'City',
      //   enableSorting: true,
      // },
      // {
      //   accessorKey: 'state',
      //   header: 'State',
      //   enableSorting: true,
      // },
      // {
      //   accessorKey: 'createdAt',
      //   header: 'Created At',
      //   enableSorting: true,
      //   cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
      // },
      {
        accessorKey: 'updatedAt',
        header: 'Actualizado en',
        enableSorting: true,
        cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
      },
    ],
    []
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Deudores</h1>
      {data && <GenericTable data={data} columns={columns} fileName="borrowers" />}
    </div>
  );
};

export default BorrowerPage;
