import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts"
import { theme } from "../../App"
import { DataType } from "../../type/DataType"

export interface NombreCandidatsProps {
    selectedRows: DataType[]
}
export const NombreCandidats = (props: NombreCandidatsProps) => {
    const data = () => {
      const keys = ["Effectif total des candidats pour une formation"]
      return props.selectedRows.map((a) => {return { "effectif-h": a["Effectif total des candidats pour une formation"] - a["Dont effectif des candidates pour une formation"], "effectif-f": a["Dont effectif des candidates pour une formation"], "Établissement": a["Établissement"]}})
    }
    return <BarChart width={730} height={250} data={data()}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="Établissement" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="effectif-h" stackId={'a'} fill={theme.palette.secondary.main} />
    <Bar dataKey="effectif-f" stackId={'a'} fill={theme.palette.primary.main} />
  </BarChart>
}
