import { FormationItem } from 'components'
import { calculateDistance } from 'utils'
import './FormationList.scss'

export interface FormationListProps {
    formationsData: Record<string, any>[]
    setSelectedFormation: (formationID: string) => Promise<void>
    setView: (view: string) => void
    coordProximity: number[]
}

const FormationList = (props: FormationListProps) => {
    const { formationsData, setSelectedFormation, setView, coordProximity } =
        props

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
            return formationsData
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
                .map((formation, index) => (
                    <FormationItem
                        setSelectedFormation={setSelectedFormation}
                        setView={setView}
                        key={index}
                        formationData={formation}
                    />
                ))
        else
            return formationsData.map((formation, index) => (
                <FormationItem
                    setSelectedFormation={setSelectedFormation}
                    setView={setView}
                    key={index}
                    formationData={formation}
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
