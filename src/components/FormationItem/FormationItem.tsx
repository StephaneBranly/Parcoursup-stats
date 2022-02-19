import { getField } from 'utils'
import './FormationItem.scss'

export interface FormationItemProps {
    schoolData: Record<string, any>
    loadSchool: (schoolID: string) => Promise<void>
    setView: (view: string) => void
}

const FormationItem = (props: FormationItemProps) => {
    const { schoolData, loadSchool, setView } = props

    const handleClick = async () => {
        await loadSchool(schoolData['cod_aff_form'])
        setView('seeFormationInfos')
    }

    return (
        <li className="pcs-formationItem" onClick={handleClick}>
            <b>{getField(schoolData, 'fil_lib_voe_acc')}</b> -{' '}
            {getField(schoolData, 'g_ea_lib_vx')}{' '}
            {getField(schoolData, 'detail_forma') !== 'NaN' ? (
                <em>- {getField(schoolData, 'detail_forma')}</em>
            ) : (
                ''
            )}
        </li>
    )
}

export default FormationItem
