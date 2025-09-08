import { useState, createContext } from "react";

// S-1 : Create Context
// This file is a duplicate. Please use userContext.jsx for all context imports.

// S-2 : Wrap all the child inside the provider 

// UserProvider wraps app and provides user state
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    );
};