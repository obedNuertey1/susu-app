"use client"
import React, {useContext, useState, createContext, useEffect} from "react";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext(null);

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}:any){
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    async function signup(email:string, password:string){
        return await createUserWithEmailAndPassword(auth, email, password).then(
            ((userCredential)=>{
                const user = userCredential.user;
            })
        ).catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    async function login(email:string, password:string){
        return signInWithEmailAndPassword(auth, email, password).then((userCredential)=>{
            const user = userCredential.user;
        }).catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
        })
    }
    
    async function logout(email:string, password:string){
        return await signOut(auth).then((userCredential)=>{
            const user = userCredential;
        }).catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user:any) => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe;
    }, [])

    const value:any = {
        currentUser,
        signup,
        login,
        logout,
        setCurrentUser
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}