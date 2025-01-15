import React, { createContext, useState } from 'react';

// Create a UserContext
export const UserContext = createContext();

// UserProvider component to provide the user state to all children
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // For admin
  const [pengguna, setPengguna] = useState(null); // For regular users

  return (
    <UserContext.Provider value={{ user, setUser, pengguna, setPengguna }}>
      {children}
    </UserContext.Provider>
  );
};
