import { StatsCard } from 'components'
import {
    ResponsiveContainer,
    CartesianGrid,
    XAxis,
    YAxis,
    AreaChart,
    Area,
    LabelList,
} from 'recharts'

export interface FillingSpeedProps {
    count_start_pp: number
    count_bac: number
    count_end_pp: number
    title: string
}

const FillingSpeed = (props: FillingSpeedProps) => {
    const { title, count_bac, count_end_pp, count_start_pp } = props

    const renderLabel = (value: number): string => `${value}%`
    const data = [
        {
            name: '27 mai',
            value: count_start_pp,
            label: renderLabel(count_start_pp),
        },
        {
            name: '17 juin',
            value: count_bac,
            label: renderLabel(count_bac),
        },
        {
            name: '16 juillet',
            value: count_end_pp,
            label: renderLabel(count_end_pp),
        },
    ]

    const legend = (
        <ul style={{ textAlign: 'left' }}>
            <li>27 mai : ouverture de Parcoursup</li>
            <li>17 juin : avant le baccalauréat</li>
            <li>16 juillet : Fin de procédure Phase Principale</li>
        </ul>
    )

    return (
        <StatsCard title={title} description={legend}>
            <ResponsiveContainer width="100%" height={250}>
                <AreaChart
                    data={data}
                    margin={{ top: 20, left: 0, right: 40, bottom: 0 }}
                >
                    <XAxis
                        dataKey="name"
                        angle={-30}
                        type="category"
                        interval={0}
                    />
                    <YAxis />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <Area
                        type="linear"
                        dataKey="value"
                        stroke="#1d3557"
                        fill="#1d3557"
                        isAnimationActive={false}
                    >
                        <LabelList
                            position="insideTop"
                            fill="#000"
                            stroke="#000"
                            strokeWidth={1}
                            dataKey="label"
                        />
                    </Area>
                </AreaChart>
            </ResponsiveContainer>
        </StatsCard>
    )
}

export default FillingSpeed
