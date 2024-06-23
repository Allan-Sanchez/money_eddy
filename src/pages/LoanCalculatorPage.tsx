import React, { useState } from 'react';
import GenericTable from '../components/GenericTable';
import { ColumnDef } from '@tanstack/react-table';
import styles from '../scss/LoanCalculatorPage.module.scss';
import { formatDecimal, formatWithCommas } from '../utils/calc';
import { useForm } from "react-hook-form"
import { toast } from 'react-hot-toast';
interface LoanData {
    paymentNumber: number;
    monthlyPayment: number;
    interestPayment: number;
    principalPayment: number;
    remainingPrincipal: number;
  }

interface LoanForm {
    amount: string;
    interestRate: string;
    duration: string;
}
  
  const LoanCalculatorPage: React.FC = () => {
    const [loanData, setLoanData] = useState<LoanData[]>([]);
    const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
    const [totalPayment, setTotalPayment] = useState<number>(0);
    const [showTable, setShowTable] = useState<boolean>(false);
    const [isDurationInYears, setIsDurationInYears] = useState(false);
    // Form 
    const {handleSubmit,register,formState:{errors}} = useForm<LoanForm>()
  
    const calculateLoan = (amount:number,interestRate:number,duration:number) => {
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
        { header: 'Numero de cuota', accessorKey: 'paymentNumber',size: 30},
        { 
          header: 'Monto de la cuota', 
          accessorKey: 'monthlyPayment', 
          enableResizing:false, size: 150,
          maxSize: 150,
          minSize: 150,
          cell: info => formatWithCommas(+formatDecimal(info.getValue<number>())) 
        },
        { 
          header: 'Pago de Interés', 
          accessorKey: 'interestPayment', 
          enableResizing:false, size: 150,
          cell: info => formatWithCommas(+formatDecimal(info.getValue<number>())) 
        },
        { 
          header: 'Capital', 
          accessorKey: 'principalPayment', 
          enableResizing:false, size: 150,
          cell: info => formatWithCommas(+formatDecimal(info.getValue<number>())) 
        },
        { 
          header: 'Saldo', 
          accessorKey: 'remainingPrincipal', 
          enableResizing:false, size: 150,
          cell: info => formatWithCommas(+formatDecimal(info.getValue<number>())) 
        },
      ];

    const onSubmit =async (data: LoanForm) => {
      const { amount, interestRate } = data;
      let { duration } = data;

      if(isDurationInYears){
        const years = +duration;
        const months = years * 12;
        duration = months.toString();
      }

      calculateLoan(+amount, +interestRate, +duration);
      toast.success('Calculo exitoso');
      setShowTable(true);
    }

  return (
    <div className={styles.loanCalculatorPage}>
      <h1>Calcular Préstamo</h1>
      <div className={styles.containerForm}>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <label htmlFor="amount">Cantidad de dinero a prestar:</label>
            <input
              type="text"
              id="amount"
              placeholder='Q 0.00'
              {...register("amount", {
                required: "Este campo es requerido",
                valueAsNumber: true,
                min: { value: 1, message: "El monto debe ser mayor a 0" },
                // regex only numbers
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message: "El monto debe ser un número"
                } as any
              }

              )}
            />
            {errors.amount && <span className={styles.inputError}>{errors.amount.message}</span>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="interestRate">Interés (Por año) </label>
            <input
              type="text"
              id="interestRate"
              placeholder='0.00%'
              {...register("interestRate", {
                required: "Este campo es requerido",
                valueAsNumber: true,
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message: "El interés debe ser un número"
                } as any
              })}
            />
            {errors.interestRate && <span className={styles.inputError}>{errors.interestRate.message}</span>}

          </div>
          {/* <div className={styles.formGroup}>
            <label htmlFor="duration">Duración (Meses):</label>
            <input
              type="text"
              id="duration"
              placeholder='0'
              {...register("duration", {
                required: "Este campo es requerido",
                valueAsNumber: true,
                min: { value: 1, message: "La duración debe ser mayor a 0" },
                // regex only numbers 0-9 no decimals
                pattern: {
                  value: /^\d+$/,
                  message: "La duración debe ser un número"
                } as any
              })}
            />
            {errors.duration && <span className={styles.inputError}>{errors.duration.message}</span>}

          </div> */}
          <div className={styles.formGroup}>
            <div className={styles.durationContainer}>

            <label>Duración:</label>
            <div className={styles.switchContainer}>
              <span>Meses</span>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={isDurationInYears}
                  onChange={() => setIsDurationInYears(prev => !prev)}
                />
                <span className={styles.slider}></span>
              </label>
              <span>Años</span>
            </div>
            </div>
            <input
              type="text"
              id="duration"
              placeholder='0'
              {...register("duration", {
                required: "Este campo es requerido",
                valueAsNumber: true,
                min: { value: 1, message: `La duración debe ser mayor a 0 ${isDurationInYears ? 'años' : 'meses'}` },
                pattern: {
                  value: /^\d+$/,
                  message: "La duración debe ser un número"
                } as any
              })}
            />
            {errors.duration && <span className={styles.inputError}>{errors.duration.message}</span>}
          </div>
          <button type='submit'>Calculate</button>
        </form>
        <div className={styles.results}>
          <h2>Resumen del préstamo</h2>
          <p>Cuota Mensual: Q {formatWithCommas(+formatDecimal(monthlyPayment))}</p>
          <p>Total a pagar: Q {formatWithCommas(+formatDecimal(totalPayment))}</p>
        </div>
      </div>
      {
        showTable ? (
          <div className={styles.table}>
            <GenericTable data={loanData} columns={columns} fileName="Loan_Calculation" />
          </div>
        ) : (
          <div className={styles.noTableMessage}>
            <h2>Tabla de Amortización</h2>
            <p>Por favor llene el formulario para ver la tabla de amortización</p>
          </div>
        )
      }
    </div>
  );
};

export default LoanCalculatorPage;
