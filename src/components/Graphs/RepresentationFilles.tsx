import { Tooltip, ResponsiveContainer, Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts"
import { GraphTemplate } from "."
import { colors } from "../../theme/colors"
import { DataType } from "../../type/DataType"
export interface RepresentationFillesProps {
    selectedData: DataType[]
    dataAttribution: string
}

export const RepresentationFilles = (props: RepresentationFillesProps) => {
    const effectifCandidatsKey = "Effectif total des candidats pour une formation"
    const effectifCandidatesKey = "Dont effectif des candidates pour une formation"
    const admisesKey = "% d’admis dont filles"

    const data = () => {
        const finalData: Record<string, number | string>[] = []
        const candidates: Record<string, number | string> = {}
        candidates["category"] = "% de candidates"

        const admises: Record<string, number | string> = {}
        admises['category'] = "% d'admises"

        props.selectedData.forEach((entry: any) => 
        {
            candidates[entry.Établissement] = Math.floor(entry[effectifCandidatesKey] / entry[effectifCandidatsKey] * 100)
            admises[entry.Établissement] = Math.floor(entry[admisesKey])
        })
        finalData.push(candidates)
        finalData.push(admises)
        return finalData
    }

    return <GraphTemplate name="Représentation des filles (%)" attribution={props.dataAttribution}><ResponsiveContainer width="100%" height={300}><BarChart data={data()}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="category" />
    <YAxis domain={[0, 100]} />
    <Tooltip />
    <Legend />
    {
        props.selectedData.map((entry, index) => <Bar dataKey={entry.Établissement} fill={colors[index]} />)
    }
    
  </BarChart></ResponsiveContainer></GraphTemplate>
}


