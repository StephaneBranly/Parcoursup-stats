import { FormationList, MapWrapper, SearchBar } from 'components'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import './FindFormation.scss'

export interface FindFormationProps {
    schoolsData: Record<string, any>[]
    loadSchool: (schoolID: string) => Promise<void>
    loadFormations: (query?: string) => void
    currentQuery: string
    setView: (view: string) => void
}

const FindFormation = (props: FindFormationProps) => {
    const { schoolsData, loadSchool, loadFormations, currentQuery, setView } =
        props

    const [coordProximity, setCoordProximity] = useState<number[]>([])
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
                    setCoordProximity={setCoordProximity}
                />
                <FormationList
                    schoolsData={schoolsData}
                    loadSchool={loadSchool}
                    setView={setView}
                    coordProximity={coordProximity}
                />
            </div>
        </div>
    )
}

export default FindFormation
