import { MapWrapper, SearchBar } from 'components'
import { Helmet } from 'react-helmet'
import './FindFormation.scss'

export interface FindFormationProps {
    //
    schoolsData: Record<string, any>[]
    loadSchool: (schoolID: string) => void
    loadFormations: (query?: string) => void
    currentQuery: string
}

const FindFormation = (props: FindFormationProps) => {
    const { schoolsData, loadSchool, loadFormations, currentQuery } = props
    return (
        <div className="pcs-findformation-fragment">
            <Helmet>
                <title>Parcoursup - Statistiques - Rechercher</title>
            </Helmet>
            <h1 className="pcs-findformation-title">Carte des formations</h1>
            <div className="pcs-findformation-main">
                <SearchBar
                    loadFormations={loadFormations}
                    currentQuery={currentQuery}
                />
                <MapWrapper
                    schoolsData={schoolsData}
                    dataAttribution={'Parcoursup 2021 - OpenStreetMap'}
                    loadSchool={loadSchool}
                />
            </div>
        </div>
    )
}

export default FindFormation
