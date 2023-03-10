import styled from "styled-components/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;

    width: 100%;

`;

export const Icon = styled(MaterialCommunityIcons).attrs({
    size: 40
})`
    color: ${({ theme }) => theme.colors.yellow};

`;

export const Text = styled.Text`
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${({ theme }) => theme.fontSize.regular};

    color: ${({ theme }) => theme.colors.text};

`;
