import { AxiosError } from "axios";
import { getUserInfoFromStorage } from "../../helpers/localStorageGetInfo";
import { api } from "../../services/axios";
import { UserProps } from "../../types/user";

type CheckSyncProps = {
    tem_negativo: boolean,
    date?: string,
}

export async function checkSync({ tem_negativo, date }: CheckSyncProps) {
    const userInfo: UserProps = await getUserInfoFromStorage();

    const bodyParams = {
        token: userInfo.token,
        "cod-empresa": userInfo.cod_empresa,
        data: date,
        tem_negativo: tem_negativo
    }

    try {
        const {data} = await api.post('/sync', bodyParams);

        if(data.status === false) {
            return { status: false, message: data.message };
        }

        return data;
    } catch (error) {
        console.log('ERRO NA CHAMADA DO SYNC')
        if(error instanceof AxiosError) {
            return { status: false, message: error.response?.data.message };
        }

        return { status: false, message: 'Erro ao efetuar o sincronismo. Tente novamente mais tarde!' };

    }
}