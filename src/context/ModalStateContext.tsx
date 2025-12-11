"use client";

import { createContext, ReactNode, useState } from "react";

type ModalStateContextProps = {
  modalState: boolean;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModalStateContext = createContext<ModalStateContextProps>({
  modalState: false,
  setModalState: () => {},
});

export function ModalStateProvider({ children }: { children: ReactNode }) {
  const [modalState, setModalState] = useState(false);

  return (
    <ModalStateContext.Provider value={{ modalState, setModalState }}>
      {children}
    </ModalStateContext.Provider>
  );
}
