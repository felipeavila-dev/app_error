import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold} from '@expo-google-fonts/roboto';
import DeviceInfo from "react-native-device-info";

const isTablet = DeviceInfo.isTablet();

export default {
    fonts: {
        regular: 'Roboto_400Regular',
        medium: 'Roboto_500Medium',
        bold: 'Roboto_700Bold'
    },

    fontSize: {
        xsmall: isTablet ? '18px' : '12px',
        small: isTablet ? '20px' : '14px',
        regular: isTablet ? '22px' : '16px',
        large: isTablet ? '24px' : '18px',
        xlarge: isTablet ? '28px': '22px',
    },

    colors: {
        blue: '#003459',
        dark_blue: '#1e4b94',
        light_blue: '#B9DEFF',
        cg_blue: '#007EA7',
        
        light_green: '#BBE4AB',
        green: '#7FBB68',
        dark_green: '#335201',
        
        white: '#FFFFFF',
        black: '#312e38',
        black_secondary: '#232129',
        
        gray: '#C8C8C8',
        light_gray: '#cccccc',
        gray_secondary: '#666360',
        dark_gray: '#5A5465',

        text: '#232129',
        
        red: '#c53030',
        yellow: '#bda00f',
        background: '#F7F7F7',
        orange: '#ff9000',
        purple: '#7159c1',
        placeholder: '#666360',
        transparent: 'transparent'

    }
}