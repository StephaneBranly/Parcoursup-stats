import { FormationItem } from 'components'
import { calculateDistance } from 'utils'
import './FormationList.scss'

export interface FormationListProps {
    schoolsData: Record<string, any>[]
    loadSchool: (schoolID: string) => Promise<void>
    setView: (view: string) => void
    coordProximity: number[]
}

const FormationList = (props: FormationListProps) => {
    const { schoolsData, loadSchool, setView, coordProximity } = props

    const hasKey = (entry: Record<string, any>, key: string): boolean => {
        return Object.keys(entry).includes(key)
    }

    const checkEntryAsCoord = (entry: Record<string, any>): boolean => {
        return (
            hasKey(entry, 'g_olocalisation_des_formations') &&
            Array.isArray(entry['g_olocalisation_des_formations'])
        )
    }

    const renderListItems = () => {
        if (coordProximity.length === 2)
            return schoolsData
                .sort((a, b) =>
                    checkEntryAsCoord(a) &&
                    checkEntryAsCoord(b) &&
                    calculateDistance(
                        Array.from(
                            a['g_olocalisation_des_formations']
                        ).reverse() as number[],
                        coordProximity
                    ) <
                        calculateDistance(
                            Array.from(
                                b['g_olocalisation_des_formations']
                            ).reverse() as number[],
                            coordProximity
                        )
                        ? -1
                        : 1
                )
                .map((school, index) => (
                    <FormationItem
                        loadSchool={loadSchool}
                        setView={setView}
                        key={index}
                        schoolData={school}
                    />
                ))
        else
            return schoolsData.map((school, index) => (
                <FormationItem
                    loadSchool={loadSchool}
                    setView={setView}
                    key={index}
                    schoolData={school}
                />
            ))
    }

    return (
        <div className="pcs-formationList-fragment">
            <ul className="pcs-formationList-list">{renderListItems()}</ul>
        </div>
    )
}

export default FormationList
