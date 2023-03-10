import { TouchableOpacityProps } from "react-native";
import { PeopleProps } from "../../types/PeopleProps";
import { Container, InformationArea, PeopleDescription, PeopleDocument, PeopleLocation, PeopleName } from "./styles";

type Props = TouchableOpacityProps & {
    peopleData: PeopleProps
}

export function PeopleCard({ peopleData, ...rest }: Props) {
    return(
        <Container {...rest}>
            <InformationArea>
                <PeopleName>{peopleData.razao}</PeopleName>
                <PeopleDescription>{peopleData.fantasia}</PeopleDescription>
                <PeopleDocument>{peopleData.cnpj_cpf}</PeopleDocument>
                <PeopleLocation>{peopleData.nome_cidade} - {peopleData.cod_estado}</PeopleLocation>
            </InformationArea>
        </Container>
    );
}