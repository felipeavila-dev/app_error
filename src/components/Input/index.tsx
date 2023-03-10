import { TextInputProps } from "react-native";
import { Controller } from 'react-hook-form';
import { useTheme } from "styled-components";

import { InputContainer, TextInput, ErrorMessage, Container, Icon } from "./styles";

type Props = TextInputProps & {
    name: string,
    control: any,
    error?: string,
    iconName: string,
};

export function Input({name, control, error = '', iconName, ...rest}: Props) {
    const { colors } = useTheme();
    return(
        <>
            <Controller 
                name={name}
                control={control}
                render={({ field: { onChange, value }}) => 
                    <InputContainer error={error}>
                        <Icon name={iconName}/>

                        <TextInput 
                            onChangeText={onChange}
                            value={value}
                            placeholderTextColor={colors.placeholder}
                            {...rest}
                        />
                    </InputContainer>
                }
            />
            
            {/* Exibe erro de validação caso exista */}
            {error && 
                <ErrorMessage>
                    {error}
                </ErrorMessage>
            }
        </>
        
    )
}