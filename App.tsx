import 'react-native-gesture-handler';

import React from 'react';
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import defaultTheme from './src/global/styles/defaultTheme';
import { AuthContextProvider } from './src/contexts/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if(!fontsLoaded) {
    return;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      
      <NavigationContainer>
        <AuthContextProvider>
          {/* <GeneralContextProvider> */}

              <Routes />
              
          {/* </GeneralContextProvider> */}
        </AuthContextProvider>
      </NavigationContainer>

      <StatusBar 
        barStyle='light-content'
        translucent={true}
        backgroundColor='transparent'
      />
    </ThemeProvider>
  );
}
