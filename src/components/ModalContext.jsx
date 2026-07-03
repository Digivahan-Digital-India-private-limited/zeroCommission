import { createContext, useState, useContext } from 'react';
import LoanApplicationModal from './LoanApplicationModal';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loanType, setLoanType] = useState('');

  const openModal = (type = '') => {
    setLoanType(type);
    setIsOpen(true);
  };
  
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <LoanApplicationModal isOpen={isOpen} onClose={closeModal} defaultLoanType={loanType} />
    </ModalContext.Provider>
  );
};
