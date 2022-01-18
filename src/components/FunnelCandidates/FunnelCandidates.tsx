import { StatsCard } from 'components'
import { ResponsiveContainer, Funnel, FunnelChart, LabelList } from 'recharts'

export interface FunnelCandidatesProps {
    count_candidates: number
    count_classed: number
    count_proposition_received: number
    count_proposition_accepted: number
    title: string
}

const FunnelCandidates = (props: FunnelCandidatesProps) => {
    const {
        title,
        count_classed,
        count_proposition_accepted,
        count_proposition_received,
        count_candidates,
    } = props
    const createLabel = (val: number, description: string): string => {
        return `${val} ${description} (${(
            (val / count_candidates) *
            100
        ).toFixed(0)}%)`
    }

    const data = [
        {
            name: 'Nombre de candidats',
            value: count_candidates,
            fill: '#e63946',
            label: createLabel(count_candidates, 'candidat.e.s'),
        },
        {
            name: 'Nombre de candidats classés',
            value: count_classed,
            fill: '#a8dadc',
            label: createLabel(count_classed, 'classé.e.s'),
        },
        {
            name: 'Nombre de candidats ayant recu une proposition',
            value: count_proposition_received,
            fill: '#457b9d',
            label: createLabel(count_proposition_received, 'admis.e.s'),
        },
        {
            name: 'Nombre de candidats ayant accepté la proposition',
            value: count_proposition_accepted,
            fill: '#1d3557',
            label: createLabel(count_proposition_accepted, 'ont accepté'),
        },
    ]

    return (
        <StatsCard title={title}>
            <ResponsiveContainer width="100%" height={250}>
                <FunnelChart>
                    <Funnel
                        dataKey="value"
                        data={data}
                        isAnimationActive={false}
                    >
                        <LabelList
                            position="insideTopLeft"
                            offset={10}
                            fill="#000"
                            stroke="none"
                            dataKey="label"
                        />
                    </Funnel>
                </FunnelChart>
            </ResponsiveContainer>
        </StatsCard>
    )
}

export default FunnelCandidates
