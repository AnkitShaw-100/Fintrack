import { useState } from "react";
import { UserContext } from "./userContext";

// S-2 : Wrap all the child inside the provider 
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    );
};