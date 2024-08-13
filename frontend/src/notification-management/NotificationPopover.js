import React from 'react';
import {
  Menu,
  MenuItem,
  Typography,
  ListItemText,
  Divider,
} from '@mui/material';
import { useNotifications } from './NotificationContext';
const NotificationPopover = ({ anchorEl, handleClose }) => {
  const { notifications, deleteNotification:markAsRead } = useNotifications(); // Use notifications and markAsRead from context

  const handleNotificationClick = (id) => {
    markAsRead(id); // Mark notification as read (or delete it based on your implementation)
    handleClose(); // Close the popover
  };

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <Typography variant="h6" sx={{ p: 2 }}>
        Notifications
      </Typography>
      <Divider />
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <MenuItem key={notification.id} onClick={() => handleNotificationClick(notification.id)}>
            <ListItemText primary={notification.message} />
          </MenuItem>
        ))
      ) : (
        <MenuItem>
          <ListItemText primary="No new notifications" />
        </MenuItem>
      )}
    </Menu>
  );
};

export default NotificationPopover;
