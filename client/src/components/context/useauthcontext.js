// UserContext.js
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userlog, setUserlog] = useState(false);
    const [username, setUsername] = useState(null);
    const [useremail, setUseremail] = useState(null);
    const user = {
        Logged: userlog,
        Username: username,
        email: useremail,
    };

    return (
        <UserContext.Provider value={{ user,setUserlog,setUsername,setUseremail }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};
