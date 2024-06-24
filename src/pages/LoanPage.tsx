import React, { useMemo } from 'react';
import GenericTable from '../components/GenericTable';
import { ColumnDef } from '@tanstack/react-table';
import { useLoans } from '../hooks/useLoan';
import { LoansResponse } from '../types/Loans';
import CreateLoan from '../components/Loan/LoanCreate';
import { useModalStore } from '../stores/useModalStore';

const LoanPage: React.FC = () => {
  const { data, error, isLoading } = useLoans();
  const openModal = useModalStore((state) => state.openModal);

  const columns = useMemo<ColumnDef<LoansResponse>[]>( 
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableSorting: true,
      },
      {
        accessorKey: 'amount',
        header: 'Monto',
        enableSorting: true,
      },
      {
        accessorKey: 'interestRate',
        header: '% Interés',
        enableSorting: true,
      },
      {
        accessorKey: 'duration',
        header: 'Duración Meses',
        enableSorting: true,
      },
      {
        accessorKey: 'startDate',
        header: 'Fecha Inicio',
        enableSorting: true,
        cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
      },
      {
        accessorKey: 'endDate',
        header: 'Fecha Fin',
        enableSorting: true,
        cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        enableSorting: true,
      },
      // {
      //   accessorKey: 'borrowerId',
      //   header: 'Borrower ID',
      //   enableSorting: true,
      // },
      {
        accessorKey: 'Borrower.name',
        header: 'Deudor',
        enableSorting: true,
      },
      // {
      //   accessorKey: 'Borrower.email',
      //   header: 'Borrower Email',
      //   enableSorting: true,
      // },
      // {
      //   accessorKey: 'createdAt',
      //   header: 'Created At',
      //   enableSorting: true,
      //   cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
      // },
      // {
      //   accessorKey: 'updatedAt',
      //   header: 'Updated At',
      //   enableSorting: true,
      //   cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
      // },
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
      <h1>Créditos</h1>

        <button className='buttonHeader' onClick={() => openModal(<CreateLoan/>)}>
          Agregar Crédito
        </button>
      </div>
      {data && <GenericTable data={data} columns={columns} fileName="Loans" />}
    </div>
  );
};

export default LoanPage;
