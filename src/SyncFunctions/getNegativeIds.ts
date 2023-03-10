import Realm from "realm";
import { OpenRealmConnection } from "../database/realmConnection";
import { PeopleProps } from "../types/PeopleProps";

export async function getNegativeIds(tableName: string, realmObject: Realm): Promise<PeopleProps[] | any> {
    try {
        const response = realmObject.objects(tableName).filtered('cod_pessoa < 0').toJSON();

        return response;
    } catch (error) {
        console.log('Erro ao consultar o Realm -----> :', error);
        realmObject.close();
    } 
}