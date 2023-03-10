import { AxiosError } from 'axios';
import Realm from 'realm';

import { OpenRealmConnection } from "../../database/realmConnection";
import { getUserInfoFromStorage } from '../../helpers/localStorageGetInfo';

// Types
import { PeopleProps } from '../../types/PeopleProps';
import { UserProps } from '../../types/user';


// Gera um ID aleatório negativo
export function generateRandomId() {
    const max = 10000000;
    const min = 1;
    const randomNumber = Math.random() * (max - min);

    return Number(-Math.floor(randomNumber) + min);
}



export async function createPeopleRealm(people: PeopleProps, realmInstance: Realm){

    const newPeople = {
        cod_pessoa: people.cod_pessoa ? people.cod_pessoa : generateRandomId(),
        razao: people.razao,
        fantasia: people.fantasia,
        cnpj_cpf: people.cnpj_cpf,
        tipo_pessoa: people.tipo_pessoa,
        ativo: 'S',
        ie_rg: people.ie_rg,
        cliente: 'S',
        anotacoes: people.anotacoes,
        dt_nascto: people.dt_nascto,
        representante: 'N',
        cod_repres: people.cod_repres,
        cod_logradouro: people.cod_logradouro,
        endereco: people.endereco,
        numero: String(people.numero),
        bairro: people.bairro,
        nome: people.cod_cidade,
        cod_cidade: people.cod_cidade,
        nome_cidade: people.nome_cidade,
        cod_estado: people.cod_estado,
        cep: String(people.cep),
        complemento: people.complemento
    }

    try {
        realmInstance.write(() => {

            realmInstance.create('pessoa', newPeople);

            // console.log('Pessoa criada com sucesso! --- ' + newPeople.razao);
        });

        return { status: true, message: 'Cadastro efetuado com sucesso!'};
    } catch (error) {
        console.log('DEU ERRO ---->', error)

        if(error instanceof AxiosError) {
            return { status: false, message: error.response?.data.message};
        }

        return { status: false, message: 'Erro ao efetuar cadastro! Tente novamente.'}
    } 

    

}

export async function getPeople(realmObject: Realm){

    try {
        const allPeople = realmObject.objects('pessoa').toJSON();
        
        return allPeople;
    } catch (error) {
        console.log('DEU ERRO ----> ', error)
        return { status: false, message: 'Não foi possível buscar os dados! Tente novamente.'};
    }
}

export async function getPeopleByFilter(text: string) {
    const realm = await OpenRealmConnection();

    try {
        const foundedPeople = realm.objects<any>('pessoa').filtered("(razao CONTAINS[c] $0 OR cnpj_cpf CONTAINS $0)", text).toJSON();

        return foundedPeople;
    } catch (error) {
        console.log('DEU ERRO ----> ', error)
        return { status: false, message: 'Não foi possível buscar os dados! Tente novamente.'};
    }finally {
        realm.close();
    }
}

export async function deleteAllPeople(realmObject: Realm) {

    try {
        const peopleObj = realmObject.objects('pessoa');

        realmObject.write(() => {
            realmObject.delete(peopleObj);

            console.log('Dados da tabela PESSOA deletados com sucesso!');
        });

        return { status: true, message: 'Dados deletados com sucesso'};
    } catch (error) {
        console.log('DELETE PEOPLE ----> ', error)
        return { status: false, message: 'Não foi possível deletar os dados da tabela PESSOA.'};

    }
}

export async function deleteNegativePeople(realmObject: Realm) {
    try {
        const peopleObj = realmObject.objects('pessoa').filtered('cod_pessoa < 0');

        realmObject.write(() => {
            realmObject.delete(peopleObj);

        });

        return { status: true, message: 'Dados deletados com sucesso'};
    } catch (error) {
        console.log('Erro ao deletar dados da tabela Pessoa ----> ', error)

        if(error instanceof AxiosError) {
          return { status: false, message: error.response?.data.message};
        }
        return { status: false, message: 'Não foi possível deletar os dados da tabela PESSOA.'};

    }
}