// Libs
import { api} from '../../services/axios';
import { AxiosError } from 'axios';

// Types
import { UserProps } from '../../types/user';

type LoginProps = {
    cpf: string,
    senha: string,
    versao_app?: string,
    empresa: string,
}

type PromiseProps = {
    status: boolean,
    message: string,
}

export async function doLogin(user: LoginProps) {
    try {
        const { data } = await api.post('usuario/login', user);

        // Caso de retorne erro da API
        if(data.status === false) {
            return { status: false, message: data.message };
        }

        return data;
        
    } catch (error) {
        if(error instanceof AxiosError) {
            return { status: false, message: error.response?.data.message };
        }    
        
        return { status: false, message: 'Erro ao efetuar login. Tente novamente mais tarde!' };
    }

}