import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Types
export type ScreenProps = {
    Login: undefined,
    SignIn: undefined
}

// Screens
import { Login } from '../screens/Login';
import { SignUp } from '../screens/SignUp';

export function AuthRoutes() {
    const Stack = createNativeStackNavigator<ScreenProps>();

    return(
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name='Login' component={Login}/>
            <Stack.Screen name='SignIn' component={SignUp}/>
        </Stack.Navigator>
    );
}