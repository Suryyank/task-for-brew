"use client";
//Handles opening and closing of the modal across various buttons
import { createContext, ReactNode, useContext, useState } from "react";

type ModalStateContextProps = {
  modalState: boolean;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
};

//Context
export const ModalStateContext = createContext<ModalStateContextProps>({
  modalState: false,
  setModalState: () => {},
});

//Provider
export function ModalStateProvider({ children }: { children: ReactNode }) {
  const [modalState, setModalState] = useState(false);

  return (
    <ModalStateContext.Provider value={{ modalState, setModalState }}>
      {children}
    </ModalStateContext.Provider>
  );
}

//Hook
export const useModalContext = () => {
  const ctx = useContext(ModalStateContext);
  if (!ctx) {
    throw new Error("Use Context Inside The Provider");
  }
  return ctx;
};
