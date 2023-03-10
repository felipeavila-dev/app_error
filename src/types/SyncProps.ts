import { CityProps } from "./CityProps"
import { LogradouroProps } from "./LogradouroProps"
import { PeopleProps } from "./PeopleProps"

export type SyncProps = {
    status: boolean,
    data: {
        dh_atual: string,
        info_repres: {
            cod_pessoa : string
            nome : string
            saldo_flex : number
        },
        cidade: CityProps[],
        pessoa: PeopleProps[],
        logradouro: LogradouroProps[]
    }
}