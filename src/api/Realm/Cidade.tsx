import { AxiosError } from "axios";
import { OpenRealmConnection } from "../../database/realmConnection";
import { CityProps } from "../../types/CityProps";

export function createCity(realm: Realm, cityData: CityProps) {
    try {
        realm.write(() => {
            realm.create('cidade', cityData);

        });
        
        // console.log('Cidade criada com sucesso no Realm! --- ' + cityData.nome);
        return { status: true, message: 'Cadastro de cidade efetuado com sucesso!'};
    } catch (error) {
        console.log('Erro na inclusão da cidade no Realm ---> ', error);
        
        if(error instanceof AxiosError) {
            return { status: false, message: error.response?.data.message };
        }

        return { status: false, message: "Não foi possível adicionar a cidade. Tente novamente!" };

    }
}


export async function getCitybyId(cod_cidade: number) {
    const realm = await OpenRealmConnection();

    try {
        const city = realm.objects('cidade').filtered("cod_cidade == $0", cod_cidade).toJSON();
        console.log(city);
        // return city;
    } catch (error) {
        console.log(error);

        if(error instanceof AxiosError) {
            return { status: false, message: error.response?.data.message };
        }

        return { status: false, message: 'Erro ao buscar dados da tabela "Cidade".'};
    } finally {
        realm.close();
    }
}



export async function deleteAllCities(realm: Realm) {
    try {
        const cities = realm.objects('cidade');

        if(cities.length) {
            realm.write(() => {
                realm.delete(cities);
            });
        };

        console.log('Dados da tabela "Cidade" deletados com sucesso!');
        return { status: true, message: 'Dados da tabela "Cidade" deletados com sucesso!'};
    
    } catch (error) {
        console.log(error);

        if(error instanceof AxiosError) {
            return { status: false, message: error.response?.data.message };
        }

        return { status: false, message: 'Erro ao remover dados da tabela "Cidade".'};
    }
}