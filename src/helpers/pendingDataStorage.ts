import AsyncStorage from "@react-native-async-storage/async-storage"
import { STORAGE } from "./localStorageVariables"

type Props = {
    id: number,
    description: string,
}

export async function savePendingDatIntoLocalStorage(data: Props) {
    console.log(data);
    try {
        const currentData = await AsyncStorage.getItem(STORAGE.dados_pendentes);
    
        if(currentData) {
            const parsedData = JSON.parse(currentData);
            parsedData.push(data);
    
            await AsyncStorage.setItem(STORAGE.dados_pendentes, JSON.stringify(parsedData));
        } 

        await AsyncStorage.setItem(STORAGE.dados_pendentes, JSON.stringify([data]));

        
    } catch (error) {
        console.log('ERRO AO SALVAR DADOS PENDENTES NO LOCAL STORAGE --- >', error);
    }
    
}

export async function getPendingDatFromLocalStorage() {
    try {
        const currentData = await AsyncStorage.getItem(STORAGE.dados_pendentes);
    
        if(currentData) {
            const parsedData = JSON.parse(currentData);
    
            return parsedData;
        }
        
        return [];
    } catch (error) {
        console.log('ERRO AO SALVAR DADOS PENDENTES NO LOCAL STORAGE --- >', error);
    }
    
}