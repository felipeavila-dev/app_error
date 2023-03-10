import { MaterialIcons} from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { BackIcon, Container, Header, LogradouroCard, LogradouroContainer, LogradouroName, Title } from "./styles";

type Props = {
    closeLogradouroModal: React.Dispatch<boolean>,
    currentLogradouro: { cod_logradouro: number, nome: string},
    setCodLogradouro: React.Dispatch<any>    
}

// Verifica se o APP esta rodando em um tablet
import DeviceInfo from "react-native-device-info";
import { getLogradouro } from '../../api/Realm/Logradouro';
import { OpenRealmConnection } from '../../database/realmConnection';
import { useEffect, useState } from 'react';
import { LogradouroProps } from '../../types/LogradouroProps';
import { FlatList } from 'react-native-gesture-handler';
import { Button } from '../Button';
const isTablet = DeviceInfo.isTablet();

export function LogradouroModal({ closeLogradouroModal, currentLogradouro, setCodLogradouro }: Props) {
    const [logradouro, setLogradouro] = useState<LogradouroProps[]>([]);

    const { colors } = useTheme();

    async function fetchLogradouro() {
        const realm = await OpenRealmConnection();

        const response = await getLogradouro(realm);
        setLogradouro(response);
    }

    useEffect(() => {
        fetchLogradouro();
    }, []);

    return(
        <Container>
            <Header>
                <Title>Selecione um logradouro</Title>
            </Header>

            <LogradouroContainer>
                <FlatList 
                    data={logradouro}
                    keyExtractor={item => String(item.cod_logradouro)}
                    style={{ marginBottom: 24 }}
                    renderItem={({ item }) => (
                        <LogradouroCard 
                            isActive={item.cod_logradouro === currentLogradouro.cod_logradouro}
                            onPress={() => setCodLogradouro({ cod_logradouro: item.cod_logradouro, nome: item.nome })}    
                        >
                            <LogradouroName
                                isActive={item.cod_logradouro === currentLogradouro.cod_logradouro }
                            >
                                {item.nome}
                            </LogradouroName>
                        </LogradouroCard>
                    )}
                />

               <Button title='Selecionar' onPress={() => closeLogradouroModal(false)} />

            </LogradouroContainer>

        </Container>
    );
}