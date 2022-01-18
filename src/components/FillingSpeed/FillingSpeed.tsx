import { StatsCard } from 'components'
import {
    ResponsiveContainer,
    CartesianGrid,
    XAxis,
    YAxis,
    AreaChart,
    Area,
} from 'recharts'

export interface FillingSpeedProps {
    count_start_pp: number
    count_bac: number
    count_end_pp: number
    title: string
}

const FillingSpeed = (props: FillingSpeedProps) => {
    const { title, count_bac, count_end_pp, count_start_pp } = props

    const data = [
        {
            name: 'Ouverture de Parcoursup (15 mai)',
            value: count_start_pp,
        },
        {
            name: 'Avant le baccalautéat (18 juin)',
            value: count_bac,
        },
        {
            name: 'Fin de procédure Phase Principale (19 juillet)',
            value: count_end_pp,
        },
    ]

    console.log(data)

    return (
        <StatsCard title={title}>
            <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={data}>
                    <XAxis dataKey="name" angle={90} />
                    <YAxis />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <Area
                        type="linear"
                        label
                        dataKey="value"
                        stroke="#1d3557"
                        fill="#1d3557"
                        isAnimationActive={false}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </StatsCard>
    )
}

export default FillingSpeed
