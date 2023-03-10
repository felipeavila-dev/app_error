import styled from "styled-components/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Verifica se o APP esta rodando em um tablet
import DeviceInfo from "react-native-device-info";
const isTablet = DeviceInfo.isTablet();

export const Container = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    
    border: .5px solid ${({ theme }) => theme.colors.gray};
    border-radius: 5px;

    padding: ${isTablet ? '22px 16px' : '16px 16px'};
    margin-top: 16px;

    width: 100%;
`;

export const TextArea = styled.View`
    flex-direction: row;
    align-items: center;
`;



export const Icon = styled(MaterialCommunityIcons).attrs({
    size: isTablet ? 30 : 24

})`
    color: ${({ theme }) => theme.colors.placeholder};
    margin-right: 12px;
`;

export const Text = styled.Text`
    flex-direction: row;
    align-items: center;
    justify-content: center;


    color: ${({ theme }) => theme.colors.placeholder};

    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${({ theme }) => theme.fontSize.regular};
`