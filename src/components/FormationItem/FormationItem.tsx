import { getField } from 'utils'
import './FormationItem.scss'

export interface FormationItemProps {
    formationData: Record<string, any>
    setSelectedFormation: (formationID: string) => Promise<void>
    setView: (view: string) => void
}

const FormationItem = (props: FormationItemProps) => {
    const { formationData, setSelectedFormation, setView } = props

    const handleClick = async () => {
        await setSelectedFormation(formationData['cod_aff_form'])
        setView('seeFormationInfos')
    }

    return (
        <li className="pcs-formationItem" onClick={handleClick}>
            <b>{getField(formationData, 'fil_lib_voe_acc')}</b> -{' '}
            {getField(formationData, 'g_ea_lib_vx')}{' '}
            {getField(formationData, 'detail_forma') !== 'NaN' ? (
                <em>- {getField(formationData, 'detail_forma')}</em>
            ) : (
                ''
            )}
        </li>
    )
}

export default FormationItem
