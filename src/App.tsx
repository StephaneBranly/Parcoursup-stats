import { useEffect, useState } from 'react'

import './App.css'

import { Helmet } from 'react-helmet'

import { FormationInfos, Header, MapWrapper } from './components'
import { parcoursupAPI } from './global/parcoursupAPI'
import axios from 'axios'

function App() {
    // reloa
    const [selectedSchool, setSelectedSchool] = useState<string | undefined>()
    const [schoolsData, setSchoolsData] = useState<Record<string, any>[]>([])

    const loadData = async () => {
        try {
            const requestURL =
                parcoursupAPI +
                '&q=&rows=10&fields=cod_aff_form,g_ea_lib_vx,g_olocalisation_des_formations'
            const result = await axios.get(requestURL)
            if (result.data) {
                setSchoolsData(
                    result.data.records.map((r: { fields: any }) => r.fields)
                )
            }
        } catch (e) {
            console.error('error')
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <section>
            <Helmet>
                <title>Parcoursup - Statistiques</title>
                <meta
                    name="description"
                    content="Visualiseur des données publiques de Parcoursup"
                />
            </Helmet>
            <Header />
            <section className="pcs-main-section">
                <MapWrapper schoolsData={schoolsData} dataAttribution={''} />
                <FormationInfos />
            </section>
        </section>
    )
}

export default App
