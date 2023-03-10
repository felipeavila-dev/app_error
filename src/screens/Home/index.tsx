import { TouchableOpacity } from "react-native-gesture-handler";
import { Container, Text } from "./styles";

export function Home() {
    return(
        <Container>
            <TouchableOpacity>
                <Text>Sincronizar parcial</Text>
            </TouchableOpacity>
        </Container>
    );
}