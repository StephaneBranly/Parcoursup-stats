import { useEffect, useState } from 'react'

import './App.scss'

import { Helmet } from 'react-helmet'

import { About, Header, MapWrapper } from 'components'
import { parcoursupAPI } from 'global/parcoursupAPI'
import axios from 'axios'
import { loadFormationData } from 'utils'
import { FormationInfos } from 'views'

function App() {
    const [currentView, setCurrentView] = useState<string>('findFormation')
    const [selectedSchool, setSelectedSchool] = useState<
        Record<string, any> | undefined
    >()
    const [schoolsData, setSchoolsData] = useState<Record<string, any>[]>([])

    const loadSchool = async (schoolID: string) => {
        const result = await loadFormationData(schoolID)
        console.log(result)
        setSelectedSchool(result)
    }

    const loadData = async () => {
        try {
            let finished = false
            let dataLength = 0
            while (!finished) {
                const requestURL =
                    parcoursupAPI +
                    `&q=&rows=100&start=${dataLength}&fields=cod_aff_form,g_ea_lib_vx,g_olocalisation_des_formations`
                const result = await axios.get(requestURL)
                if (result.data) {
                    dataLength += result.data.records.length
                    setSchoolsData(
                        schoolsData.concat(
                            result.data.records.map(
                                (r: { fields: any }) => r.fields
                            )
                        )
                    )
                }

                finished = true
            }
        } catch (e) {
            console.error('error')
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    const renderView = () => {
        switch (currentView) {
            case 'findFormation':
                return (
                    <MapWrapper
                        schoolsData={schoolsData}
                        dataAttribution={''}
                        loadSchool={loadSchool}
                    />
                )
            case 'seeFormationInfos':
                return <FormationInfos currentSchool={selectedSchool} />
            default:
                return (
                    <p>Seems like something is broken :( Reload the page</p>
                )
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
