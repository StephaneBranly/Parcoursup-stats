import { FunnelCandidates, GirlBoyProportion } from 'components'
import { useEffect, useState } from 'react'
import { loadFormationData } from 'utils'
import './FormationInfos.scss'

const FormationInfos = () => {
    const [school, setSchool] = useState<Record<string, any>>({})

    const loadData = async () => {
        const result = await loadFormationData('55')
        // console.log(result)
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
            <div className="pcs-formationinfos-main">
                <h1 className="pcs-schoolname">
                    {getField('fil_lib_voe_acc')}
                </h1>
                <p>
                    <ul className='pcs-stats-ul'>
                    <li>🏢 {getField('g_ea_lib_vx')} - <i>{getField('contrat_etab')}</i></li>
                    <li>🗺 {getField('dep_lib')} ({getField('dep')}) -{' '}
                    {getField('region_etab_aff')}</li>
                    </ul>
                </p>
            </div>
            <div className="pcs-formationinfos-stats">
                <p><b>En 2020 :</b>
                    <ul className='pcs-stats-ul'>
                        <li>🎓 <b>{getField('capa_fin')}</b> places disponibles</li>
                        <li>📄 <b>{getField('voe_tot')}</b> voeux enregistrés</li>
                    </ul>
                </p>
            </div>

            <div className='pcs-formationinfo-statscard-wrapper'>
                <GirlBoyProportion 
                    count_candidat_boys={getField('voe_tot') - getField('voe_tot_f')} 
                    count_candidat_girls={getField('voe_tot_f')} 
                    count_accepted_boys={getField('acc_tot') - getField('acc_tot_f')} 
                    count_accepted_girls={getField('acc_tot_f')} 
                    title={'Proportion de candidates / candidats'} />
                <FunnelCandidates 
                    count_candidates={getField('nb_voe_pp')}
                    count_classed={getField('nb_cla_pp')}
                    count_proposition_received={getField('prop_tot')}
                    count_proposition_accepted={getField('acc_tot')} 
                    title={'Sélectivité de la formation'} />
            </div>
        </div>
    )
}

export default FormationInfos
