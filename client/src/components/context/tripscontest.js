// TripContext.js
import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const TripContext = createContext();

export const TripProvider = ({ children }) => {
    const [Triplog, setTriplog] = useState(false);
    const [Tripname, setTripname] = useState(null);
    const [Tripemail, setTripemail] = useState(null);
    

    return (
        <TripContext.Provider value={{ Trip,setTriplog,setTripname,setTripemail }}>
            {children}
        </TripContext.Provider>
    );
};

export const useTripContext = () => {
    const context = useContext(TripContext);
    if (!context) {
        throw new Error('useTripContext must be used within a TripProvider');
    }
    return context;
};
