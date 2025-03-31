import React, { createContext, useContext, useState,useEffect } from 'react'
import toast from 'react-hot-toast';

const AuthContext=createContext();

export const useAuth=()=>useContext(AuthContext);

export const AuthProvider = ({children}) => {
     const [isLoggedIn,setIsLoggedIn]=useState(false);

     useEffect(() => {
      const storedLoginState = localStorage.getItem("isLoggedIn");
      if (storedLoginState === "true") {
        setIsLoggedIn(true);
      }
    }, []);

     const login=()=>{
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn","true");
     }
     const logOut=()=>{
        setIsLoggedIn(false);
        toast.success("Log out Successfully")
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
     };

     return (
        <AuthContext.Provider value={{isLoggedIn,login,logOut}}>
            {children}
        </AuthContext.Provider>
     )
}
