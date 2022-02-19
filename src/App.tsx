import { useEffect, useState } from 'react'

import './App.scss'

import { Helmet } from 'react-helmet'

import { About, Header } from 'components'
import { loadFormations, loadFormationData } from 'utils'
import { FindFormation, FormationInfos } from 'views'

function App() {
    const [currentView, setCurrentView] = useState<string>('findFormation')
    const [selectedSchool, setSelectedSchool] = useState<
        string | undefined
    >()
    const [schoolsData, setSchoolsData] = useState<Record<string, any>[]>([])
    const [allSchoolsData, setAllSchoolsData] = useState<Record<string, any>[]>(
        []
    )
    const [schoolsCache, setSchoolCache] = useState<Record<string, Record<string, any>>>({})

    const loadSchool = async (schoolID: string): Promise<void> => {
        if (!Object.keys(schoolsCache).includes(schoolID))
        {
            const result = await loadFormationData(schoolID)
            const newCache: Record<string, Record<string, any>> = Object.assign({}, schoolsCache);
            newCache[schoolID] = result
            setSchoolCache(newCache)
        }
    }

    const handlerSetSelectedSchool = async (schoolID: string) => {
        if (!Object.keys(schoolsCache).includes(schoolID)) await loadSchool(schoolID)
        setSelectedSchool(schoolID)
    }

    const [currentQuery, setCurrentQuery] = useState<string>('')
    const [currentQueryState, setCurrentQueryState] = useState<number>(0)

    const incrementQueryState = () =>
        setCurrentQueryState(currentQueryState + 1)

    const loadDataFromQuery = async (query?: string) => {
        incrementQueryState()

        let result: Record<string, any>[] = []
        var queryState = -1
        if (!query && allSchoolsData.length > 0) result = allSchoolsData
        else {
            const [responseResult, responseQueryState] = await loadFormations(
                Number(currentQueryState),
                query
            )
            queryState = responseQueryState
            result = responseResult
            if (!query) setAllSchoolsData(result)
        }
        setCurrentQuery(query ?? '')

        if (
            (!query && schoolsData.length === 0) ||
            queryState === currentQueryState
        )
            setSchoolsData(result)
    }

    useEffect(() => {
        loadDataFromQuery()
    }, [])

    const renderView = () => {
        switch (currentView) {
            case 'findFormation':
                return (
                    <FindFormation
                        schoolsData={schoolsData}
                        setSelectedSchool={handlerSetSelectedSchool}
                        loadFormations={loadDataFromQuery}
                        currentQuery={currentQuery}
                        setView={setCurrentView}
                    />
                )
            case 'seeFormationInfos':
                return <FormationInfos currentSchool={selectedSchool ? schoolsCache[selectedSchool] : {}} />
            case 'compareFormations':
                return <div>Comparaison des formations</div>
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
            <Header
                currentView={currentView}
                setView={setCurrentView}
            />
            <section className="pcs-main-section">{renderView()}</section>
            <About />
        </section>
    )
}

export default App
