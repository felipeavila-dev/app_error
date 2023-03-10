import styled from "styled-components/native";

// Verifica se o APP esta rodando em um tablet
import DeviceInfo from "react-native-device-info";
const isTablet = DeviceInfo.isTablet();


export const Container = styled.TouchableOpacity`
    flex-direction: row;

    width: 100%;

    background-color: ${({ theme }) => theme.colors.background};

    border: 1px solid ${({ theme }) => theme.colors.blue};
    border-radius: 4px;

    margin-bottom: ${ isTablet ? '20px' : '12px'};
`;

export const InformationArea = styled.View`
    padding: ${ isTablet ? '8px 16px' : '2px 8px'};
    border-left-width: 8px;
    border-left-color: ${({ theme }) => theme.colors.blue}; ;
    
    width: 100%;
    height: 100%;
`;

export const PeopleName = styled.Text`
    font-size: ${({ theme }) => theme.fontSize.regular};
    font-family: ${({ theme }) => theme.fonts.bold};

    color: ${({ theme }) => theme.colors.text};
    /* background-color: ${({ theme }) => theme.colors.blue}; */

    padding: 2px 8px;
`;

export const PeopleDescription = styled.Text`
    font-size: ${({ theme }) => theme.fontSize.small};
    font-family: ${({ theme }) => theme.fonts.regular};

    color: ${({ theme }) => theme.colors.text};

    padding: 2px 8px;

`;

export const PeopleDocument = styled.Text`
    font-size: ${({ theme }) => theme.fontSize.small};
    font-family: ${({ theme }) => theme.fonts.regular};

    color: ${({ theme }) => theme.colors.text};

    padding: 2px 8px;
`;

export const PeopleLocation = styled.Text`
    font-size: ${({ theme }) => theme.fontSize.small};
    font-family: ${({ theme }) => theme.fonts.regular};

    color: ${({ theme }) => theme.colors.text};

    padding: 2px 8px;
`;