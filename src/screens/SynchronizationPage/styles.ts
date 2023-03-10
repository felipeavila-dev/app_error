import styled from "styled-components/native";
import { ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
    color?: string,
    disabled?: boolean
}

export const Container = styled.View`
    flex: 1;

    width: 100%;
    padding: 24px;

    background-color: ${({ theme }) => theme.colors.background};
`;

export const AreaTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${({ theme }) => theme.fontSize.regular};

    color: ${({ theme }) => theme.colors.text};

    margin-bottom: 8px;
`;

export const ItemsArea = styled.View`
    border: 2px solid ${({ theme }) => theme.colors.light_gray};
    border-radius: 4px;

    height: 30%;
    width: 100%;

    padding: 12px;
    margin-bottom: 24px;
`;

export const LogArea = styled.ScrollView`
    border-radius: 4px;

    height: 20%;
    width: 100%;

    padding-bottom: 24px;

`;

export const Log = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${({ theme }) => theme.fontSize.small};

    color: ${({ theme }) => theme.colors.dark_gray};

    margin-bottom: 8px;
`;

export const SyncIcon = styled(ActivityIndicator)`
    font-size: ${({ theme }) => theme.fontSize.small};

    color: ${({ theme }) => theme.colors.blue};

    margin-right: 12px;
`;

export const AlertArea = styled.View`
    flex-direction: row;

    justify-content: center;
    align-items: center;

    padding: 8px 12px;
    /* background-color: ${({ theme }) => theme.colors.yellow}; */

    margin: 40px 0;
    border-radius: 4px;
`;


export const AlertMessage = styled.Text`
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${({ theme }) => theme.fontSize.large};

    text-align: center;

    color: ${({ theme }) => theme.colors.text};
`;

export const Icon = styled(MaterialCommunityIcons).attrs<Props>({
    size: 40,
})`
    /* color: ${({ theme, }) => theme.colors.yellow}; */
    margin-right: 16px;
`;

export const SyncButton = styled.TouchableOpacity<Props>`
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: 100%;

    align-items: center;

    padding: 18px 0px;
    margin-bottom: 12px;

    border-radius: 4px;

    background-color: ${({ theme, color }) => color ? color : theme.colors.cg_blue};

    opacity: ${({ disabled }) => disabled ? .3 : 1};
`;

export const ButtonsArea = styled.View`
    width: 100%;

    margin-top: auto;
`;

export const ButtonText = styled.Text`
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${({ theme }) => theme.fontSize.large};

    text-align: center;

    color: ${({ theme }) => theme.colors.white};
    
`;



// export const Container = styled.View`
//     flex: 1;
//     align-items: center;
//     justify-content: center;

//     width: 100%;
//     padding: 24px;

//     background-color: ${({ theme }) => theme.colors.background};
// `;

// export const Logo = styled.Image`
//     width: 190px;
//     height: 150px;

//     margin-bottom: 40px;
// `;

// export const Icon = styled(MaterialCommunityIcons).attrs({
//     size: 60,
// })`
//     color: ${({ theme }) => theme.colors.yellow};
// `;

// export const Title = styled.Text`
//     font-family: ${({ theme }) => theme.fonts.bold};
//     font-size: ${({ theme }) => theme.fontSize.xlarge};

//     text-transform: uppercase;

//     color: ${({ theme }) => theme.colors.red};
// `;

// export const Subtitle = styled.Text`
//     font-family: ${({ theme }) => theme.fonts.regular};
//     font-size: ${({ theme }) => theme.fontSize.large};

//     text-align: center;

//     color: ${({ theme }) => theme.colors.black_secondary};

//     margin-bottom: 24px;
// `;

// export const AlertArea = styled.View`
//     padding: 8px 12px;
//     background-color: ${({ theme }) => theme.colors.yellow};

//     margin-bottom: 40px;
//     border-radius: 4px;
// `;


// export const AlertMessage = styled.Text`
//     font-family: ${({ theme }) => theme.fonts.bold};
//     font-size: ${({ theme }) => theme.fontSize.large};

//     text-align: center;

//     color: ${({ theme }) => theme.colors.white};
// `;
