import styled from 'styled-components/native';


export const Container = styled.View`
    flex: 1;

    padding: 24px;
    padding-bottom: 40px;

    
    background-color: ${({ theme }) => theme.colors.background};
`;


export const FormTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${({ theme }) => theme.fontSize.large};
    color: ${({ theme }) => theme.colors.text};

    margin-bottom: 24px;
`;