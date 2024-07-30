// AuthProvider.js

import React from 'react';
import AuthContext from './AuthContext';
import signIn from '../../api/auth/services/signin';
export default function AuthProvider({ children }) {

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [user, setUser] = React.useState(null);

    const login = async (email, password) => {
        try {
          const authData = await signIn(email, password);
          setUser({
            accessToken: authData.access_token,
            userId: authData.id,
            roles: authData.roles,
          });
    
          setIsLoggedIn(true);
        } catch (error) {
          // Log the error for debugging
          console.error('Login failed:', error);
          throw error; // Rethrow the error to be caught in handleSubmit
        }
      };
    const logout = () => {
        //todo
        setUser(null);
        setIsLoggedIn(false);
    };

    // Value object to be provided to consumers of AuthContext
    const authContextValue = {
        isLoggedIn,
        user,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
}
