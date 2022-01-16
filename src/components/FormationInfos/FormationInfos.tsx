import { GirlBoyProportion } from 'components'
import { useEffect, useState } from 'react'
import { formationToEmoji, loadFormationData } from 'utils'
import './FormationInfos.scss'

const FormationInfos = () => {
    const [school, setSchool] = useState<Record<string, any>>({})

    const loadData = async () => {
        const result = await loadFormationData('55')
        console.log(result)
        setSchool(result)
    }

    useEffect(() => {
        loadData()
    }, [])

    const getField = (fieldName: string) => {
        if (school[fieldName]) return school[fieldName]
        return 'NaN'
    }
    return (
        <div className="pcs-formationinfos-fragment">
            <h1 className="pcs-formationinfos-title">
                Informations sur la formation
            </h1>
            <div className="pcs-formationinfos">
                <h1 className="pcs-schoolname">
                    {getField('fil_lib_voe_acc')}
                </h1>
                <p>
                    🏢 {getField('g_ea_lib_vx')} - {getField('contrat_etab')}
                    <br />
                    🗺 {getField('dep_lib')} ({getField('dep')}) -{' '}
                    {getField('region_etab_aff')}
                </p>
            </div>
            <div className="pcs-formationinfos-stats">
                <p>En 2020 :<br/>
                    {getField('voe_tot')} voeux enregistrés pour cette formation
                </p>
            </div>
            <GirlBoyProportion 
                count_candidat_boys={getField('voe_tot') - getField('voe_tot_f')} 
                count_candidat_girls={getField('voe_tot_f')} 
                count_accepted_boys={getField('acc_tot') - getField('acc_tot_f')} 
                count_accepted_girls={getField('acc_tot_f')} 
                title={'Proportion de candidates / candidats'} />
        </div>
    )
}

export default FormationInfos
