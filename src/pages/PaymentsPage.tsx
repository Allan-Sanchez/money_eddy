import React, { useMemo } from 'react';
import GenericTable from '../components/GenericTable';
import { ColumnDef } from '@tanstack/react-table';
import { usePayments } from '../hooks/usePayment';
import { PaymentsResponse } from '../types/Payments';
import { useModalStore } from '../stores/useModalStore';
import CreatePayment from '../components/Payments/PaymentCreate';
import { formatDecimal, formatWithCommas } from '../utils/calc';

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
        cell: info => formatWithCommas(+formatDecimal(info.getValue<number>())) 
      },
      {
        accessorKey: 'paymentDate',
        header: 'Fecha Pago',
        enableSorting: true,
        cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),

      },
      {
        accessorKey: 'interest',
        header: 'Interés',
        enableSorting: true,
        cell: info => formatWithCommas(+formatDecimal(info.getValue<number>())) 
      },
      {
        accessorKey: 'principal',
        header: 'Capital',
        enableSorting: true,
        cell: info => formatWithCommas(+formatDecimal(info.getValue<number>())) 
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
