import { StatsCard } from 'components'
import { ResponsiveContainer, Pie, PieChart, Legend, LabelList } from 'recharts'

export interface DistributionCandidatesProps {
    count_bg: number
    count_bt: number
    count_bp: number
    count_oc: number
    title: string
}

const DistributionCandidates = (props: DistributionCandidatesProps) => {
    const { title, count_bg, count_bt, count_bp, count_oc } = props

    const createLabel = (val: number): string => {
        if (!val) return ''
        return `${val}` // (${((val / total) * 100).toFixed(0)}%)`
    }

    const data = [
        {
            name: 'Néobachelier.e.s généraux',
            value: count_bg,
            fill: '#e63946',
            label: createLabel(count_bg),
        },
        {
            name: 'Néobachelier.e.s technologiques',
            value: count_bt,
            fill: '#a8dadc',
            label: createLabel(count_bt),
        },
        {
            name: 'Néobachelier.e.s profressionnel.le.s',
            value: count_bp,
            fill: '#457b9d',
            label: createLabel(count_bp),
        },
        {
            name: 'Autres candidat.e.s',
            value: count_oc,
            fill: '#0e2950',
            label: createLabel(count_oc),
        },
    ]

    return (
        <StatsCard title={title}>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        isAnimationActive={false}
                        innerRadius={40}
                        outerRadius={80}
                        dataKey="value"
                        labelLine={false}
                    >
                        <LabelList
                            position="outside"
                            fontSize={20}
                            offset={6}
                            fill="#000"
                            stroke="#000"
                            strokeWidth={1}
                            dataKey="label"
                        />
                    </Pie>
                    <Legend
                        iconSize={10}
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="center"
                    />
                </PieChart>
            </ResponsiveContainer>
        </StatsCard>
    )
}

export default DistributionCandidates
