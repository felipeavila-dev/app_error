import { Keyboard, TouchableWithoutFeedback } from "react-native";
import * as Yup from 'yup';
import {  useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from "@react-navigation/native";

// Assets
import LogoImage from '../../assets/images/click_sales_logo.png';

// Components and others
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { StackProps } from "../../types/stackScreenProps";
import { Container, Form, Image, InputsArea, KeyboardAvoidingView, Text } from "./styles";

// Types e schemas
const formSchema = Yup.object({
    empresa: Yup.string().required('Campo obrigatório'),
    cpf: Yup.number().typeError('Somente números').required('Campo obrigatório'),
    senha: Yup.string().min(4, 'Precisa ter no mínimo 4 caracteres').required('Campo obrigatório'),
    senha_confirmacao: Yup.string().test('password-match', 'As senhas devem ser iguais', function(value){
        return this.parent.senha === value
    })
});

type LoginFormProps = Yup.InferType<typeof formSchema>;

export function SignUp() {
    const { control, handleSubmit, formState: { errors }} = useForm<LoginFormProps>({
        resolver: yupResolver(formSchema)
    });

    const navigation = useNavigation<StackProps>();


    function handleCreateUser(data: any) {
        console.log(data)
        console.log(errors)

        navigation.navigate('Login')
    }

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
                            />

                            <Input 
                                placeholder='CPF'
                                name='cpf'
                                control={control}
                                error={errors.cpf?.message}
                            />

                            <Input 
                                placeholder='Senha'
                                name='senha'
                                control={control}
                                error={errors.senha?.message}
                                secureTextEntry
                            />

                            <Input 
                                placeholder='Confirme a senha'
                                name='senha_confirmacao'
                                control={control}
                                error={errors.senha_confirmacao?.message}
                                secureTextEntry

                            />
                        </InputsArea>

                        <Button 
                            title='Cadastrar'
                            onPress={handleSubmit(handleCreateUser)}
                        />

                    </Form>
                        

                </Container>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}