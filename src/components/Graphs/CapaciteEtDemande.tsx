import { Tooltip, ResponsiveContainer, Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts"
import { GraphTemplate } from "."
import { colors } from "../../theme/colors"
import { DataType } from "../../type/DataType"
export interface CapaciteEtDemandeProps {
    selectedData: DataType[]
    dataAttribution: string
}

export const CapaciteEtDemande = (props: CapaciteEtDemandeProps) => {
    const keys = [{ key: "Capacité de l’établissement par formation", category: "Effectif pour la formation"},
        { key: "Effectif total des candidats pour une formation", category: "Nombre de candidat.e.s"},
        ]
    const data = () => {
        const finalData: Record<string, number | string>[] = []
        keys.forEach((key) => { 
            const object: Record<string, number | string> = {}; 
            object['category'] = key.category
            props.selectedData.forEach((entry: any) => object[entry.Établissement] = entry[key.key])
            finalData.push(object)
        })
        return finalData
    }

    return <GraphTemplate name="Effectif de la formation et nombre de candidat.e.s" attribution={props.dataAttribution}><ResponsiveContainer width="100%" height={300}><BarChart data={data()}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="category" />
    <YAxis />
    <Tooltip />
    <Legend />
    {
        props.selectedData.map((entry, index) => <Bar dataKey={entry.Établissement} fill={colors[index]} />)
    }
    
  </BarChart></ResponsiveContainer></GraphTemplate>
}


