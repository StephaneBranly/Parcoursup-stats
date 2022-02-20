import { getField } from 'utils'

export const generateFormationName = (
    formation: Record<string, any>
): string => {
    return `${getField(formation, 'fil_lib_voe_acc')} - 
    ${getField(formation, 'g_ea_lib_vx')} 
    ${
        getField(formation, 'detail_forma') !== 'NaN'
            ? `- ${getField(formation, 'detail_forma')}`
            : ''
    }`
}
