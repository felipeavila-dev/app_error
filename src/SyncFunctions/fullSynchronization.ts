import { useState } from "react";
import { createCity, deleteAllCities, getCitybyId } from "../api/Realm/Cidade";
import { createLogradouro, deleteAllLogradouro } from "../api/Realm/Logradouro";
import { createPeopleRealm, deleteAllPeople } from "../api/Realm/Pessoa";
import { checkSync } from "../api/Sync";
import { OpenRealmConnection } from "../database/realmConnection";
import { setLastSyncDate } from "../helpers/localStorageSetInfo";
import { CityProps } from "../types/CityProps";

// Types
import { SyncProps } from "../types/SyncProps";

export async function fullSynchronization(setSyncLogs: React.Dispatch<any>) {
    const realm = await OpenRealmConnection(); 

    const dataToSync:SyncProps = await checkSync({ tem_negativo: false });

    if(dataToSync.status === true) {
        await deleteAllPeople(realm);
        await deleteAllCities(realm);
        await deleteAllLogradouro(realm);
        setSyncLogs((prev: any) => [...prev, 'Dados antigos removidos com sucesso']);

        // Recebe todos os dados de Sync
        const people = dataToSync.data.pessoa;
        const cities = dataToSync.data.cidade;
        const logradouro = dataToSync.data.logradouro;

        
        // Pessoa
        if(people.length > 0) {
            people.forEach(async(peopleData) => {
                const currentPeople = await createPeopleRealm(peopleData, realm);

                if(currentPeople.status === false) {
                    setSyncLogs((prev: any) => [...prev, `Erro ao incluir ${peopleData.razao}`])
                }   
            });

            setSyncLogs((prev: any) => [...prev, ' Tabela "Pessoa" sincronizada']);
        }

        

        //Cidade
        if(cities.length > 0) {
            setSyncLogs((prev: any) => [...prev, ' Tabela "Cidade" sendo sincronizada...']);

            cities.forEach(async(city) => {
                    const currentCity = createCity(realm, city);
                    
                    currentCity!.status === false  && setSyncLogs((prev: any) => [...prev, `Erro ao incluir ${city.nome}`])
            });

            setSyncLogs((prev: any) => [...prev, ' Tabela "Cidade" sincronizada']);
        }


        //Logradouro
        if(logradouro.length > 0) {
            setSyncLogs((prev: any) => [...prev, ' Tabela "Logradouro" sendo sincronizada...']);

            logradouro.forEach(async(logr) => {
                    const currentLogradouro = createLogradouro(realm, logr);

                    currentLogradouro.status === false  && setSyncLogs((prev: any) => [...prev, `Erro ao incluir ${logr.nome}`])
            });

            setSyncLogs((prev: any) => [...prev, ' Tabela "Logradouro" sincronizada']);
        }
        



        
        realm.close();
        await setLastSyncDate(dataToSync.data.dh_atual);
    }
}