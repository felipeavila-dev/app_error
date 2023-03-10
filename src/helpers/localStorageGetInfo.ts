import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE } from "./localStorageVariables";

export async function getFirstSyncFromStorage(): Promise<boolean>{
    try {
        const response = await AsyncStorage.getItem(STORAGE.primeiro_sync);
    
        if(response) {
            const parsedResponse = JSON.parse(response);
            return parsedResponse;
        }
    
        return true;
        
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function getUserInfoFromStorage() {
    try {
        const response = await AsyncStorage.getItem(STORAGE.usuario);

        if(response) {
            const parsedResponse = JSON.parse(response);
            return parsedResponse;
        }
    } catch (error) {
        console.log(error);
        return;
    }
}

export async function getLastSyncDateFromStorage() {
    try {
        const response = await AsyncStorage.getItem(STORAGE.dt_ultimo_sync);

        if(response) {
            const parsedResponse = JSON.parse(response);
            return parsedResponse;
        }
    } catch (error) {
        console.log(error);
        return;
    }
}