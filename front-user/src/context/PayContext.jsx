import React, { useState } from 'react';

const PayContext = React.createContext(null);
export function usePay() {
    return React.useContext(PayContext);
}

export function PayProvider({ children }) {
    const [phone, setPhone] = useState();
    const [name, setName] = useState();

    const value = { phone, setPhone, name, setName};
    return <PayContext.Provider value={value}>{children}</PayContext.Provider>;
}