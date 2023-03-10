import DatePicker, { DatePickerProps } from 'react-native-date-picker'
import { Container } from './styles';

type Props = DatePickerProps & {
    onChange: React.Dispatch<any>,
    openModal: React.Dispatch<boolean>,
};

export function DateInputModal({ onChange, openModal, ...rest}: Props) {
    return(
        <Container>

            <DatePicker 
                mode='date'
                modal
                locale='pt-BR'
                onConfirm={(date) => {
                    onChange(new Intl.DateTimeFormat('pt-BR').format(date))
                    openModal(false)
                }}
                onCancel={() => {
                    openModal(false)
                }}
                {...rest} 
            />
        </Container>
    );
}