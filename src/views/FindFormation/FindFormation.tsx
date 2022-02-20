import { FormationList, MapWrapper, SearchBar } from 'components'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import './FindFormation.scss'

export interface FindFormationProps {
    formationsData: Record<string, any>[]
    setSelectedFormation: (formationID: string) => Promise<void>
    loadFormations: (query?: string) => void
    currentQuery: string
    setView: (view: string) => void
}

const FindFormation = (props: FindFormationProps) => {
    const {
        formationsData,
        setSelectedFormation,
        loadFormations,
        currentQuery,
        setView,
    } = props

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
                    formationsData={formationsData}
                    dataAttribution={'Parcoursup 2021 - OpenStreetMap'}
                    setSelectedFormation={setSelectedFormation}
                    setCoordProximity={setCoordProximity}
                />
                <FormationList
                    formationsData={formationsData}
                    setSelectedFormation={setSelectedFormation}
                    setView={setView}
                    coordProximity={coordProximity}
                />
            </div>
        </div>
    )
}

export default FindFormation
