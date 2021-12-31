import { Tooltip, ResponsiveContainer, Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts"
import { colors } from "../../theme/colors"
import { DataType } from "../../type/DataType"
import { GraphTemplate } from ".";
export interface MentionBacProps {
    selectedData: DataType[]
    dataAttribution: string
}

export const MentionBac = (props: MentionBacProps) => {
    const mentions = [{ key: "% d’admis néo bacheliers sans information sur la mention au bac", mention: "Sans information sur la mention", color: "#333"},
      { key: "% d’admis néo bacheliers sans mention au bac", mention: "Sans mention", color: "#FF1700"},
      { key: "% d’admis néo bacheliers avec mention Assez Bien au bac", mention: "Assez bien", color: "#FF8E00"},
      { key: "% d’admis néo bacheliers avec mention Bien au bac", mention: "Bien", color: "#FFE400"},
      { key: "% d’admis néo bacheliers avec mention Très Bien au bac", mention: "Très bien", color: "#06FF00"}]

    const data = () => {
        const finalData: Record<string, number | string>[] = []
        mentions.forEach((mention) => { 
            const object: Record<string, number | string> = {}; 
            object['Mention'] = mention.mention
            props.selectedData.forEach((entry: any) => object[entry.Établissement] = Math.floor(entry[mention.key]))
            finalData.push(object)
        })
        return finalData
    }

    return <GraphTemplate name="Répartition des mentions au baccalauréat" attribution={props.dataAttribution}><ResponsiveContainer width="100%" height={300}><BarChart data={data()}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="Mention" />
    <YAxis />
    <Tooltip />
    <Legend />
    {
        props.selectedData.map((entry, index) => <Bar dataKey={entry.Établissement} fill={colors[index]} />)
    }
    
  </BarChart></ResponsiveContainer></GraphTemplate>
}


