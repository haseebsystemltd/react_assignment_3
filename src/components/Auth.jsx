import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Auth({ authenticatedUser, authUser, children }) {

    let navigate = useNavigate();

    useEffect(() => {
        if (authUser === "allowed" && authenticatedUser == null) {
          navigate("/login");
        }
    
        if (authUser === "not-allowed" && authenticatedUser != null) {
          navigate("/dashboard");
        }

    }, [authenticatedUser, authUser]);

    if ((authUser === "allowed" && authenticatedUser == null) || (authUser === "not-allowed" && authenticatedUser != null)) {
        return null; // Render nothing while navigating
    }
    
    return <>{children}</>;

}

export default Auth;