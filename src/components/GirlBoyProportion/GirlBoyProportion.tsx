
import { StatsCard } from 'components'
import { ResponsiveContainer, PieChart, Pie, Legend, LabelList } from 'recharts'

export interface GirlBoyProportionProps {
    count_candidat_boys: number,
    count_candidat_girls: number,
    count_accepted_boys: number,
    count_accepted_girls: number,
    title: string,
}

const GirlBoyProportion = (props: GirlBoyProportionProps) => {
    const dataCandidats = [
        { key: "Nombre de candidates", value: props.count_candidat_girls, fill: '#e63946'},
        { key: "Nombre de candidats", value: props.count_candidat_boys, fill: '#a8dadc'}
    ]

    const dataAccepted = [
        { key: "Nombre d'acceptées", value: props.count_accepted_girls, fill: '#6b6fdb'},
        { key: "Nombre d'acceptés", value: props.count_accepted_boys, fill: '#76d169'}
        ]

    const pourcentageCandidates = (props.count_candidat_girls / ( props.count_candidat_girls + props.count_candidat_boys) * 100).toFixed(0)
    const pourcentageAccepted = (props.count_accepted_girls / ( props.count_accepted_girls + props.count_accepted_boys) * 100).toFixed(0)
    const description = `Soit ${pourcentageCandidates}% de candidates et ${pourcentageAccepted}% ayant accepté définitivement la proposition`
    
    return (
        <StatsCard title={props.title} description={description}>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        data={dataCandidats}
                        startAngle={0} endAngle={180}
                        isAnimationActive={false}
                        dataKey="value" nameKey="key" cx="50%" cy="100%" innerRadius={80} outerRadius={120} >
                       <LabelList position="insideTop" fill="#000" stroke="none" dataKey="value" />
                    </Pie>

                    <Pie
                        data={dataAccepted} 
                        isAnimationActive={false}
                        startAngle={0} endAngle={180}
                        dataKey="value" nameKey="key" cx="50%" cy="100%" innerRadius={20} outerRadius={60} >
                       <LabelList position="inside" fill="#000" stroke="none" dataKey="value" />
                    </Pie>
                    <Legend iconSize={10} layout='horizontal' verticalAlign='bottom' align="center" />
                </PieChart>
            </ResponsiveContainer>
    </StatsCard>
    )
}

export default GirlBoyProportion
