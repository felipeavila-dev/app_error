import { Input } from "../Input";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from "styled-components";
import { FlatList, Modal, Text } from "react-native";
import { useContext, useState } from "react";
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Components
import { ErrorMessage } from "../ErrorMessage";
import { PeopleCard } from "../PeopleCard";
import { Button } from "../Button";

// Others
import { getPeopleByFilter } from "../../api/Realm/Pessoa";
import { BackIcon, Container, ContentArea, Header, PeopleListArea, Title } from "./styles";

// Types
import { PeopleProps } from "../../types/PeopleProps";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { DrawerScreenProps } from "../../routes/appRoutes";
import { GeneralContext } from "../../contexts/GeneralContext";
import { InternetConnectionBox } from "../InternetConenctionBox";

type FormType = Yup.InferType<typeof Schema>;

const Schema = Yup.object({
    procura_cliente: Yup.string().required('A pesquisa não pode ser vazia'),
});

type Props = {
    closeSearchPeopleModal: React.Dispatch<boolean>,
}


export function SearchPeopleModal({ closeSearchPeopleModal }: Props) {
    const [people, setPeople] = useState<PeopleProps[]>([]);
    const [searching, setSearching] = useState(false);
    const [showNotFoundMessage, setShowNotFoundMessage] = useState(false);

    const { colors } = useTheme();
    const Context = useContext(GeneralContext);
    const navigation = useNavigation<NavigationProp<DrawerScreenProps>>();

    const { control, handleSubmit, formState: { errors } } = useForm<FormType>({
        resolver: yupResolver(Schema)
    });

    async function handleSearchPeople(data: FormType) {
        setSearching(true);

        const response: PeopleProps[] | any = await getPeopleByFilter(data.procura_cliente);


        if(!response.length) {
            setPeople([]);
            setShowNotFoundMessage(true);
        } else {
            setPeople(response);
            setShowNotFoundMessage(false);
        }

        setSearching(false);
    }

    function handleRedirectToDetail(people: PeopleProps) {
        closeSearchPeopleModal(false);
        navigation.navigate('PeopleDetail', { data: people })
    }

    return(
        <Container>
            <Header>
                <BackIcon onPress={() => closeSearchPeopleModal(false)}>
                        <MaterialCommunityIcons 
                            name='keyboard-backspace' 
                            size={24}
                            color={colors.white}
                        />
                </BackIcon>
                <Title>Pesquisa de cliente</Title>
                <BackIcon />
            </Header>

            {!Context.haveInternet && <InternetConnectionBox />}

            <ContentArea>
                <Input 
                    iconName="account-search"
                    name="procura_cliente"
                    placeholder='Digite um nome, razão ou CPF/CNPJ'
                    control={control}
                    autoCapitalize='none'
                    autoCorrect={false}
                    returnKeyType='send'
                    onSubmitEditing={handleSubmit(handleSearchPeople)}
                    error={errors.procura_cliente?.message}
                />

                {
                    showNotFoundMessage
                        ? 
                            <ErrorMessage iconName='alert-circle'  text="Não foi encontrado nenhum cliente."/>
                        : 
                            <FlatList 
                                data={people}
                                keyExtractor={item => String(item.cod_pessoa)}
                                renderItem={({ item }) => 
                                    <PeopleCard 
                                        peopleData={item}
                                        onPress={() => handleRedirectToDetail(item)}
                                    />
                                }  
                                contentContainerStyle={{
                                    paddingVertical: 24
                                }}  
                            />
                }

                <Button 
                    title={searching ? 'Procurando...' : 'Procurar'}
                    onPress={handleSubmit(handleSearchPeople)}
                    isLoading={searching}
                    disabled={searching}
                />
            </ContentArea>

        </Container>
    );
}