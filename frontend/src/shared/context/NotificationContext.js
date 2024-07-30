// NotificationContext.js
import React, { createContext, useContext, useState } from 'react';
import Notification from '../components/Notification';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'info', // Default severity
  });

  const showNotification = (message, severity = 'info') => {
    setNotification({
      open: true,
      message,
      severity,
    });
  };

  const handleClose = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Notification
        open={notification.open}
        message={notification.message}
        onClose={handleClose}
        severity={notification.severity}
      />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);

// Create specific hooks for different types of notifications
export const useNotificationSuccess = () => {
  const { showNotification } = useNotification();
  return (message) => showNotification(message, 'success');
};

export const useNotificationError = () => {
  const { showNotification } = useNotification();
  return (message) => showNotification(message, 'error');
};

export const useNotificationInfo = () => {
  const { showNotification } = useNotification();
  return (message) => showNotification(message, 'info');
};

export const useNotificationWarning = () => {
  const { showNotification } = useNotification();
  return (message) => showNotification(message, 'warning');
};
