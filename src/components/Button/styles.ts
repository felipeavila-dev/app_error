import styled from "styled-components/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Verifica se o APP esta rodando em um tablet
import DeviceInfo from "react-native-device-info";
const isTablet = DeviceInfo.isTablet();


type Props = {
    color?: string
}

export const Container = styled.TouchableOpacity<Props>`
    flex-direction: row;
    justify-content: center;
    align-items: center;

    background-color: ${({ theme, color }) => color ? color : theme.colors.cg_blue};
    color: ${({ theme }) => theme.colors.white};

    padding: ${isTablet ? '18px 0' : '12px 0'};

    border-radius: 4px;
`;

export const ButtonText = styled.Text`
    font-size: ${({ theme }) => theme.fontSize.regular};
    font-family: ${({ theme }) => theme.fonts.bold};
    color: ${({ theme }) => theme.colors.white};
`;

export const Icon = styled(MaterialCommunityIcons).attrs({
    size: isTablet ? 28 : 22
})`
    margin-right: 12px;
    color: ${({ theme }) => theme.colors.white};


`;