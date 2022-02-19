import { CompareGirlBoyProportion } from 'components'
import { Helmet } from 'react-helmet'
import { generateFormationName, getField } from 'utils'

import './CompareFormations.scss'

export interface CompareFormationsProps {
    comparedSchools: string[]
    toggleComparedSchool: (schoolID: string) => void
    schoolsData: Record<string, Record<string, any>>
}

const CompareFormations = (props: CompareFormationsProps) => {
    const { comparedSchools, toggleComparedSchool, schoolsData } = props

    const girlBoyProportionData = comparedSchools.map((schoolID) => {
        const s = schoolsData[schoolID]
        return {
            schoolID: schoolID,
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
            {comparedSchools.map((school) => (
                <div>{school}</div>
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
