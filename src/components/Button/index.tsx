import { ReactSVG } from "react";
import { ButtonProps } from "react-native";
import { LoadingCircle } from "../LoadingCircle";
import { useTheme } from "styled-components";
import { ButtonText, Container, Icon } from "./styles";



type Props = ButtonProps & {
    title: string,
    color?: string,
    iconName?: any,
    isLoading?: any,
};

export function Button({ title, color, iconName, isLoading, ...rest}: Props) {
    const { colors } = useTheme();

    return(
        <Container color={color} {...rest}>
            { isLoading 
                ? <LoadingCircle color={colors.white} /> 
                :
                <>
                    <Icon name={iconName}/>
                    
                    <ButtonText>
                        {title}
                    </ButtonText>
                </>
            }
        </Container>
    );
}