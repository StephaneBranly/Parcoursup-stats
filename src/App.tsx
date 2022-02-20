import { useEffect, useState } from 'react'

import './App.scss'

import { Helmet } from 'react-helmet'

import { About, Header } from 'components'
import { loadFormations, loadFormationData } from 'utils'
import { CompareFormations, FindFormation, FormationInfos } from 'views'

function App() {
    const [currentView, setCurrentView] = useState<string>('findFormation')
    const [selectedFormation, setSelectedFormation] = useState<string | undefined>()
    const [comparedFormations, setComparedFormations] = useState<string[]>([])
    const [formationsData, setFormationsData] = useState<Record<string, any>[]>([])
    const [allFormationsData, setAllFormationsData] = useState<Record<string, any>[]>(
        []
    )
    const [formationsCache, setFormationCache] = useState<
        Record<string, Record<string, any>>
    >({})

    const loadFormation = async (formationID: string): Promise<void> => {
        if (!Object.keys(formationsCache).includes(formationID)) {
            const result = await loadFormationData(formationID)
            const newFormation: Record<string, any> = { }
            newFormation[formationID] = result
            setFormationCache({...newFormation, ...formationsCache})
        }
    }

    const handlerSetSelectedFormation = async (formationID: string) => {
        if (!Object.keys(formationsCache).includes(formationID))
            await loadFormation(formationID)
        setSelectedFormation(formationID)
    }

    const [currentQuery, setCurrentQuery] = useState<string>('')
    const [currentQueryState, setCurrentQueryState] = useState<number>(0)

    const incrementQueryState = () =>
        setCurrentQueryState(currentQueryState + 1)

    const loadDataFromQuery = async (query?: string) => {
        incrementQueryState()

        let result: Record<string, any>[] = []
        var queryState = -1
        if (!query && allFormationsData.length > 0) result = allFormationsData
        else {
            const [responseResult, responseQueryState] = await loadFormations(
                Number(currentQueryState),
                query
            )
            queryState = responseQueryState
            result = responseResult
            if (!query) setAllFormationsData(result)
        }
        setCurrentQuery(query ?? '')

        if (
            (!query && formationsData.length === 0) ||
            queryState === currentQueryState
        )
            setFormationsData(result)
    }

    useEffect(() => {
        loadDataFromQuery()
        const urlParams = new URLSearchParams(window.location.search);
        const q = urlParams.get('q');
        const f = urlParams.get('f');
        const c = urlParams.get('c');
        if(f) {
            handlerSetSelectedFormation(f)
            setCurrentView('seeFormationInfos')
        }
        else if(c) {
            const ids = c.split(',')
            loadComparedFormationsFromParam(ids)
        }
        else if(q) loadDataFromQuery(q)
        
    }, [])

    const loadComparedFormationsFromParam = async (ids: string[]) => {
        ids.forEach((id) => loadFormation(id))
        setComparedFormations(ids)
        setCurrentView('compareFormations')        
    }

    
    const toggleComparedFormation = async (formationID: string) => {
        if (!Object.keys(formationsCache).includes(formationID)) await loadFormation(formationID)
        if (comparedFormations.includes(formationID))
            setComparedFormations(comparedFormations.filter((s) => s !== formationID))
        else setComparedFormations(comparedFormations.concat(formationID))
    }

    const renderView = () => {
        switch (currentView) {
            case 'findFormation':
                return (
                    <FindFormation
                        formationsData={formationsData}
                        setSelectedFormation={handlerSetSelectedFormation}
                        loadFormations={loadDataFromQuery}
                        currentQuery={currentQuery}
                        setView={setCurrentView}
                    />
                )
            case 'seeFormationInfos':
                return (
                    <FormationInfos
                        currentFormation={
                            selectedFormation
                                ? formationsCache[selectedFormation]
                                : undefined
                        }
                        setView={setCurrentView}
                        comparedFormations={comparedFormations}
                        toggleComparedFormation={toggleComparedFormation}
                        formationID={selectedFormation ?? ''}
                    />
                )
            case 'compareFormations':
                return (
                    <CompareFormations
                        comparedFormations={comparedFormations}
                        toggleComparedFormation={toggleComparedFormation}
                        formationsData={formationsCache} loadFormation={loadFormation}                    />
                )
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
            <Header currentView={currentView} setView={setCurrentView} />
            <section className="pcs-main-section">{renderView()}</section>
            <About />
        </section>
    )
}

export default App
