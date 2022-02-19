import axios from 'axios'
import { parcoursupAPI } from 'global'

export const loadFormations = async (
    state: number,
    query?: string
): Promise<[Record<string, any>[], number]> => {
    try {
        const requestURL =
            parcoursupAPI +
            `&q=${
                query ?? ''
            }&rows=10&fields=cod_aff_form,g_ea_lib_vx,g_olocalisation_des_formations,fil_lib_voe_acc,detail_forma`
        const result = await axios.get(requestURL)
        if (result.data)
            return [
                result.data.records.map((r: { fields: any }) => r.fields),
                state,
            ]
        return [[], state]
    } catch (e) {
        console.error('error when loading Parcoursup data...')
        return [[], state]
    }
}
