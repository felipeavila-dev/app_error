import { Text } from "react-native";
import { Avatar, Container, UserName } from "./styles";

export function DrawerHeader() {
    return(
        <Container>
            <Avatar source={{
                uri: 'https://png.pngitem.com/pimgs/s/22-223925_female-avatar-female-avatar-no-face-hd-png.png'
            }}/>

            <UserName>Usuário</UserName>
        </Container>
    );
}