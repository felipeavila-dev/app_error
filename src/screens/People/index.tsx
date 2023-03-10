import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useContext, useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { Alert, Modal } from "react-native";
import { FlatList } from "react-native-gesture-handler";

// Components
import { Button } from "../../components/Button";
import { PeopleCard } from "../../components/PeopleCard";
import { RegisterPeopleModal } from "../RegisterPeopleModal";
import { SearchPeopleModal } from "../../components/SearchPeopleModal";

// Others
import { getPeople } from "../../api/Realm/Pessoa";
import { DrawerScreenProps } from "../../routes/appRoutes";
import { GeneralContext } from "../../contexts/GeneralContext";

// Types
import { PeopleProps } from "../../types/PeopleProps";

import { Container } from "./styles";
import { OpenRealmConnection } from "../../database/realmConnection";
import { InternetConnectionBox } from "../../components/InternetConenctionBox";

export function People() {
    const [people, setPeople] = useState<PeopleProps[]>([]);

    // Hooks
    const Context = useContext(GeneralContext);
    const { colors } = useTheme();
    const navigation = useNavigation<NavigationProp<DrawerScreenProps>>();

    async function handleClosePeopleModal() {
        await fetchPeople();
        Context.setShowCreatePeopleModal(false);
    }

    async function handleCloseSearchPeopleModal() {
        await fetchPeople();
        Context.setShowSearchPeopleModal(false);
    }

    async function fetchPeople() {
        const realm = await OpenRealmConnection();
        
        const response: PeopleProps[] | any = await getPeople(realm);

        if(response.status === false) {
            Alert.alert('Erro', 'Não foi possível carregar a lista. Tente novamente!');
            return;
        }

        setPeople(response);
        realm.close();
    }    

    useFocusEffect(
        useCallback(() => {
            fetchPeople();
        }, [])
    );


    return(
        <>
            {!Context.haveInternet && <InternetConnectionBox />}

            <Container>
                    
                <FlatList 
                    data={people}
                    keyExtractor={item => String(item.cod_pessoa)}
                    renderItem={({ item }) => 
                        <PeopleCard 
                            peopleData={item}
                            onPress={() => 
                                navigation.navigate('PeopleDetail', { data: item }
                            )}
                        />
                    }
                    style={{ marginBottom: 20}}
                    showsVerticalScrollIndicator={false}
                />

                <Button 
                    title='Novo Cliente'
                    iconName='plus'
                    onPress={() => Context.setShowCreatePeopleModal(true)}
                />

                {/* Exibe o modal para cadastro de pessoa caso a condicao seja atendida */}
                <Modal visible={Context.showCreatePeopleModal} animationType='slide'>
                    <RegisterPeopleModal closePeopleModal={handleClosePeopleModal}/>
                </Modal>

                {/* Exibe o modal para pesquisa de cliente */}
                <Modal visible={Context.showSearchPeopleModal}>
                    <SearchPeopleModal closeSearchPeopleModal={handleCloseSearchPeopleModal}/>
                </Modal>

                
            </Container>
        </>
    );
}