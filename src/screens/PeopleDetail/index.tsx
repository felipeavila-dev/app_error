import { Container, Label, Text, InformationArea, Title} from "./styles";

// Types
import { PeopleProps } from "../../types/PeopleProps";

// Tipagem dos parametros enviados pela rota
type Props = {
    route: {
        params: {
            data: PeopleProps
        }
    }
}

// Verifica se o APP esta rodando em um tablet
import DeviceInfo from "react-native-device-info";
const isTablet = DeviceInfo.isTablet();

export function PeopleDetail({route}: Props) {
    const { params: { data }} = route;

    return(
        <Container
            style={{
                paddingHorizontal: 24,
                paddingVertical: isTablet ? 30 : 24
            }}
            contentContainerStyle={{
                paddingVertical: 24
            }}
        >
            

            <Title>Dados pessoais</Title>
            <InformationArea >
                <Label>Código</Label>
                <Text>{data.cod_pessoa}</Text>

                <Label>Tipo de pessoa</Label>
                <Text>{data.tipo_pessoa === 'F' ? 'Física' : 'Jurídica'}</Text>

                <Label>{data.tipo_pessoa === 'F' ? 'Nome' : 'Razão social'}</Label>
                <Text>{data.razao}</Text>

                { data.fantasia &&
                    <>
                        <Label>Nome fantasia</Label>
                        <Text>{data.fantasia}</Text>
                    </>
                }

                <Label>{data.tipo_pessoa === 'F' ? 'CPF' : 'CNPJ'}</Label>
                <Text>{data.cnpj_cpf}</Text>

                <Label>{data.tipo_pessoa === 'F' ? 'RG' : 'Inscrição estadual'}</Label>
                <Text>{data.ie_rg}</Text>

                <Label>{data.tipo_pessoa === 'F' ? 'Data de nascimento' : 'Data de criação'}</Label>
                <Text>{data.dt_nascto}</Text>
            </InformationArea>


            <Title>Localização</Title>
            <InformationArea >
                <Label>Endereço</Label>
                <Text>{data.endereco}, {data.numero}</Text>

                <Label>Bairro</Label>
                <Text>{data.bairro}</Text>

                {/* VERIFICAR TABELA PESSOA SOBRE O CAMPO CIDADE  / ESTADO*/}
                <Label>Cidade</Label>
                <Text>{data.nome_cidade} -{data.cod_estado} </Text>

                { data.complemento &&
                    <>
                        <Label>Complemento</Label>
                        <Text>{data.complemento}</Text>
                    </>
                }

                <Label>CEP</Label>
                <Text>{data.cep}</Text>
            </InformationArea>

            <Title>Informações adicionais</Title>
            <InformationArea >
                <Label>Ativo</Label>
                <Text>{data.ativo === 'S' ? 'Sim' : 'Não'}</Text>

                <Label>Cliente</Label>
                <Text>{data.cliente === 'S' ? 'Sim' : 'Não'}</Text>

                <Label>Representante</Label>
                <Text>{data.representante === 'S' ? 'Sim' : 'Não'}</Text>

                <Label>Anotações</Label>
                <Text>{data.anotacoes ? data.anotacoes : 'Nenhuma anotação'}</Text>
            </InformationArea>
        </Container>
    );
}
