import styled from "styled-components/native";

export const Container = styled.View`
    
    width: 100%;
    
    background-color: ${({ theme }) => theme.colors.red};
    opacity: .8;

`;

export const Text = styled.Text`
    text-align: center;

    font-size: ${({ theme }) => theme.fontSize.xsmall};
    font-family: ${({ theme }) => theme.fonts.regular};

    color: ${({ theme }) => theme.colors.white};
`;