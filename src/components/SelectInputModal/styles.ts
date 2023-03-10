import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;

    background-color: ${({ theme }) => theme.colors.background};

    width: 100%;

    padding-bottom: 40px;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 12%;

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