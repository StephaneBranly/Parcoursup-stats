import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from "recharts"
import { GraphTemplate } from "."
import { theme } from "../../theme/theme"
import { DataType } from "../../type/DataType"

export interface NombreCandidatsProps {
    selectedData: DataType[]
    dataAttribution: string
}
export const NombreCandidats = (props: NombreCandidatsProps) => {
    const data = () => {
      const keys = ["Effectif total des candidats pour une formation"]
      return props.selectedData.map((a) => {return { "Effectif candidats": a["Effectif total des candidats pour une formation"] - a["Dont effectif des candidates pour une formation"], "Effectif candidates": a["Dont effectif des candidates pour une formation"], "Établissement": a["Établissement"]}})
    }
    return <GraphTemplate name="Effectif de candidats et candidates" attribution={props.dataAttribution}><ResponsiveContainer width="100%" height={300}><BarChart data={data()}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="Établissement" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="Effectif candidats" stackId={'a'} fill={theme.palette.secondary.main} />
    <Bar dataKey="Effectif candidates" stackId={'a'} fill={theme.palette.primary.main} />
  </BarChart></ResponsiveContainer></GraphTemplate>
}
