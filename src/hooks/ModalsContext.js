import React, { createContext, useContext, useState } from 'react';
import LoginModal from '~/components/Modals/LoginModal';
import LogoutModal from '~/components/Modals/LogoutModal';

const ModalsContext = createContext({
  handleOpenLoginModal: () => {},
  handleOpenLogoutModal: () => {},
});

export const ModalsProvider = ({ children }) => {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [logoutModalIsOpen, setLogoutModalIsOpen] = useState(false);

  const handleOpenLoginModal = () => setLoginModalIsOpen(true);

  const handleOpenLogoutModal = () => setLogoutModalIsOpen(true);

  return (
    <ModalsContext.Provider value={{ handleOpenLoginModal, handleOpenLogoutModal }}>
      {children}
      <LogoutModal modalIsOpen={logoutModalIsOpen} handleCloseModal={() => setLogoutModalIsOpen(false)} />
      <LoginModal modalIsOpen={loginModalIsOpen} handleCloseModal={() => setLoginModalIsOpen(false)} />
    </ModalsContext.Provider>
  );
};

export const useModals = () => useContext(ModalsContext);
