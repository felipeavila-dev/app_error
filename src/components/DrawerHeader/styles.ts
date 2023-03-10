import styled from "styled-components/native";

// Verifica se o APP esta sendo utilizado em um tablet
import DeviceInfo from "react-native-device-info";
const isTablet = DeviceInfo.isTablet();

export const Container = styled.View`
    align-items: center;

    margin-top: 10%;
    margin-bottom: 24px;

    width: 100%;
`;

export const Avatar = styled.Image`
    width: ${isTablet ? '150px' : '100px'};
    height: ${isTablet ? '150px' : '100px'};

    border-radius: ${isTablet ? '75px' : '50px'};
`;

export const UserName = styled.Text`
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${({ theme }) => theme.fontSize.regular};

    margin-top: 24px;
`;