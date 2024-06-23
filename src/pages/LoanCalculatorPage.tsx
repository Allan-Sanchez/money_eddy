import React, { useState } from 'react';
import GenericTable from '../components/GenericTable';
import { ColumnDef } from '@tanstack/react-table';
import styles from '../scss/LoanCalculatorPage.module.scss';
import { formatDecimal, formatWithCommas } from '../utils/calc';

interface LoanData {
    paymentNumber: number;
    monthlyPayment: number;
    interestPayment: number;
    principalPayment: number;
    remainingPrincipal: number;
  }
  
  const LoanCalculatorPage: React.FC = () => {
    const [amount, setAmount] = useState<number>(0);
    const [interestRate, setInterestRate] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [loanData, setLoanData] = useState<LoanData[]>([]);
    const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
    const [totalPayment, setTotalPayment] = useState<number>(0);
  
    const calculateLoan = () => {
      const monthlyInterestRate = interestRate / 12 / 100;
      const numberOfPayments = duration;
      const monthlyPayment = (amount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
      
      let remainingPrincipal = amount;
      const data: LoanData[] = [];
  
      for (let i = 1; i <= numberOfPayments; i++) {
        const interestPayment = remainingPrincipal * monthlyInterestRate;
        const principalPayment = monthlyPayment - interestPayment;
        remainingPrincipal -= principalPayment;
  
        // Evitar números negativos en el saldo restante
        if (remainingPrincipal < 0) {
          remainingPrincipal = 0;
        }
  
        data.push({
          paymentNumber: i,
          monthlyPayment: monthlyPayment,
          interestPayment: interestPayment,
          principalPayment: principalPayment,
          remainingPrincipal: remainingPrincipal,
        });
      }
  
      setLoanData(data);
      setMonthlyPayment(monthlyPayment);
      setTotalPayment(monthlyPayment * numberOfPayments);
    };
  
    const columns: ColumnDef<LoanData>[] = [
        { header: 'Numero de cuota', accessorKey: 'paymentNumber' },
        { 
          header: 'Monto de la cuota', 
          accessorKey: 'monthlyPayment', 
          cell: info => formatWithCommas(+formatDecimal(info.getValue<number>())) 
        },
        { 
          header: 'Pago de Interés', 
          accessorKey: 'interestPayment', 
          cell: info => formatWithCommas(+formatDecimal(info.getValue<number>())) 
        },
        { 
          header: 'Capital', 
          accessorKey: 'principalPayment', 
          cell: info => formatWithCommas(+formatDecimal(info.getValue<number>())) 
        },
        { 
          header: 'Saldo', 
          accessorKey: 'remainingPrincipal', 
          cell: info => formatWithCommas(+formatDecimal(info.getValue<number>())) 
        },
      ];
  return (
    <div className={styles.loanCalculatorPage}>
      <h1>Calcular Préstamo</h1>
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="amount">Cantidad de dinero a prestar:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="interestRate">Interés (Por año) </label>
          <input
            type="number"
            id="interestRate"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="duration">Duración (Meses):</label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
        </div>
        <button onClick={calculateLoan}>Calculate</button>
      </div>
      <div className={styles.results}>
        <h2>Resumen del préstamo</h2>
        <p>Cuota Mensual: Q {formatWithCommas(+formatDecimal(monthlyPayment))}</p>
        <p>Total a pagar: Q {formatWithCommas(+formatDecimal(totalPayment)) }</p>
      </div>
      <div className={styles.table}>
        <GenericTable data={loanData} columns={columns} fileName="Loan_Calculation" />
      </div>
    </div>
  );
};

export default LoanCalculatorPage;
