import styled from "styled-components/native";


export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
    flex: 1;
    justify-content: center;
    align-items: center;

    width: 100%;

    padding: 24px;
  
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Container = styled.ScrollView.attrs({
    justifyContent: 'center',
})`

    width: 100%;

    padding-bottom: 24px;
`;

export const Image = styled.Image`
    width: 190px;
    height: 150px;

    margin: 0 auto;
    margin-bottom: 32px;

    object-fit: fill;
`;

export const Form = styled.View`
    flex: 1;

    width: 100%;

    padding-bottom: 40px;
`;

export const InputsArea = styled.View`
    margin-bottom: 40px;
`;

export const CreateAccountButton = styled.TouchableOpacity`
    width: 100%;

    align-items: center;

    margin-top: 16px;

`;

export const Text = styled.Text`
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${({ theme }) => theme.fontSize.regular};
    color: ${({ theme }) => theme.colors.text};
`;
