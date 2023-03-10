
// Libs
import { useContext, useState } from "react";
import { Alert, Modal, ScrollView, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from "styled-components";
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../../contexts/AuthContext";
import { format } from 'date-fns';

import DateTimePicker from '@react-native-community/datetimepicker';

// API
import { getAddress } from "../../api/Cep";


// Components
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { createPeopleRealm } from "../../api/Realm/Pessoa";
import { DateInputModal } from "../../components/DateInputModal";
import { SelectInput } from "../../components/SelectInput";


import { BackIcon, Container, Form, FormTitle, Header, PeopleTypeArea, PeopleTypeButton, PeopleTypeText, Title } from "./styles";

// Types
const Schema = Yup.object({
    // tipo_pessoa: Yup.string().required('Campo obrigatório'),
    razao: Yup.string().required('Campo obrigatório'),
    fantasia: Yup.string(),
    cnpj_cpf: Yup.string().min(11, 'CPF / CNPJ inválido').required('Campo obrigatório'),
    ie_rg: Yup.string(),
    dt_nascto: Yup.string(),

    cep: Yup.number().typeError('Apenas números'),
    endereco: Yup.string(),
    numero: Yup.number().typeError('Somente números'),
    bairro: Yup.string(),
    nome_cidade: Yup.string(),
    cod_estado: Yup.string(),
    complemento: Yup.string(),
});

type FormState = Yup.InferType<typeof Schema>;

type Props = {
    closePeopleModal: React.Dispatch<boolean>
}

// Verifica se o APP esta rodando em um tablet
import DeviceInfo from "react-native-device-info";
import { OpenRealmConnection } from "../../database/realmConnection";
import { GeneralContext, PendingDataProps } from "../../contexts/GeneralContext";
import { InternetConnectionBox } from "../../components/InternetConenctionBox";
import { LogradouroModal } from "../../components/LogradouroModal";
import { savePendingDatIntoLocalStorage } from "../../helpers/pendingDataStorage";

const isTablet = DeviceInfo.isTablet();

export function RegisterPeopleModal({ closePeopleModal }: Props) {
    const [peopleType, setPeopleType] = useState('F');
    const [birthdayDate, setBirthdayDate] = useState('');
    const [birthDayDateToShow, setBirthDayDateToShow] = useState('');
    const [showDatePickerModal, setShowDatePickerModal] = useState(false);
    const [showLogradouroModal, setShowLogradouroModal] = useState(false);
    const [date, setDate] = useState(new Date()); // Usado apenas para o datepicker
    const [codLogradouro, setCodLogradouro] = useState({ cod_logradouro: 1, nome: ''});

    console.log(codLogradouro)

    const { colors } = useTheme();
    const Context = useContext(AuthContext);
    const AppContext = useContext(GeneralContext);

    const { handleSubmit, control, reset, formState: { errors }, getValues, setValue} = useForm<FormState>({
        resolver: yupResolver(Schema)
    });

    async function handleCreatePeople(data: any) {
        const realm = await OpenRealmConnection();

        if(peopleType === '' || peopleType === undefined) {
            Alert.alert('Selecione pessoa física ou jurídica');
        }

        const newPeople = {
            dt_nascto: birthdayDate,
            tipo_pessoa: peopleType,
            cod_repres: Number(Context.user.cod_pessoa),
            cod_logradouro: codLogradouro.cod_logradouro,
            ...data
        }

        const peopleResponse = await createPeopleRealm(newPeople, realm);

        if(peopleResponse?.status === false) {
            Alert.alert('Erro!', peopleResponse.message);
            return;
        }

        Alert.alert(
            'Sucesso',
            peopleResponse?.message,
            [{ onPress: () => closePeopleModal(false)}]
        );
        
        AppContext.setPendingData((prev: PendingDataProps[]) => [...prev, { id: data.cod_pessoa, description: data.razao }])
        await savePendingDatIntoLocalStorage({ id: data.cod_pessoa, description: data.razao })
        
        reset();
        setBirthdayDate('');
        setCodLogradouro({ cod_logradouro: 1, nome: ''});
        
        realm.close();
    }

    async function handleGetAddress() {
        const cep = getValues('cep');

        if(cep) {
            const response = await getAddress(String(cep), Context.user);

            if(response.status === false) {
                Alert.alert('Erro', response.message);
            }

            setValue('endereco', response.endereco);
            setValue('bairro', response.bairro);
            setValue('nome_cidade', response.nome_cidade);
            setValue('cod_estado', response.cod_estado);
        }
    }

    function handleGetBirthday(event:any, selectedDate: any) {
        const currentDate = format(new Date(selectedDate), 'yyyy-MM-dd HH:mm:ss');
        setBirthDayDateToShow(new Date(currentDate).toLocaleDateString());
        setBirthdayDate(currentDate);
        setShowDatePickerModal(false);
    }


    return(
            <Container >
                <Header>
                    <BackIcon onPress={() => closePeopleModal(false)}>
                        <MaterialIcons 
                            name='arrow-back' 
                            size={ isTablet ? 26 : 20}
                            color={colors.white}
                        />
                    </BackIcon>

                    <Title>Cadastro de pessoa</Title>

                    <BackIcon></BackIcon>
                </Header>

                {!AppContext.haveInternet && <InternetConnectionBox />}

                <ScrollView 
                    style={{ padding: 24 }}
                    contentContainerStyle={{
                        paddingBottom: 40
                    }}
                >
                    
                    <FormTitle>Dados Pessoais</FormTitle>
                    <Form>
                        
                        <PeopleTypeArea>
                            <PeopleTypeButton
                                active={peopleType === 'F'}
                                onPress={() => setPeopleType('F')}
                            >
                                <PeopleTypeText>Física</PeopleTypeText>
                            </PeopleTypeButton>

                            <PeopleTypeButton
                                active={peopleType === 'J'}
                                onPress={() => setPeopleType('J')}
                            >
                                <PeopleTypeText>Jurídica</PeopleTypeText>
                            </PeopleTypeButton>
                        </PeopleTypeArea>

                        <Input 
                            control={control}
                            name='razao'
                            placeholder={peopleType === 'F' ? 'Nome*' : 'Razão social*'}
                            iconName={peopleType === 'F' ? 'face-man' : 'office-building'}
                            autoCapitalize='words'
                            error={errors.razao?.message}
                        />

                        { peopleType === 'J' &&
                            <Input 
                                control={control}
                                name='fantasia'
                                placeholder='Nome fantasia'
                                iconName="office-building"
                                autoCapitalize='words'
                                error={errors.fantasia?.message}
                            />
                        }

                        <Input 
                            control={control}
                            name='cnpj_cpf'
                            placeholder={peopleType === 'F' ? 'Cpf' : 'CNPJ'}
                            iconName='card-account-details'
                            autoCapitalize='words'
                            error={errors.cnpj_cpf?.message}
                        />

                        <Input 
                            control={control}
                            name='ie_rg'
                            placeholder={peopleType === 'F' ? 'Rg' : 'Inscrição estadual'}
                            iconName='card-account-details'
                            autoCapitalize='words'
                            error={errors.ie_rg?.message}
                        />

                        <SelectInput 
                            iconName="calendar-today"
                            text={birthDayDateToShow !== '' ? birthDayDateToShow : peopleType === 'F' ? 'Data de nascimento': 'Data de criação' }
                            onPress={() => setShowDatePickerModal(prev => !prev)}
                        />

                        { showDatePickerModal && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={'date'}
                                display='inline'
                                // is24Hour={true}
                                onChange={handleGetBirthday}
                                style={{ height: 450}}
                            />
                        )}
                    </Form>

                    <FormTitle>Endereço</FormTitle>
                    <Form>
                        <Input 
                            control={control}
                            name='cep'
                            placeholder='Cep'
                            autoCapitalize='words'
                            iconName='map-marker'
                            onBlur={ AppContext.haveInternet ? handleGetAddress : () => {} }
                        />

                        <SelectInput 
                            iconName="city"
                            text={codLogradouro.nome ? codLogradouro.nome : 'Selecione um logradouro'}
                            onPress={() => setShowLogradouroModal(true)}
                        />

                        <Modal visible={showLogradouroModal}>
                            <LogradouroModal 
                                closeLogradouroModal={setShowLogradouroModal} 
                                currentLogradouro={codLogradouro}
                                setCodLogradouro={setCodLogradouro}    
                            />
                        </Modal>

                        <Input 
                            control={control}
                            name='endereco'
                            placeholder='Endereço'
                            iconName="home-map-marker"
                            autoCapitalize='words'
                        />

                        <Input 
                            control={control}
                            name='numero'
                            placeholder='Número'
                            iconName="numeric"
                            autoCapitalize='words'
                        />

                        <Input 
                            control={control}
                            name='bairro'
                            placeholder='Bairro'
                            iconName='home-map-marker'
                            autoCapitalize='words'
                        />

                        <Input 
                            control={control}
                            name='nome_cidade'
                            placeholder='Cidade'
                            iconName='map-marker'
                            autoCapitalize='words'
                        />

                        <Input 
                            control={control}
                            name='cod_estado'
                            placeholder='Estado'
                            iconName='map-marker'
                            autoCapitalize='words'
                        />

                        <Input 
                            control={control}
                            name='complemento'
                            placeholder='Complemento'
                            iconName='text-short'
                            autoCapitalize='words'
                        />

                    </Form>

                    <Button 
                        title="Cadastrar"
                        onPress={(handleSubmit(handleCreatePeople))}
                    />

                </ScrollView>
            </Container>
    );
}