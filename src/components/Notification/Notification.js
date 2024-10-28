import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Notification() {
  useEffect(() => {
    const updateProfile = localStorage.getItem('updateProfile');
    if (updateProfile === 'success') {
      toast.success('Your profile is updated!', { position: 'top-center', autoClose: 1500 });
      localStorage.removeItem('updateProfile');
    }

    const login = localStorage.getItem('login');
    if (login === 'success') {
      toast.success('Logged in!', { position: 'top-center', autoClose: 1500 });
      localStorage.removeItem('login');
    }
  }, []);

  return <ToastContainer />;
}

export default Notification;
