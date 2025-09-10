import { useState, createContext } from "react";

// S-1 : Create Context
export const UserContext = createContext();

// S-2 : Wrap all the child inside the provider 
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    );
};