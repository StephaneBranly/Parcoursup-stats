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
    LabelList,
} from 'recharts'

export interface CompareGirlBoyProportionProps {
    data: Record<string, any>[]
    title: string
}

const CompareGirlBoyProportion = (props: CompareGirlBoyProportionProps) => {
    const { data } = props

    const createLabel = (value: number, pourcentage: number | string) => {
        return `${pourcentage}% (${value})`
    }

    const computedData = data.map((entry) => {
        const nbCandidates =
            entry['count_candidates_boys'] + entry['count_candidates_girls']
        const count_candidates_boys_pct = (
            (entry['count_candidates_boys'] / nbCandidates) *
            100
        ).toFixed(0)
        const count_candidates_girls_pct = (
            (entry['count_candidates_girls'] / nbCandidates) *
            100
        ).toFixed(0)
        const nbAccepted =
            entry['count_accepted_boys'] + entry['count_accepted_girls']
        const count_accepted_boys_pct = (
            (entry['count_accepted_boys'] / nbAccepted) *
            100
        ).toFixed(0)
        const count_accepted_girls_pct = (
            (entry['count_accepted_girls'] / nbAccepted) *
            100
        ).toFixed(0)

        return {
            count_candidates_boys_pct,
            count_candidates_girls_pct,
            count_accepted_boys_pct,
            count_accepted_girls_pct,
            label_candidates_boys: createLabel(
                entry['count_candidates_boys'],
                count_candidates_boys_pct
            ),
            label_candidates_girls: createLabel(
                entry['count_candidates_girls'],
                count_candidates_girls_pct
            ),
            label_accepted_boys: createLabel(
                entry['count_accepted_boys'],
                count_accepted_boys_pct
            ),
            label_accepted_girls: createLabel(
                entry['count_accepted_girls'],
                count_accepted_girls_pct
            ),
            ...entry,
        }
    })

    return (
        <StatsCard title={props.title}>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={computedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="formationName" />
                    <YAxis />
                    <Tooltip />
                    <Legend
                        iconSize={10}
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="center"
                    />

                    <Bar
                        isAnimationActive={false}
                        dataKey="count_candidates_boys_pct"
                        stackId="a"
                        fill="#a8dadc"
                        name="% de candidats"
                    >
                        <LabelList
                            position="middle"
                            fill="#000"
                            stroke="none"
                            dataKey="label_candidates_boys"
                        />
                    </Bar>
                    <Bar
                        isAnimationActive={false}
                        dataKey="count_candidates_girls_pct"
                        stackId="a"
                        fill="#e63946"
                        name="% de candidates"
                    >
                        <LabelList
                            position="middle"
                            fill="#000"
                            stroke="none"
                            dataKey="label_candidates_girls"
                        />
                    </Bar>
                    <Bar
                        isAnimationActive={false}
                        dataKey="count_accepted_boys_pct"
                        stackId="b"
                        fill="#76d169"
                        name="% d'acceptés"
                    >
                        <LabelList
                            position="middle"
                            fill="#000"
                            stroke="none"
                            dataKey="label_accepted_boys"
                        />
                    </Bar>
                    <Bar
                        isAnimationActive={false}
                        dataKey="count_accepted_girls_pct"
                        stackId="b"
                        fill="#6b6fdb"
                        name="% d'acceptées"
                    >
                        <LabelList
                            position="middle"
                            fill="#000"
                            stroke="none"
                            dataKey="label_accepted_girls"
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </StatsCard>
    )
}

export default CompareGirlBoyProportion
