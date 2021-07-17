import { useState } from "react";
import { createContext } from "react";

export const ModalContext = createContext({
  showModal: false,
  setShowModal: (data: boolean) => {},
  confirm: false,
  setConfirm: (data: boolean) => {},
});

interface Props {}

const ModalContextProvider: React.FC<Props> = ({ children }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);

  return (
    <ModalContext.Provider value={{ showModal, setShowModal, confirm, setConfirm }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
