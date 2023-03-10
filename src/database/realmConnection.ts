import Realm from 'realm';
import { cidade } from './schemas/Cidade';
import { logradouro } from './schemas/Logradouro';
import { pessoa } from './schemas/Pessoa';

export async function OpenRealmConnection(){
    return await Realm.open({
        // deleteRealmIfMigrationNeeded: true,
        schema: [
            pessoa,
            cidade,
            logradouro
        ],
    });
}

