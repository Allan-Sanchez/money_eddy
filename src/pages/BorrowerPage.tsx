import React, { useMemo } from 'react';
import GenericTable from '../components/GenericTable';
import { useBorrowers } from '../hooks/useBorrower';
import { BorrowersResponse } from '../types/Borrowers';
import { ColumnDef } from '@tanstack/react-table';
// modal
import {useModalStore} from '../stores/useModalStore';
import CreateBorrower from '../components/Borrower/Create';

const BorrowerPage: React.FC = () => {
  const { data, error, isLoading } = useBorrowers();
  const openModal = useModalStore((state) => state.openModal);

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
      <div className='mainHeader'>
        <h1>Deudores</h1>

        <button className='buttonHeader' onClick={() => openModal(<CreateBorrower/>)}>
          Agregar Deudor
        </button>
      </div>
      {data && <GenericTable data={data} columns={columns} fileName="borrowers" />}
    </div>
  );
};

export default BorrowerPage;
