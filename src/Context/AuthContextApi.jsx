

import React, { Children, createContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { __AUTH } from '../backend/firebaseconfig';
import toast from "react-hot-toast";



export let AuthUserContext = createContext(null);

const AuthContextApi = ({ children }) =>{
    let [authUser, setAuthUser] = useState(null || {});

    useEffect(() => {
        onAuthStateChanged(__AUTH,(userInfo)=>{
            if(userInfo?.emailVerified===true){
                window.localStorage.setItem("UserToken",userInfo?.accessToken)
                setAuthUser(userInfo);
            } else{
                setAuthUser(null);
                window.localStorage.removeItem("UserToken");
            }
        })
    },[])

    let logout = async () => {
        try{
                       await signOut(__AUTH);
                       window.localStorage.removeItem("UserToken");
                       toast.success("Logged Out Successfully")
                       setTimeout(() => {
                         window.location.assign("/");
                       },1000
                    )
        }
        catch (error){
            toast.error("Error Logging Out")
        }
    }
    return <AuthUserContext.Provider value={{authUser, logout}}>
        {children}
    </AuthUserContext.Provider>
}

export default AuthContextApi;