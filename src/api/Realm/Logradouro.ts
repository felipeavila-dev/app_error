import { AxiosError } from "axios";
import { LogradouroProps } from "../../types/LogradouroProps";

export function createLogradouro(realm: Realm, logradouroData: LogradouroProps) {
    try {
        realm.write(() => {
            realm.create('logradouro', logradouroData);
        });
        
        return { status: true, message: 'Cadastro de logradouro efetuado com sucesso!'};
    } catch (error) {
        console.log('Erro na inclusão do logradouro no Realm ---> ', error);
        
        if(error instanceof AxiosError) {
            return { status: false, message: error.response?.data.message };
        }

        return { status: false, message: "Não foi possível adicionar o logradouro. Tente novamente!" };

    }
}

export async function getLogradouro(realm: Realm): Promise<any>{
    try {
        const logradouro = realm.objects<LogradouroProps>('logradouro').toJSON();

        return logradouro;

    } catch (error) {
        console.log('Erro ao buscar logradouro ---> ', error);
        if(error instanceof AxiosError) {
            return { status: false, message: error.response?.data.message };
        }

        return { status: false, message: 'Erro ao buscar logradouro. Tente novamente!' };
    }
}

export async function deleteAllLogradouro(realm: Realm) {
    try {
        const logradouroObj = realm.objects('logradouro');

        realm.write(() => {
            realm.delete(logradouroObj);

            console.log('Removido todos os Logradouros');
        });

        return { status: true, message: 'Dados da tabela "Logradouro"deletados com sucesso'};

    } catch (error) {
        console.log('DELETE LOGRADOURO ----> ', error)
        return { status: false, message: 'Não foi possível deletar os dados da tabela LOGRADOURO.'};
    }
}