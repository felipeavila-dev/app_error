import { useContext } from "react";
import Realm from "realm";
import { createPeople } from "../../api/Pessoa";
import { createPeopleRealm, deleteNegativePeople } from "../../api/Realm/Pessoa";
import { checkSync } from "../../api/Sync";
import { GeneralContext } from "../../contexts/GeneralContext";

import { getLastSyncDateFromStorage } from "../../helpers/localStorageGetInfo";
import { setLastSyncDate } from "../../helpers/localStorageSetInfo";
import { PeopleProps } from "../../types/PeopleProps";
import { SyncProps } from "../../types/SyncProps";

export async function syncPeople(realm: Realm, setSyncLogs: React.Dispatch<any>, negativePeople: PeopleProps[]) {

    const lastSyncDate = await getLastSyncDateFromStorage();

    if(negativePeople[0]) {
        // Envia todas as Pessoas com ids negativos para o Easy
        negativePeople.forEach(async (people: PeopleProps) => {
            const response = await createPeople(people);
    
            if(response.status === false) {
                setSyncLogs((prev: string) => [...prev, `Erro ao enviar a Pessoa -> ${people.razao}.` + response.message]);
                return;
            }
        });

        setSyncLogs((prev: string) => [...prev, ' Dados da tabela "Pessoa" foram enviados com sucesso']);
    } else {
        setSyncLogs((prev: string) => [...prev, 'Não existe nenhuma informação nova na tabela "Pessoa" para enviar']);

    }


    
    // Faz o download dos enviadas anteriormente e insere no Realm
    const syncData:SyncProps = await checkSync({ tem_negativo: true, date: lastSyncDate });

    if(syncData.data.pessoa) {
        
        syncData.data.pessoa.forEach(async (pessoa: PeopleProps) => {
            const currentPeople = await createPeopleRealm(pessoa, realm);

            if(currentPeople.status === false) {
                setSyncLogs((prev: any) => [...prev, `Erro ao atualizar a Pessoa ${pessoa.razao}.` + currentPeople.message]);
                return;
            }
        });

        setSyncLogs((prev: string) => [...prev, 'Dados da tabela "Pessoa" foram atualizados com sucesso']);
        await setLastSyncDate(syncData.data.dh_atual);
    } else {
        setSyncLogs((prev: string) => [...prev, 'Dados da tabela "Pessoa" já estão atualizados']);
    }


     // Deleta as pessoas após atualizar o Realm com as informacoes do Easy
     const deletePeople = await deleteNegativePeople(realm);
     if(deletePeople.status === false ) {
        setSyncLogs((prev: any) => [...prev, 'Erro ao limpar a tabela "Pessoa" do banco local' + deletePeople.message]);
         return;
     }

     setSyncLogs((prev: any) => [...prev, 'Pessoas temporarias excluidas com sucesso']);
}