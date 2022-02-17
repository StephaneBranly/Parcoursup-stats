import { useEffect, useState } from 'react'

import './App.scss'

import { Helmet } from 'react-helmet'

import { About, Header } from 'components'
import { loadFormations, loadFormationData } from 'utils'
import { FindFormation, FormationInfos } from 'views'

function App() {
    const [currentView, setCurrentView] = useState<string>('findFormation')
    const [selectedSchool, setSelectedSchool] = useState<
        Record<string, any> | undefined
    >()
    const [schoolsData, setSchoolsData] = useState<Record<string, any>[]>([])
    const [allSchoolsData, setAllSchoolsData] = useState<Record<string, any>[]>(
        []
    )
    const [disabledViews, setDisabledViews] = useState<string[]>(['seeFormationInfos'])
    
    const loadSchool = async (schoolID: string) => {
        const result = await loadFormationData(schoolID)
        console.log(result)
        setSelectedSchool(result)
        if (result) 
            setDisabledViews(disabledViews.filter((a) => a !== 'seeFormationInfos'))
        else 
            setDisabledViews(disabledViews.concat('seeFormationInfos'))
    }

    const [currentQuery, setCurrentQuery] = useState<string>('')
    const [currentQueryState, setCurrentQueryState] = useState<number>(0)

    const incrementQueryState = () => setCurrentQueryState(currentQueryState + 1)

    const loadData = async (query?: string) => {
        incrementQueryState()

        let result: Record<string, any>[] = []
        var queryState = -1
        if (!query && allSchoolsData.length > 0) result = allSchoolsData
        else {
            const [responseResult, responseQueryState] = await loadFormations(Number(currentQueryState), query)
            queryState = responseQueryState
            result = responseResult
            if (!query) setAllSchoolsData(result)
        }
        setCurrentQuery(query ?? '')

        if ((!query && schoolsData.length === 0) || queryState === currentQueryState)
            setSchoolsData(result)
    }

    useEffect(() => {
        loadData()
    }, [])

    const renderView = () => {
        switch (currentView) {
            case 'findFormation':
                return (
                    <FindFormation
                        schoolsData={schoolsData}
                        loadSchool={loadSchool}
                        loadFormations={loadData}
                        currentQuery={currentQuery}
                        setView={setCurrentView}
                    />
                )
            case 'seeFormationInfos':
                return <FormationInfos currentSchool={selectedSchool} />
            default:
                return <p>Seems like something is broken :( Reload the page</p>
        }
    }

    return (
        <section>
            <Helmet>
                <title>Parcoursup - Statistiques</title>
                <meta
                    name="description"
                    content="Visualiseur des données publiques de Parcoursup"
                />
            </Helmet>
            <Header currentView={currentView} setView={setCurrentView} disabledViews={disabledViews}/>
            <section className="pcs-main-section">{renderView()}</section>
            <About />
        </section>
    )
}

export default App
