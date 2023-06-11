import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "./redux/actions/actionParamObj";

function Logout() {
    
    let navigate = useNavigate();
    let dispatch = useDispatch();

    useEffect(()=>{
        performLogout();
    }, []);

    const performLogout = ()=>{
        dispatch(logoutUser())
        navigate('/login');
    }

    return null;
}

export default Logout;