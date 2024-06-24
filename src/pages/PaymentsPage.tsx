import React, { useMemo } from 'react';
import GenericTable from '../components/GenericTable';
import { ColumnDef } from '@tanstack/react-table';
import { usePayments } from '../hooks/usePayment';
import { PaymentsResponse } from '../types/Payments';
import { useModalStore } from '../stores/useModalStore';
import CreatePayment from '../components/Payments/PaymentCreate';

const LoanPage: React.FC = () => {
  const { data, error, isLoading } = usePayments();
  const openModal = useModalStore((state) => state.openModal);


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
        header: 'Capital',
        enableSorting: true,
      },

      {
        accessorKey: 'status',
        header: 'Estado de Pago',
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
      <div className='mainHeader'>
      <h1>Pagos</h1>

        <button className='buttonHeader' onClick={() => openModal(<CreatePayment/>)}>
          Agregar Pago
        </button>
      </div>
      {data && <GenericTable data={data} columns={columns} fileName="Payments" />}
    </div>
  );
};

export default LoanPage;
