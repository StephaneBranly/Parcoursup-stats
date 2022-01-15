import { useEffect, useState } from 'react'
import { formationToEmoji, loadFormationData } from 'utils'
import './FormationInfos.scss'

const FormationInfos = () => {
    const [school, setSchool] = useState<Record<string, any>>({})

    const loadData = async () => {
        const result = await loadFormationData('23324')
        setSchool(result)
    }

    useEffect(() => {
        loadData()
    }, [])

    const getField = (fieldName: string) => {
        if (school[fieldName]) return school[fieldName]
        return 'NaN'
    }
    return (
        <div className="pcs-formationinfos-fragment">
            <div className="pcs-formation-title">
                {getField('fil_lib_voe_acc')}
            </div>
            <div className="pcs-formationinfos">
                <h1 className="pcs-schoolname">{getField('g_ea_lib_vx')}</h1>
                <h2>{`Formation ${formationToEmoji('ingenieur')}`}</h2>
            </div>
        </div>
    )
}

export default FormationInfos
