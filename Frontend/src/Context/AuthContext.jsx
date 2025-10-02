import React, { createContext, useContext, useState,useEffect } from 'react'
import toast from 'react-hot-toast';

const AuthContext=createContext();

export const useAuth=()=>useContext(AuthContext);

export const AuthProvider = ({children}) => {
     const [user,setUser]=useState(null);
     const [isLoggedIn,setIsLoggedIn]=useState(false);

     useEffect(() => {
      const storedLoginState = localStorage.getItem("isLoggedIn");
      const storedUser = localStorage.getItem("user");
      if (storedLoginState === "true") {
        setIsLoggedIn(true);
      }

       if (storedUser) {
          setUser(JSON.parse(storedUser));
      }
    }, []);

     const login=(token,userData)=>{
        setIsLoggedIn(true);
        setUser(userData);
        localStorage.setItem("token",token);
        localStorage.setItem("user", JSON.stringify(userData));
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
        <AuthContext.Provider value={{isLoggedIn,user,login,logOut}}>
            {children}
        </AuthContext.Provider>
     )
}
