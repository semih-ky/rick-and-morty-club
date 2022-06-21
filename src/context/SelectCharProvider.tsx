import React, { useContext, createContext, useState } from 'react';

type selectCharId = string | number;

interface SelectCharContext {
  selectedCharId: selectCharId;
  selectCharId: (val: selectCharId) => void;
  isOpen: boolean;
  modalHandler: () => void;
}

export const SelectCharCtx = createContext<SelectCharContext>({
  selectedCharId: "",
  isOpen: false,
  selectCharId: () => {},
  modalHandler: () => {},
});

type Props = {
  children: any
}

export const SelectCharProvider: React.FC<Props> = ({ children }) => {

  const [selectedCharId, setSelecetedCharId] = useState<selectCharId>("");
  const [isOpen, setIsOpen] = useState(false);

  const selectCharId = (val: selectCharId) => {
    setSelecetedCharId(val);
  };

  const modalHandler = () => {
    setIsOpen(!isOpen);
  }

  const value: SelectCharContext = {
    selectedCharId,
    selectCharId,
    isOpen,
    modalHandler
  }

  return (
    <SelectCharCtx.Provider value={value} >{ children }</SelectCharCtx.Provider>
  )
}

export const useSelectCharId = () => useContext(SelectCharCtx);
