import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import styles from '../../scss/PageCreate.module.scss';
import { useModalStore } from '../../stores/useModalStore';
import { useCreateLoan } from '../../hooks/useLoan';
import { LoanCreate } from '../../types/Loans';
import { useBorrowers } from '../../hooks/useBorrower';

function CreateLoan() {
    const closeModal = useModalStore((state) => state.closeModal);
    const { mutate } = useCreateLoan();
    const { data: borrowers } = useBorrowers();
    const [isDurationInYears, setIsDurationInYears] = useState(false);


    const { handleSubmit, register, formState: { errors }, setValue } = useForm<LoanCreate>();

    const onSubmit = (data: LoanCreate) => {
        let { duration } = data;
        if (isDurationInYears) {
            duration *= 12;
        }
        // calcular la fecha de finalización según los meses de duración
        const endDate = new Date(data.startDate);
        endDate.setMonth(endDate.getMonth() + duration);
        
        mutate({ ...data, duration, endDate });
        closeModal();
    }

    return (
        <div>
            <h1>Agregar un nuevo préstamo</h1>
            <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.containerCol}>
                    <label>
                        Monto del préstamo:
                        <input
                            type="number"
                            id="amount"
                            placeholder='Escribe el monto del préstamo'
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
                        Tasa de interés (% por año):
                        <input
                            type="number"
                            id="interestRate"
                            placeholder='Escribe la tasa de interés'
                            {...register("interestRate", {
                                required: "Este campo es requerido",
                                min: { value: 0, message: "La tasa de interés debe ser mayor o igual a 0" }
                            })}
                        />
                        {errors.interestRate && <span className={styles.inputError}>{errors.interestRate.message}</span>}
                    </label>
                </div>
                <div className={styles.containerCol}>
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
                </div>
                <div className={styles.containerCol}>
                    <label>
                        Fecha de inicio:
                        <input
                            type="date"
                            id="startDate"
                            {...register("startDate", {
                                required: "Este campo es requerido",
                            })}
                        />
                        {errors.startDate && <span className={styles.inputError}>{errors.startDate.message}</span>}
                    </label>
                </div>
                {/* <div className={styles.containerCol}>
                    <label>
                        Fecha de finalización:
                        <input
                            type="date"
                            id="endDate"
                            {...register("endDate", {
                                required: "Este campo es requerido",
                            })}
                        />
                        {errors.endDate && <span className={styles.inputError}>{errors.endDate.message}</span>}
                    </label>
                </div> */}
                <div className={styles.containerCol}>
                    <label>
                        Deudor:
                        <Select
                            options={borrowers?.map(borrower => ({ value: borrower.id, label: borrower.name }))}
                            onChange={(selectedOption) => setValue("borrowerId", selectedOption?.value || 0)}
                        />
                        {errors.borrowerId && <span className={styles.inputError}>{errors.borrowerId.message}</span>}
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

export default CreateLoan;
