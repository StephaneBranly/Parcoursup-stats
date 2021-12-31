import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from "recharts"
import { GraphTemplate } from "."
import { theme } from "../../theme/theme"
import { DataType } from "../../type/DataType"

export interface CapaciteFormationProps {
    selectedData: DataType[]
    dataAttribution: string
}
export const CapaciteFormation = (props: CapaciteFormationProps) => {
    return <GraphTemplate name="Representation des filles" attribution={props.dataAttribution}><ResponsiveContainer width="100%" height={300}><BarChart data={props.selectedData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="Établissement" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="Capacité de l’établissement par formation" fill={theme.palette.secondary.main} />
  </BarChart></ResponsiveContainer></GraphTemplate>
}
