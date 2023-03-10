import { AxiosError } from "axios";
import { api } from "../../services/axios";

type RequestProps = {
    token: string,
    cod_empresa: string
}

export async function getAddress(cep: string, user: RequestProps) {
    const config = {
        headers: { 
            cep,
            token: user.token,
            "cod-empresa": user.cod_empresa
        },
      }

    try {
        const { data } = await api.get('/cep', config);

        if(data.data === false) {
            return { status: false, message: data.message };
        }

        return data.data;
    } catch (error) {
        if(error instanceof AxiosError) {
            return { status: false, message: error.response?.data.message };
        }

        console.log('ERROO ---> ', error);
        return { status: false, message: 'Não foi possível buscar o cep. Tente novamente!'};

    }
}