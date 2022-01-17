import { BaccalaureatMention, FunnelCandidates, GirlBoyProportion } from 'components'
import { getField } from 'utils'
import './FormationInfos.scss'

export interface FormationInfosProps {
    currentSchool: Record<string, any> | undefined
}

const FormationInfos = (props: FormationInfosProps) => {
    const { currentSchool } = props
    const s = currentSchool
    
    if (!s)
        return (<div className="pcs-formationinfos-fragment">
        <h1 className="pcs-formationinfos-title">
            Informations générales
        </h1>
        <div className="pcs-formationinfos-main">
            <h1 className="pcs-schoolname">
                Selectionnez une formation
            </h1>
        </div>
        </div>)
    return (
        <div className="pcs-formationinfos-fragment">
            <h1 className="pcs-formationinfos-title">
                Informations générales
            </h1>
            <div className="pcs-formationinfos-main">
                <h1 className="pcs-schoolname">
                    {getField(s,'fil_lib_voe_acc')}
                </h1>
                <p>
                    <ul className='pcs-stats-ul'>
                    <li>🏢 {getField(s,'g_ea_lib_vx')} - <i>{getField(s,'contrat_etab')}</i></li>
                    <li>🗺 {getField(s,'dep_lib')} ({getField(s,'dep')}) -{' '}
                    {getField(s,'region_etab_aff')}</li>
                    </ul>
                </p>
            </div>
            <div className="pcs-formationinfos-stats">
                <p><b>En 2020 :</b>
                    <ul className='pcs-stats-ul'>
                        <li>🎓 <b>{getField(s,'capa_fin')}</b> places disponibles</li>
                        <li>📄 <b>{getField(s,'voe_tot')}</b> voeux enregistrés</li>
                    </ul>
                </p>
            </div>

            <div className='pcs-formationinfo-statscard-wrapper'>
                <GirlBoyProportion 
                    count_candidat_boys={getField(s,'voe_tot') - getField(s,'voe_tot_f')} 
                    count_candidat_girls={getField(s,'voe_tot_f')} 
                    count_accepted_boys={getField(s,'acc_tot') - getField(s,'acc_tot_f')} 
                    count_accepted_girls={getField(s,'acc_tot_f')} 
                    title={'Proportion de candidates / candidats'} />
                <FunnelCandidates 
                    count_candidates={getField(s,'nb_voe_pp')}
                    count_classed={getField(s,'nb_cla_pp')}
                    count_proposition_received={getField(s,'prop_tot')}
                    count_proposition_accepted={getField(s,'acc_tot')} 
                    title={'Sélectivité de la formation'} />
                <BaccalaureatMention
                    count_tb={getField(s,'acc_tb')}
                    count_b={getField(s,'acc_b')}
                    count_ab={getField(s,'acc_ab')}
                    count_sm={getField(s,'acc_sansmention')}
                    count_nr={getField(s,'acc_mention_nonrenseignee')} 
                    title={'Mentions des néo-bachelier.e.s'} />
            </div>
        </div>
    )
}

export default FormationInfos
