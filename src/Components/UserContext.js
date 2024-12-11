import React, { createContext, useContext, useState } from "react";

// Create the UserContext
const UserContext = createContext();

// UserProvider component to wrap the app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize with null (no user logged in)
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using UserContext
export const useUser = () => useContext(UserContext);