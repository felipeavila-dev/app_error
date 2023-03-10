import { useContext, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getLogradouro } from "../../api/Realm/Logradouro";
import { InternetConnectionBox } from "../../components/InternetConenctionBox";
import { AuthContext } from "../../contexts/AuthContext";
import { GeneralContext } from "../../contexts/GeneralContext";
import { OpenRealmConnection } from "../../database/realmConnection";
import { getFirstSyncFromStorage } from "../../helpers/localStorageGetInfo";
import { fullSynchronization } from "../../SyncFunctions/fullSynchronization";
import { Container, Text } from "./styles";

export function Dashboard() {
    const Context = useContext(GeneralContext);


    return(
        <>
            { !Context.haveInternet && <InternetConnectionBox /> }
            
            <Container>
            </Container>
        </>
    );
}