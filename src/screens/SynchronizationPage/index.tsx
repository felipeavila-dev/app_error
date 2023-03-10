import { useTheme } from "styled-components";
import { MaterialCommunityIcons } from '@expo/vector-icons';


// Components
import { LoadingCircle } from "../../components/LoadingCircle";
import { fullSynchronization } from "../../SyncFunctions/fullSynchronization";
import { partialSynchronization } from "../../SyncFunctions/partialSynchronization";

// Others
// import { AlertArea, AlertMessage, Container, Icon, Logo, Subtitle, Title } from "./styles";
import { getFirstSyncFromStorage } from "../../helpers/localStorageGetInfo";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { DrawerScreenProps } from "../../routes/appRoutes";
import { setFirstSyncToStorage } from "../../helpers/localStorageSetInfo";
import { AlertArea, AlertMessage, AreaTitle, ButtonsArea, ButtonText, Container, Icon, ItemsArea, Log, LogArea, SyncButton, SyncIcon } from "./styles";
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GeneralContext } from "../../contexts/GeneralContext";
import { InternetConnectionBox } from "../../components/InternetConenctionBox";
import { StatusBar, Text } from "react-native";
import { getPendingDatFromLocalStorage } from "../../helpers/pendingDataStorage";
import { STORAGE } from "../../helpers/localStorageVariables";

export function SynchronizationPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [dataPending, setDataPending] = useState<[]>();

    const Context = useContext(GeneralContext);
    const navigation = useNavigation<NavigationProp<DrawerScreenProps>>();

    const { colors } = useTheme();

    async function executeFirstSync() {
        const isFirstSync = await getFirstSyncFromStorage();
        
        if(isFirstSync) {
            await executeSync();
        }
    };
    
    async function executeSync() {
       
        setIsLoading(true);

        const isFirstSync = await getFirstSyncFromStorage();

        // Se for o primeiro sincronismo, irá fazer o sincronismo total
        if(isFirstSync) {
            Context.setSyncLogs((prev: string[]) => [...prev, 'Sincronismo completo sendo iniciado']); // Etapa do sincronismo
            
            await fullSynchronization(Context.setSyncLogs);

            await setFirstSyncToStorage(false); // Alterar para FALSE

            Context.setSyncLogs((prev: string[]) => [...prev, 'Sincronismo completo finalizado!']); // Etapa do sincronismo
            setIsLoading(false);
        } else {

            try {
                await partialSynchronization(Context.setSyncLogs);

                // Reseta os logs de dados pendentes
                await AsyncStorage.removeItem(STORAGE.dados_pendentes);
                Context.setPendingData([]);
            } catch (error) {
                console.log('Erro na chamada do PARTIAL SYNC', error);
            } finally {
                setIsLoading(false);
            }

        }

        setIsLoading(false);
    }

    function handleGoBack() {
        Context.setSyncLogs([]);
        navigation.goBack();
    }

    useEffect(() => {
        executeFirstSync();
    }, []);

    return(
        <>  
            <StatusBar hidden/>

            {!Context.haveInternet && <InternetConnectionBox />}

            <Container>

                <AreaTitle>Dados pendentes de envio</AreaTitle>
                <ItemsArea>
                    <LogArea>
                        {Context.pendingData.map((data, index) => 
                            <Log key={index}>
                                <MaterialCommunityIcons name='alert' size={24} color={colors.yellow}/>
                                {data.description}
                            </Log>
                        )}
                    </LogArea>
                </ItemsArea>

                <AreaTitle>Logs do sincronismo</AreaTitle>
                <ItemsArea>
                    <LogArea>
                        { isLoading ? 
                            <Log>
                                <SyncIcon />
                                Sincronizando ... 
                            </Log>   
                            :
                            <>
                                {Context.syncLogs.map((log, index) => 
                                    <Log key={index}>
                                        <MaterialCommunityIcons name='check-circle' size={24} color={colors.green}/>
                                        {log}
                                    </Log>
                                )}
                            </>

                        }
                    </LogArea>
                </ItemsArea>


                <AlertArea>
                    <Icon name='alert-circle' color={colors.yellow}/>
                    <AlertMessage>Não feche a aplicação durante o sincronismo</AlertMessage>
                </AlertArea>


                <ButtonsArea>
                    <SyncButton 
                        color={colors.placeholder}
                        disabled={isLoading}
                        onPress={handleGoBack}
                    >
                        <ButtonText>
                            { isLoading ? <MaterialCommunityIcons name='block-helper' size={24}/> : 'Voltar'}
                        </ButtonText>
                    </SyncButton>

                    <SyncButton 
                        disabled={isLoading || !Context.haveInternet}
                        onPress={executeSync}
                    >
                        {isLoading ? '' : <Icon name='sync' color={colors.white}/>}

                        <ButtonText
                            disabled={isLoading || !Context.haveInternet}
                        >
                            {isLoading ? <LoadingCircle /> : 'Sincronizar dados'}
                        </ButtonText>
                    </SyncButton>
                </ButtonsArea>
            </Container>
        </>
    );
}