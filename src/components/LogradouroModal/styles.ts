import styled from "styled-components/native";

// Verifica se o APP esta rodando em um tablet
import DeviceInfo from "react-native-device-info";
const isTablet = DeviceInfo.isTablet();

type LogradouroProps = {
    isActive: boolean
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

    background-color: ${({ theme }) => theme.colors.dark_blue};
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

export const BackIcon = styled.TouchableOpacity`
    margin-top: auto;
    margin-bottom: 12px;

    padding-left: 24px;
`;

export const LogradouroContainer = styled.View`
    width: 100%;


    padding: 24px;

    flex: 1;
`;

export const LogradouroCard = styled.TouchableOpacity<LogradouroProps>`
    flex-direction: row;
    align-items: center;

    width: 100%;

    padding: 24px 24px;
    margin-bottom: 12px;

    background: ${({ theme, isActive }) => isActive ? theme.colors.light_blue : theme.colors.background};

    border-width: 1px;
    border-radius: 4px;
    border-color: ${({ theme, isActive }) => isActive ? theme.colors.blue : theme.colors.dark_gray};

`;

export const LogradouroName = styled.Text<LogradouroProps>`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${({ theme }) => theme.fontSize.regular};

    color: ${({ theme, isActive }) => isActive ? theme.colors.blue : theme.colors.black_secondary};
`;