import { useContext } from "react";
import AuthContext from "../../auth/context/AuthContext";
import { Link, Navigate } from "react-router-dom";

export default function AuthRequired({children}){
    const authData = useContext(AuthContext)
    return(authData.isLoggedIn ? children : <Navigate to={"/signin"}/>);
}