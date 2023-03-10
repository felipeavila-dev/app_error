import styled from "styled-components/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

type ErrorProps = {
    error: string,
}

// Verifica se o APP esta rodando em um tablet
import DeviceInfo from "react-native-device-info";
const isTablet = DeviceInfo.isTablet();

export const Container = styled.View``;

export const InputContainer = styled.View<ErrorProps>`
    flex-direction: row;
    align-items: center;
    
    border: 1px solid ${({ theme, error }) => error !== '' ? theme.colors.red : theme.colors.gray};
    border-radius: 5px;

    padding: 0 16px;
    margin-top: 16px;

    width: 100%;
`;

export const TextInput = styled.TextInput`
    width: 90%;

    padding: ${isTablet ? '22px 0' : '16px 0'};

    font-size: ${({ theme }) => theme.fontSize.regular};
    font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Icon = styled(MaterialCommunityIcons).attrs({
    size: isTablet ? 30 : 24
})`
    margin-right: 16px;
    color: ${({ theme }) => theme.colors.placeholder};
`;

export const ErrorMessage = styled.Text`
    color: ${({ theme }) => theme.colors.red};

    font-size: ${({ theme }) => theme.fontSize.small};
    font-family: ${({ theme }) => theme.fonts.regular};

    margin-top: 8px;
`;