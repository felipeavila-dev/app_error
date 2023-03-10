import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";

import { Container } from "./styles";

type Props = {
    color?: string,
}


export function LoadingCircle({ color }: Props) {
    const { colors } = useTheme();
    return(
        <Container>
            <ActivityIndicator 
                color={ color ? color : colors.blue}
                size='large'
            />
        </Container>
    );
}