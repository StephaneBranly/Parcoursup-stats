import { Grid } from "@material-ui/core"
import { PieChart, Pie, Tooltip, Cell } from "recharts"
import { theme } from "../../App"
import { DataType } from "../../type/DataType"

export interface MentionBacProps {
    selectedRows: DataType[]
}
export const MentionBac = (props: MentionBacProps) => {
    const data = (etablissement: Record<string, unknown>) => {
      const keys = [{ key: "% d’admis néo bacheliers sans information sur la mention au bac", mention: "Sans information sur la mention", color: "#777"},
      { key: "% d’admis néo bacheliers sans mention au bac", mention: "Sans mention", color: "#D50"},
      { key: "% d’admis néo bacheliers avec mention Assez Bien au bac", mention: "Assez bien", color: "#DD2"},
      { key: "% d’admis néo bacheliers avec mention Bien au bac", mention: "Bien", color: "#BD2"},
      { key: "% d’admis néo bacheliers avec mention Très Bien au bac", mention: "Très bien", color: "#2F2"}]
      return keys.filter((key) => Math.round(Number(etablissement[key.key]))).map((key) => { return  { color: key.color, name: key.mention, value: Math.round(Number(etablissement[key.key]))}})
    }
    return  <Grid container direction="row">
        {props.selectedRows.map((entry) => { const entryData = data(entry as unknown as Record<string, unknown>); return <Grid item><PieChart width={400} height={400}>
        <Pie paddingAngle={1} data={entryData} label dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={80} fill={theme.palette.primary.main}>
            {entryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
        </Pie>
        <Tooltip />
    </PieChart></Grid>})}
    </Grid>
}


