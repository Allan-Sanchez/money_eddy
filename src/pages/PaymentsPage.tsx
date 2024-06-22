import React, { useMemo } from 'react';
import GenericTable from '../components/GenericTable';
import { ColumnDef } from '@tanstack/react-table';
import { usePayments } from '../hooks/usePayment';
import { PaymentsResponse } from '../types/Payments';

const LoanPage: React.FC = () => {
  const { data, error, isLoading } = usePayments();

  const columns = useMemo<ColumnDef<PaymentsResponse>[]>( 
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
        accessorKey: 'paymentDate',
        header: 'Fecha Pago',
        enableSorting: true,
      },
      {
        accessorKey: 'interest',
        header: 'Interés',
        enableSorting: true,
      },
      {
        accessorKey: 'principal',
        header: 'Principal',
        enableSorting: true,
      },

      {
        accessorKey: 'status',
        header: 'Status',
        enableSorting: true,
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
      <h1>Pagos</h1>
      {data && <GenericTable data={data} columns={columns} fileName="Payments" />}
    </div>
  );
};

export default LoanPage;
