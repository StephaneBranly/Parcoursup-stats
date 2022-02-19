import { StatsCard } from 'components'
import {
    ResponsiveContainer,
    Legend,
    Bar,
    BarChart,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

export interface CompareGirlBoyProportionProps {
    data: Record<string, any>[]
    title: string
}

const CompareGirlBoyProportion = (props: CompareGirlBoyProportionProps) => {
    const { data } = props
    return (
        <StatsCard title={props.title}>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="formationName" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                        dataKey="count_candidates_boys"
                        stackId="a"
                        fill="#8884d8"
                    />
                    <Bar
                        dataKey="count_candidates_girls"
                        stackId="a"
                        fill="#82ca9d"
                    />
                    <Bar
                        dataKey="count_accepted_boys"
                        stackId="b"
                        fill="#a88408"
                    />
                    <Bar
                        dataKey="count_accepted_girls"
                        stackId="b"
                        fill="#a2cadd"
                    />
                </BarChart>
            </ResponsiveContainer>
        </StatsCard>
    )
}

export default CompareGirlBoyProportion
