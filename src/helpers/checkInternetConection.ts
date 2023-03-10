import NetInfo from "@react-native-community/netinfo";
import { useContext } from "react";
import { GeneralContext } from "../contexts/GeneralContext";

export function checkInternetConection(haveInternet: boolean, setHaveInternet: React.Dispatch<boolean>) {

    NetInfo.addEventListener(networkState => {
        if(haveInternet === true && networkState.isConnected === false) {
            setHaveInternet(false);
        }

        if(haveInternet === false && networkState.isConnected === true) {
            setHaveInternet(true);
        }
    });
}