import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { GeneralContextProvider } from "../contexts/GeneralContext";
import { AppRoutes } from "./appRoutes";
import { AuthRoutes } from "./authRoutes";


export function Routes() {

    const Context = useContext(AuthContext);
    
    useEffect(() => {
        Context.getUserFromLocalStorage();
    }, []);
    
    return(
        <>
            {Context.user.razao ? 
                <GeneralContextProvider>
                    <AppRoutes />
                </GeneralContextProvider>
                
                : <AuthRoutes />}
        </>
    );
}