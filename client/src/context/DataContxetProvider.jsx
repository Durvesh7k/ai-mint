import { createContext, useState } from "react";


export const DataContext = createContext();


export const DataContextProvider = ({ children }) => {
    const [account, setAccount] = useState();
    return (
        <DataContext.Provider value={{account, setAccount}}>
            {children}
        </DataContext.Provider>
    )
}
