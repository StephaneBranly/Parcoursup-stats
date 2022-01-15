import axios from 'axios'
import { parcoursupAPI } from 'global/parcoursupAPI'

export const loadFormationData = async (code_formation: string) => {
    try {
        const requestURL =
            parcoursupAPI + `&q=cod_aff_form%3D"${code_formation}"`
        const result = await axios.get(requestURL)
        if (result.data && result.data.nhits === 1) {
            return result.data.records[0].fields
        }
        return {}
    } catch (e) {
        return {}
    }
}
