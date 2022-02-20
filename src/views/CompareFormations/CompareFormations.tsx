import { CompareGirlBoyProportion } from 'components'
import { Helmet } from 'react-helmet'
import { generateFormationName, getField, loadFormations } from 'utils'

import './CompareFormations.scss'

export interface CompareFormationsProps {
    comparedFormations: string[]
    toggleComparedFormation: (formationID: string) => void
    formationsData: Record<string, Record<string, any>>
    loadFormation: (id: string) => Promise<void>
}

const CompareFormations = (props: CompareFormationsProps) => {
    const {
        comparedFormations,
        toggleComparedFormation,
        formationsData,
        loadFormation,
    } = props
    const girlBoyProportionData = comparedFormations.map((formationID) => {
        const s = formationsData[formationID]
        if (!s) {
            loadFormation(formationID)
            return []
        }
        return {
            formationID: formationID,
            formationName: generateFormationName(s),
            count_candidates_boys:
                getField(s, 'voe_tot') - getField(s, 'voe_tot_f'),
            count_candidates_girls: getField(s, 'voe_tot_f'),
            count_accepted_boys:
                getField(s, 'acc_tot') - getField(s, 'acc_tot_f'),

            count_accepted_girls: getField(s, 'acc_tot_f'),
        }
    })

    return (
        <div className="pcs-compareFormations-fragment">
            <Helmet>
                <title>Parcoursup - Statistiques - Comparer</title>
            </Helmet>
            {comparedFormations.map((formation) => (
                <div>{formation}</div>
            ))}
            <h1 className="pcs-compareFormations-title">
                Comparaisons des formations
            </h1>
            <div className="pcs-compareFormations-main">
                Ici le contenu de comparaison
            </div>
            <div className="pcs-formationinfo-statscard-wrapper">
                <CompareGirlBoyProportion
                    data={girlBoyProportionData}
                    title={'Proportion de candidates / candidats'}
                />
            </div>
        </div>
    )
}

export default CompareFormations
