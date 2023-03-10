// Libs
import { Dimensions, Keyboard, TouchableWithoutFeedback } from "react-native";
import * as Yup from 'yup';
import {  useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";


// Assets
import LogoImage from '../../assets/images/click_sales_logo.png';

// Components
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { StackProps } from "../../types/stackScreenProps";

// Others
import { Container, CreateAccountButton, Form, Image, InputsArea, KeyboardAvoidingView, Text } from "./styles";


// Types e schemas
const formSchema = Yup.object({
    empresa: Yup.string().required('Campo obrigatório'),
    cpf: Yup.number().typeError('Somente números').required('Campo obrigatório'),
    senha: Yup.string().min(1, 'Precisa ter no mínimo 1 caracter').required('Campo obrigatório'),
});

type LoginFormProps = Yup.InferType<typeof formSchema>;

const { width } = Dimensions.get('window');


export function Login() {
    const { control, handleSubmit, formState: { errors }} = useForm<LoginFormProps>({
        resolver: yupResolver(formSchema)
    });

    const Context = useContext(AuthContext);

    const navigation = useNavigation<StackProps>();


    async function handleLogin(data: LoginFormProps) {
        Context.fetchLogin(data);
    };


    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                behavior='padding'
            >
                <Container>

                    <Image source={LogoImage} />
                   
                    <Form>
                        <InputsArea>
                            <Input 
                                placeholder='Empresa'
                                name='empresa'
                                control={control}
                                error={errors.empresa?.message}
                                autoCapitalize='none'
                                iconName="office-building"
                            />

                            <Input 
                                placeholder='CPF'
                                name='cpf'
                                control={control}
                                error={errors.cpf?.message}
                                keyboardType='numeric'
                                iconName="card-account-details"
                            />

                            <Input 
                                placeholder='Senha'
                                name='senha'
                                control={control}
                                error={errors.senha?.message}
                                secureTextEntry
                                iconName="key"
                            />
                        </InputsArea>

                        <Button 
                            title='Entrar'
                            onPress={handleSubmit(handleLogin)}
                        />

                        <CreateAccountButton onPress={() => navigation.navigate('SignIn')}>
                            <Text>Não possui conta? Cadastre-se!</Text>
                        </CreateAccountButton>
                    </Form>
                        

                </Container>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}