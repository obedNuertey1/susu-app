"use client"
import React, {useContext, useState, createContext} from "react";

const QueryContext = createContext(null);

export function useRedirectContext(){
    return useContext(QueryContext);
}

export function RedirectContextProvider({children}:any){
    const [redirectHashId, setRedirectHashId] = useState("");

    const value:any = {redirectHashId, setRedirectHashId};

    return (
        <QueryContext.Provider value={value}>
            {children}
        </QueryContext.Provider>
    );
}
