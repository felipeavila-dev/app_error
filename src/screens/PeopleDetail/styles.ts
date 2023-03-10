import styled from "styled-components/native";

export const Container = styled.ScrollView`
    flex: 1;

    background-color: ${({ theme }) => theme.colors.background};
    
    width: 100%;
`;

export const Title = styled.Text`
    font-size: ${({ theme }) => theme.fontSize.large};
    font-family: ${({ theme }) => theme.fonts.bold};

    /* margin-left: 12px; */
    margin-bottom: 8px;

    color: ${({ theme }) => theme.colors.cg_blue};
`;

export const Label = styled.Text`
    font-size: ${({ theme }) => theme.fontSize.regular};
    font-family: ${({ theme }) => theme.fonts.bold};

    color: ${({ theme }) => theme.colors.text};

    margin-top: 6px;
`;


export const Text = styled.Text`
    font-size: ${({ theme }) => theme.fontSize.regular};
    font-family: ${({ theme }) => theme.fonts.regular};

    color: ${({ theme }) => theme.colors.text};

    margin-bottom: 6px;

`;

export const InformationArea = styled.View`
    width: 100%;

    border-left-width: 3px;
    border-left-color:  ${({ theme }) => theme.colors.blue};
    border-radius: 4px;

    padding-left: 8px;

    margin-bottom: 28px;
`;



