import { AxiosError } from "axios";
import { getUserInfoFromStorage } from "../../helpers/localStorageGetInfo";
import { api } from "../../services/axios";
import { PeopleProps } from "../../types/PeopleProps";
import { UserProps } from "../../types/user";

export async function getPeople() {
    const userData: UserProps = await getUserInfoFromStorage();

    const headerObj = {
        headers: {
            token: userData.token,
            "cod-empresa": userData.cod_empresa
        }
    }

    try {
        const { data } = await api.get('/pessoa', headerObj);
        
        if(data.status === false) {
            return { status: false, message: data.message };
        }

        return data.data;
    } catch (error) {
        if(error instanceof AxiosError) {
            return { status: false, message: error.response?.data.message };
        }

        return { status: false, message: 'Erro ao buscar clientes. Tente novamente mais tarde!' };

    }
}

export async function createPeople(people: PeopleProps) {
    const userData: UserProps = await getUserInfoFromStorage();

    const params = {
        token: userData.token,
        cod_empresa: userData.cod_empresa,
        ...people
    }

    try {
        const { data } = await api.post('/pessoa', params);

        if(data.status === false) {
            return { status: false, message: data.message };
        }

        return data;
    } catch (error) {
        console.log('ERRO AO CADASTRAR PESSOA', error);
        if(error instanceof AxiosError) {
            return { status: false, message: error.response?.data.message };
        }

        return { status: false, message: 'Erro ao cadastrar Pessoa. Tente novamente mais tarde!' };

    }
}