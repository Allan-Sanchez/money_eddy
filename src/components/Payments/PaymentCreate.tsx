import React from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import styles from '../../scss/PageCreate.module.scss';
import { useModalStore } from '../../stores/useModalStore';
import { useCreatePayment } from '../../hooks/usePayment';
import { PaymentCreate } from '../../types/Payments';
import { useLoans } from '../../hooks/useLoan';

function CreatePayment() {
    const closeModal = useModalStore((state) => state.closeModal);
    const { mutate } = useCreatePayment();
    const { data: loans } = useLoans();

    const { handleSubmit, register, formState: { errors }, setValue } = useForm<PaymentCreate>();

    const onSubmit = (data: PaymentCreate) => {
        mutate(data);
        closeModal();
    }

    return (
        <div>
            <h1>Agregar un nuevo pago</h1>
            <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.containerCol}>
                    <label>
                        Monto del pago:
                        <input
                            type="number"
                            id="amount"
                            placeholder='Escribe el monto del pago'
                            {...register("amount", {
                                required: "Este campo es requerido",
                                min: { value: 1, message: "El monto debe ser mayor a 0" }
                            })}
                        />
                        {errors.amount && <span className={styles.inputError}>{errors.amount.message}</span>}
                    </label>
                </div>
                <div className={styles.containerCol}>
                    <label>
                        Fecha del pago:
                        <input
                            type="date"
                            id="paymentDate"
                            {...register("paymentDate", {
                                required: "Este campo es requerido",
                            })}
                        />
                        {errors.paymentDate && <span className={styles.inputError}>{errors.paymentDate.message}</span>}
                    </label>
                </div>
                <div className={styles.containerCol}>
                    <label>
                        Deudor:
                        <Select
                            options={loans?.map(loan => ({ value: loan.id, label: `Préstamo de ${loan.Borrower.name}` }))}
                            onChange={(selectedOption) => setValue("loanId", selectedOption?.value || 0)}
                        />
                        {errors.loanId && <span className={styles.inputError}>{errors.loanId.message}</span>}
                    </label>
                </div>
                <div className={styles.containerRow}>
                    <button type="button" className={styles.buttonClose} onClick={() => closeModal()}>Cerrar</button>
                    <button type="submit" className={styles.buttonCreate}>Crear</button>
                </div>
            </form>
        </div>
    )
}

export default CreatePayment;
