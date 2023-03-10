// General
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { GeneralContext, GeneralContextProvider } from '../contexts/GeneralContext';
import { useContext } from 'react';

// Screens
import { Dashboard } from '../screens/Dashboard';
import { People } from '../screens/People';
import { CustomDrowerContent } from '../components/CustomDrowerContent';
import { PeopleDetail } from '../screens/PeopleDetail';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { PeopleProps } from '../types/PeopleProps';

// Types
export type DrawerScreenProps = {
    Dashboard: undefined,
    People: undefined,
    PeopleDetail: {
        data: PeopleProps
    },
    SynchronizationPage: undefined
    
}

// Verifica se o APP esta sendo utilizado em um tablet
import DeviceInfo from "react-native-device-info";
import { SynchronizationPage } from '../screens/SynchronizationPage';
const isTablet = DeviceInfo.isTablet();

export function AppRoutes() {
    const turnOffRoute = true;

    const Drawer = createDrawerNavigator<DrawerScreenProps>();
    
    const { colors } = useTheme();
    const Context = useContext(GeneralContext);
    const navigation = useNavigation<NavigationProp<DrawerScreenProps>>();

    const drawerOptions = {
        headerTintColor: colors.white,
        headerTitleStyle: {
            fontSize: isTablet ? 24 : 18,
        },
        headerStyle: {
            backgroundColor: colors.blue,
            height: isTablet ? 100 : 75
        },
        drawerLabelStyle:{ fontSize: isTablet ? 24 : 16},
       
    }

    return(
        // <GeneralContextProvider>

            <Drawer.Navigator
                // initialRouteName='Dashboard'
                drawerContent={(props) => <CustomDrowerContent {...props}/>}
            >
                <Drawer.Screen 
                    name='Dashboard' 
                    component={Dashboard}
                    options={{
                        drawerIcon: () => <MaterialCommunityIcons name='home' size={ isTablet ? 30 : 20 }  />,
                        ...drawerOptions
                    }}
                />

                <Drawer.Screen 
                    name='People'
                    component={People}
                    options={{
                        title: 'Clientes',
                        headerRight: () => (
                            <TouchableOpacity style={{ paddingRight: 24}} onPress={() => Context.setShowSearchPeopleModal(true)}>
                                <MaterialCommunityIcons name='account-search' size={ isTablet ? 34 : 28 } color={colors.white}/>
                            </TouchableOpacity>
                            // <TouchableOpacity style={{ paddingRight: 24}} onPress={() => Context.setShowCreatePeopleModal(true)}>
                            //     <MaterialCommunityIcons name='plus' size={ isTablet ? 34 : 28 } color={colors.white}/>
                            // </TouchableOpacity>
                        ),
                        drawerIcon: () => <MaterialCommunityIcons name='face-man' size={ isTablet ? 30 : 20 } />,
                        ...drawerOptions
                    }}
                
                />

                <Drawer.Screen 
                    name='PeopleDetail' 
                    component={PeopleDetail}
                    options={{
                        drawerItemStyle:{ height: 0 },
                        drawerLabel: 'Detalhes',
                        title: 'Detalhes',
                        headerLeft: () => (
                            <TouchableOpacity style={{ paddingLeft: 24}} onPress={() => navigation.navigate('People')}>
                                <MaterialCommunityIcons name='arrow-left' size={ isTablet ? 34 : 28 }  color={colors.white}/>
                            </TouchableOpacity>
                        ),
                        ...drawerOptions
                    }}
                />

                <Drawer.Screen 
                    name='SynchronizationPage' 
                    component={SynchronizationPage}
                    options={{
                        drawerLabel: 'Sincronizar',
                        title: 'Sincronizar',
                        header: () => null,
                        drawerIcon: () => <MaterialCommunityIcons name='sync' size={ isTablet ? 30 : 20 } />,
                        ...drawerOptions
                    }}
                    
                />

            </Drawer.Navigator>
        //   </GeneralContextProvider>

    );
}