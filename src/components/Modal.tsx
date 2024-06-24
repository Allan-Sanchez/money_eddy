// src/components/Modal.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { useModalStore } from '../stores/useModalStore';
import styles from '../scss/Modal.module.scss'; // Asegúrate de crear este archivo para estilos

const Modal: React.FC = () => {
  const { isOpen, content, closeModal } = useModalStore();

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={closeModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <span className={styles.closeButton} onClick={closeModal}>×</span>
        {content}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
