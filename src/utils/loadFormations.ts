import axios from 'axios'
import { parcoursupAPI } from 'global'

export const loadFormations = async (
    query?: string
): Promise<Record<string, any>[]> => {
    try {
        const requestURL =
            parcoursupAPI +
            `&q=${
                query ?? ''
            }&rows=-1&fields=cod_aff_form,g_ea_lib_vx,g_olocalisation_des_formations`
        const result = await axios.get(requestURL)
        if (result.data)
            return result.data.records.map((r: { fields: any }) => r.fields)
        return []
    } catch (e) {
        console.error('error when loading Parcoursup data...')
        return []
    }
}
