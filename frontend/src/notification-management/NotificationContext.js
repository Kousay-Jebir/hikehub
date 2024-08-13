import React, { createContext, useState, useEffect, useContext } from 'react';
import AuthContext from '../auth/context/AuthContext';
import getOrganizatorId from '../api/profile-management/services/getOrganizatorId';

const NotificationContext = createContext();

export const useNotifications = () => {
    return useContext(NotificationContext);
};

export const SSENotificationProvider = ({ children }) => {
    const { isLoggedIn, user } = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchOrganizerIdAndSetupSSE = async () => {
            if (isLoggedIn && user?.roles.includes('organizer')) {
                try {
                    // Get the organizer ID
                    const organizerId = await getOrganizatorId(user.accessToken, user.userId);

                    // Fetch existing notifications from the server
                    const response = await fetch(`http://localhost:3001/notifications/${organizerId}`);
                    if (response.ok) {
                        const pastNotifications = await response.json();
                        setNotifications(pastNotifications.map(notification => ({
                            id: notification.id,
                            message: notification.message,
                        })));
                    } else {
                        console.error('Failed to fetch notifications:', response.statusText);
                    }

                    // Set up SSE connection
                    const eventSource = new EventSource(`http://localhost:3001/notifications/sse/${organizerId}`);

                    // Handle incoming messages
                    eventSource.onmessage = (event) => {
                        const message = event.data;
                        setNotifications(prevNotifications => [...prevNotifications, { message }]);
                    };

                    // Handle errors
                    eventSource.onerror = (event) => {
                        console.error('SSE error:', event);
                        eventSource.close(); // Close connection on error
                    };

                    // Cleanup the connection when the component unmounts
                    return () => {
                        eventSource.close();
                    };
                } catch (error) {
                    console.error('Error fetching organizer ID or setting up SSE:', error);
                }
            }
        };

        fetchOrganizerIdAndSetupSSE();

    }, [isLoggedIn, user?.roles, user?.userId]); // Dependencies

    // Function to delete a notification
    const deleteNotification = async (notificationId) => {
        try {
            // Call the deletion endpoint
            const response = await fetch(`http://localhost:3001/notifications/${notificationId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Remove the notification from state
                setNotifications(prevNotifications =>
                    prevNotifications.filter(notification => notification.id !== notificationId)
                );
            } else {
                console.error('Failed to delete notification:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    return (
        <NotificationContext.Provider value={{ notifications, deleteNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};
