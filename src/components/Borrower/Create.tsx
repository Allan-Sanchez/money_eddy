import React from 'react';
import { useForm } from 'react-hook-form';
import styles from '../../scss/PageCreate.module.scss';
import { useModalStore } from '../../stores/useModalStore';
import { useCreateBorrower } from '../../hooks/useBorrower';
import { BorrowerCreate } from '../../types/Borrowers';


function Create() {
    const closeModal = useModalStore((state) => state.closeModal);
    const { mutate } = useCreateBorrower();

    const {handleSubmit,register,formState:{errors}} = useForm<BorrowerCreate>()

    const onSubmit = (data: BorrowerCreate) => {
        mutate(data);
        closeModal();
    }

  return (
      <div>
          <h1>Agregar un nuevo deudor</h1>
          <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.containerCol}>
                  <label>
                      Nombre del deudor:
                      <input
                          type="text"
                          id="name"
                          placeholder='Escribe el nombre del deudor'
                          {...register("name", {
                              required: "Este campo es requerido",
                          }
                          )}
                      />
                      {errors.name && <span className={styles.inputError}>{errors.name.message}</span>}
                  </label>
              </div>
              <div className={styles.containerCol}>
                  <label>
                      correo Electrónico:
                      <input
                          type="email"
                          id="email"
                          placeholder='Escribe el nombre del deudor'
                          {...register("email", {
                              required: "Este campo es requerido",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "El correo electrónico no es válido"
                                } as any
                          }
                          )}
                      />
                      {errors.email && <span className={styles.inputError}>{errors.email.message}</span>}
                  </label>
              </div>
              <div className={styles.containerCol}>
                  <label>
                      Numero de teléfono:
                      <input
                          type="text"
                          id="phoneNumber"
                          placeholder='Escribe un numero de teléfono'
                          {...register("phoneNumber", {
                              required: "Este campo es requerido",
                          }
                          )}
                      />
                      {errors.phoneNumber && <span className={styles.inputError}>{errors.phoneNumber.message}</span>}
                  </label>
              </div>
              <div className={styles.containerCol}>
                  <label>
                      Dirección:
                      <input
                          type="text"
                          id="address"
                          placeholder=''
                          {...register("address", {
                              required: "Este campo es requerido",
                          }
                          )}
                      />
                      {errors.address && <span className={styles.inputError}>{errors.address.message}</span>}
                  </label>
              </div>
              <div className={styles.containerCol}>
                  <label>
                      Referencia:
                      <textarea
                          rows={3}
                          id="reference"
                          placeholder='Agrega aquí cualquier referencia que consideres necesaria'
                          {...register("reference"
                          )}
                      />
                      {errors.reference && <span className={styles.inputError}>{errors.reference.message}</span>}
                  </label>
              </div>
              <div className={styles.containerRow}>
                  <button type="button"className={styles.buttonClose} onClick={() =>closeModal()}>Cerrar</button>
                  <button type="submit" className={styles.buttonCreate}>Create</button>

              </div>
          </form>
      </div>
  )
}

export default Create

