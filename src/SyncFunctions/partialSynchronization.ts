import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { checkSync } from "../api/Sync";
import { GeneralContext } from "../contexts/GeneralContext";
import { OpenRealmConnection } from "../database/realmConnection";
import { getLastSyncDateFromStorage } from "../helpers/localStorageGetInfo";
import { setLastSyncDate } from "../helpers/localStorageSetInfo";
import { STORAGE } from "../helpers/localStorageVariables";
import { SyncProps } from "../types/SyncProps";
import { getNegativeIds } from "./getNegativeIds";
import { syncPeople } from "./Pessoa";

export async function partialSynchronization(setSyncLogs: React.Dispatch<any>) {

    const realm = await OpenRealmConnection();

    // Verifica se existem dados para sincronizar em todas as tabelas
    const peopleNegativeId = await getNegativeIds('pessoa', realm);
    const lastSyncDate = await getLastSyncDateFromStorage();

    if(peopleNegativeId.status === false && !lastSyncDate ) {
        setSyncLogs((prev: string) => [...prev, 'Não existem dados para sincronizar']);
        return;
    }

    // Consumir o SYNC e atualizar o Realm com os dados baixados

    // Enviar o Easy todos os registros negativos

    // Consumir o SYNC e atualizar o Realm com os dados baixados

    // Fazer a susbtituicao dos IDs negativos

    // Sincroniza a tabela Pessoa
    await syncPeople(realm, setSyncLogs, peopleNegativeId);



    realm.close();

}