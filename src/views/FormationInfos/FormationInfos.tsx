import {
    BaccalaureatMention,
    DistributionCandidates,
    FillingSpeed,
    FunnelCandidates,
    GirlBoyProportion,
} from 'components'
import { Helmet } from 'react-helmet'
import { getField } from 'utils'
import './FormationInfos.scss'

export interface FormationInfosProps {
    currentSchool: Record<string, any> | undefined
}

const FormationInfos = (props: FormationInfosProps) => {
    const { currentSchool } = props
    const s = currentSchool

    const renderRankLastCalled = () => {
        if (!s) return
        return [1, 2, 3, 4, 5]
            .map((grpNumber: number) => {
                const rank = getField(s, `ran_grp${grpNumber}`)
                const groupLabel = getField(s, `lib_grp${grpNumber}`)
                return [grpNumber, Number(rank), groupLabel]
            })
            .filter(
                ([index, rank, group]) =>
                    rank !== 'NaN' &&
                    rank !== 0 &&
                    group !== 'NaN' &&
                    group !== ''
            )
            .map(([index, rank, group]) => (
                <li key={index}>
                    {group} : <b>{rank}ème</b>
                </li>
            ))
    }

    const renderSameAcademy = () => {
        if (!s) return
        if (getField(s, 'pct_aca_orig_idf') === 'NaN') return
        return (
            <li>
                📚 <b>{Number(getField(s, 'pct_aca_orig_idf')).toFixed(0)}%</b>{' '}
                d'admis.e.s néobachelier.e.s issu.e.s de la même académie
                (Paris/Crétail/Versailles réunies)
            </li>
        )
    }
    const renderSameSchool = () => {
        if (!s) return
        if (getField(s, 'pct_etab_orig') === 'NaN') return
        return (
            <li>
                🏢 <b>{Number(getField(s, 'pct_etab_orig')).toFixed(0)}%</b>{' '}
                d'admis.e.s néobachelier.e.s issu.e.s du même établissement
            </li>
        )
    }
    const renderBoursier = () => {
        if (!s) return
        if (getField(s, 'pct_bours') === 'NaN') return
        return (
            <li>
                💶 <b>{Number(getField(s, 'pct_bours')).toFixed(0)}%</b>{' '}
                d'admis.e.s néobachelier.e.s boursier.e.s
            </li>
        )
    }

    if (!s)
        return (
            <div className="pcs-formationinfos-fragment">
                <h1 className="pcs-formationinfos-title">
                    Informations générales
                </h1>
                <div className="pcs-formationinfos-main">
                    <h1 className="pcs-schoolname">
                        Selectionnez une formation
                    </h1>
                </div>
            </div>
        )
    return (
        <div className="pcs-formationinfos-fragment">
            <Helmet>
                <title>
                    Parcoursup - Statistiques - {getField(s, 'g_ea_lib_vx')}
                </title>
            </Helmet>
            <h1 className="pcs-formationinfos-title">Informations générales</h1>
            <div className="pcs-formationinfos-main">
                <h1 className="pcs-schoolname">
                    {getField(s, 'fil_lib_voe_acc')}
                </h1>
                <div>
                    <ul className="pcs-stats-ul">
                        <li>🗂 {getField(s, 'select_form')}</li>
                        <li>
                            🏢 {getField(s, 'g_ea_lib_vx')} -{' '}
                            <i>{getField(s, 'contrat_etab')}</i>
                        </li>
                        <li>
                            🗺 {getField(s, 'dep_lib')} ({getField(s, 'dep')}) -{' '}
                            {getField(s, 'region_etab_aff')}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="pcs-formationinfos-stats">
                <div>
                    <b>En 2021 :</b>
                    <ul className="pcs-stats-ul">
                        <li>
                            🎓 <b>{getField(s, 'capa_fin')}</b> places
                            disponibles
                        </li>
                        <li>
                            📄 <b>{getField(s, 'voe_tot')}</b> voeux enregistrés
                        </li>
                        {renderRankLastCalled() &&
                            renderRankLastCalled()!.length > 0 && (
                                <li>
                                    <b>
                                        🗂 Rangs des derniers appelés par groupe
                                        :
                                    </b>
                                </li>
                            )}
                        {renderRankLastCalled()}
                        {renderSameAcademy()}
                        {renderSameSchool()}
                        {renderBoursier()}
                    </ul>
                </div>
            </div>

            <div className="pcs-formationinfo-statscard-wrapper">
                <GirlBoyProportion
                    count_candidat_boys={
                        getField(s, 'voe_tot') - getField(s, 'voe_tot_f')
                    }
                    count_candidat_girls={getField(s, 'voe_tot_f')}
                    count_accepted_boys={
                        getField(s, 'acc_tot') - getField(s, 'acc_tot_f')
                    }
                    count_accepted_girls={getField(s, 'acc_tot_f')}
                    title={'Proportion de candidates / candidats'}
                />
                <FunnelCandidates
                    count_candidates={getField(s, 'nb_voe_pp')}
                    count_classed={getField(s, 'nb_cla_pp')}
                    count_proposition_received={getField(s, 'prop_tot')}
                    count_proposition_accepted={getField(s, 'acc_tot')}
                    title={'Sélectivité de la formation'}
                />
                <BaccalaureatMention
                    count_tbf={getField(s, 'acc_tbf')}
                    count_tb={getField(s, 'acc_tb')}
                    count_b={getField(s, 'acc_b')}
                    count_ab={getField(s, 'acc_ab')}
                    count_sm={getField(s, 'acc_sansmention')}
                    count_nr={getField(s, 'acc_mention_nonrenseignee')}
                    title={'Mention au bac des néobachelier.e.s'}
                />
                <DistributionCandidates
                    count_bg={getField(s, 'acc_bg')}
                    count_bp={getField(s, 'acc_bp')}
                    count_bt={getField(s, 'acc_bt')}
                    count_oc={getField(s, 'acc_at')}
                    title={'Provenance des futur.e.s étudiant.e.s'}
                />
                <FillingSpeed
                    count_start_pp={getField(s, 'pct_acc_debutpp')}
                    count_bac={getField(s, 'pct_acc_datebac')}
                    count_end_pp={getField(s, 'pct_acc_finpp')}
                    title={'Vitesse de remplissage'}
                />
            </div>
        </div>
    )
}

export default FormationInfos
