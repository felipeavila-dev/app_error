// Libs
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { createContext, useEffect, useState } from "react";
import { getFirstSyncFromStorage, getLastSyncDateFromStorage } from "../helpers/localStorageGetInfo";
import { getPendingDatFromLocalStorage } from "../helpers/pendingDataStorage";
import { DrawerScreenProps } from "../routes/appRoutes";
import { AuthContext } from "./AuthContext";



// Types

export type PendingDataProps = {
    id: number,
    description: string,
}

type ContextProps = {
    showCreatePeopleModal: boolean,
    setShowCreatePeopleModal: React.Dispatch<boolean>,
    showSearchPeopleModal: boolean,
    setShowSearchPeopleModal: React.Dispatch<boolean>,
    setIsFirstSync: React.Dispatch<any>,
    isFirstSync: boolean,
    setSyncLogs: React.Dispatch<any>,
    syncLogs: string[],
    haveInternet: boolean,
    setHaveInternet: React.Dispatch<boolean>,
    pendingData: PendingDataProps[], 
    setPendingData: React.Dispatch<any>

}

type ProviderProps = {
    children: React.ReactNode
}


export const GeneralContext = createContext({} as ContextProps);

export function GeneralContextProvider({ children }: ProviderProps) {
    const [showCreatePeopleModal, setShowCreatePeopleModal] = useState(false);
    const [showSearchPeopleModal, setShowSearchPeopleModal] = useState(false);
    const [isFirstSync, setIsFirstSync] = useState(true);
    const [syncLogs, setSyncLogs] = useState<string[]>([]);
    const [haveInternet, setHaveInternet] = useState(true);
    const [pendingData, setPendingData] = useState<PendingDataProps[]>([]);

    const navigation = useNavigation<NavigationProp<DrawerScreenProps>>();
    
    // AsyncStorage.clear()
    // Monitora a conexão com a internet
    // checkInternetConection(haveInternet, setHaveInternet);

    useEffect(() => {
        async function checkSync() {
            const firstSync = await getFirstSyncFromStorage();

            if(firstSync) {
                navigation.navigate('SynchronizationPage')
            } else {                 
                navigation.navigate('Dashboard');
            }
        }

        checkSync();
    }, []);

    useEffect(() => {
        async function getPendingData() {
            const response = await getPendingDatFromLocalStorage();
            
            setPendingData(response);
        }

        getPendingData();
    }, []);

    return(
            <GeneralContext.Provider value={{
                showCreatePeopleModal,
                setShowCreatePeopleModal,
                showSearchPeopleModal,
                setShowSearchPeopleModal,
                setIsFirstSync,
                isFirstSync,
                setSyncLogs,
                syncLogs,
                haveInternet,
                setHaveInternet,
                pendingData, 
                setPendingData
            }}>
                {children}
            </GeneralContext.Provider>
    );
}