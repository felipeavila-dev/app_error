// Libs
import { Alert } from "react-native";
import { doLogin } from "../api/Login";
import { UserProps } from "../types/user";
import DeviceInfo from 'react-native-device-info';
import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Others
import { STORAGE } from "../helpers/localStorageVariables";
import { setFirstSyncToStorage } from "../helpers/localStorageSetInfo";
import { getLastSyncDateFromStorage } from "../helpers/localStorageGetInfo";


// Types
type ContextProps = {
    user: UserProps,
    setUser: (user: UserProps) => void,
    fetchLogin: (user: LoginProps) => void,
    getUserFromLocalStorage: () => void,
}

type ProviderProps = {
    children: React.ReactNode
}

type LoginProps = {
    empresa: string,
    cpf: number,
    senha: string,
    versao_app?: string,
    uuid: string,
}


export const AuthContext = createContext({} as ContextProps);

export function AuthContextProvider({ children }: ProviderProps) {
    const [user, setUser] = useState({} as UserProps);

    async function saveUserIntoLocalStorage(user: UserProps) {
        await AsyncStorage.setItem(STORAGE.usuario, JSON.stringify(user));
    }

    async function getUserFromLocalStorage() {
        const user = await AsyncStorage.getItem(STORAGE.usuario);

        if(user) {
            setUser(JSON.parse(user));
        }
    }

    async function fetchLogin(userData: LoginProps) {
        const uniqueId = await DeviceInfo.getUniqueId();

        const userInfo = {
            empresa: userData.empresa,
            cpf: String(userData.cpf),
            senha: userData.senha,
            versao_app: DeviceInfo.getVersion(),
            uuid: uniqueId,
        }


        const response = await doLogin(userInfo);
        console.log(response);
        if(response.status === false) {
            return Alert.alert('Erro', response.message);
        }

        // Ativa o primeiro sincronismo no login
        await setFirstSyncToStorage(true);


        setUser({
            razao: response.razao,
            token: response.token,
            cod_pessoa: response.cod_pessoa,
            cod_empresa: response.empresas[0].cod_empresa
        });

        await saveUserIntoLocalStorage({
            razao: response.razao,
            token: response.token,
            cod_pessoa: response.cod_pessoa,
            cod_empresa: response.empresas[0].cod_empresa
        });

        
    }

    
    // console.log(user);
    // AsyncStorage.clear()
    return(
        <AuthContext.Provider value={{
            user,
            setUser,
            fetchLogin,
            getUserFromLocalStorage,
        }}>
            {children}
        </AuthContext.Provider>
    );
}