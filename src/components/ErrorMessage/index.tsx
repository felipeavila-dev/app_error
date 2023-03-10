import { Container, Icon, Text } from "./styles";

type Props = {
    iconName?: string,
    text: string,
}

export function ErrorMessage({ text, iconName }: Props) {
    return(
        <Container>
            <Icon name={iconName} />
            <Text>{text}</Text>
        </Container>
    );
}