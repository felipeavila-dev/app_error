import styled from "styled-components/native";

// Verifica se o APP esta rodando em um tablet
import DeviceInfo from "react-native-device-info";
const isTablet = DeviceInfo.isTablet();

// Types
type PropleTypeProps = {
    active: boolean
}

export const Container = styled.View`
    flex: 1;

    background-color: ${({ theme }) => theme.colors.background};
    
    width: 100%;

    padding-bottom: 24px;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;


    width: 100%;
    height: 10%;

    background-color: ${({ theme }) => theme.colors.blue};
`;

export const BackIcon = styled.TouchableOpacity`
    margin-top: auto;
    margin-bottom: 12px;

    padding-left: 24px;
`;


export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${({ theme }) => theme.fontSize.large};
    color: ${({ theme }) => theme.colors.white};

    margin-top: auto;
    margin-bottom: 12px;
    margin-left: auto;
    margin-right: auto;
`;

export const FormTitle = styled.Text`
    font-size: ${({ theme }) => theme.fontSize.regular};
    font-family: ${({ theme }) => theme.fonts.medium};
    
    color: ${({ theme }) => theme.colors.text};
    
    margin-bottom: ${isTablet ? '16px' : '8px'};
`;

export const Form = styled.View`
    border: 1px solid ${({ theme }) => theme.colors.gray};
    border-radius: 4px;

    padding: ${isTablet ? '16px' : '8px'};
    margin-bottom: 24px;
`;

export const PeopleTypeArea = styled.View`
    flex-direction: row;
    justify-content: space-between;

    width: 100%;
`;

export const PeopleTypeButton = styled.TouchableOpacity<PropleTypeProps>`
    align-items: center;
    justify-content: center;

    width: 47%;

    border: 1px solid ${({ theme, active }) => active ? theme.colors.green : theme.colors.gray};
    border-radius: 4px;

    background-color: ${({ theme, active }) => active ? theme.colors.light_green : theme.colors.background};

    padding: 16px;
`;

export const PeopleTypeText = styled.Text`
    font-size: ${({ theme }) => theme.fontSize.regular};
    font-family: ${({ theme }) => theme.fonts.medium};

    color: ${({ theme }) => theme.colors.text};
`;