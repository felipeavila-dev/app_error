
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme  } from 'styled-components';
import { BackIcon, Container, Header, Title } from "./styles";

type Props = {
    closeModal: () => void,
}

export function SelectInputModal({ closeModal }: Props) {
    const { colors } = useTheme();

    return(
        <Container>
            <Header>
                <BackIcon onPress={closeModal}>
                        <MaterialCommunityIcons 
                            name='keyboard-backspace' 
                            size={20}
                            color={colors.white}
                        />
                </BackIcon>

                    <Title>Selecione o tipo</Title>

                <BackIcon></BackIcon>
            </Header>
        </Container>
    );
}