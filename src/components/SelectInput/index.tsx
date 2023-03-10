import { TouchableOpacityProps } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { Container, Icon, Text, TextArea } from "./styles";

type Props = TouchableOpacityProps & {
    iconName: string,
    text: string,
}



export function SelectInput({ iconName, text, ...rest }: Props) {
    const { colors } = useTheme();
    return(
        <Container {...rest}>

            <TextArea>
                <Icon name={iconName} />
                <Text>{text}</Text>
            </TextArea>

            <MaterialCommunityIcons 
                name='arrow-down'
                size={20}
                color={colors.placeholder}
            />
        </Container>
    );
}