import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE } from "./localStorageVariables";

export async function setFirstSyncToStorage(isFirstSync: boolean) {
    try {
        await AsyncStorage.setItem(STORAGE.primeiro_sync, JSON.stringify(isFirstSync));
    } catch (error) {  
        console.log('Erro ao incluir "primeiro_sync" do storage ---> ', error);
    }
}

export async function setLastSyncDate(date: string) {
    console.log('GRAVANDO ULTIMA DATA ---> ', date)
    try {
        await AsyncStorage.setItem(STORAGE.dt_ultimo_sync, JSON.stringify(date));
    } catch (error) {
        console.log('Erro ao incluir "dt_ultimo_sync" do storage ---> ', error);
    }
}