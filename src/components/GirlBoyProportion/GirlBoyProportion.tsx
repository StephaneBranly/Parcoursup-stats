
import { ResponsiveContainer, PieChart, Pie, Legend, Cell } from 'recharts'

export interface GirlBoyProportionProps {
    count_candidat_boys: number,
    count_candidat_girls: number,
    count_accepted_boys: number,
    count_accepted_girls: number,
    title: string,
}

const GirlBoyProportion = (props: GirlBoyProportionProps) => {
    const dataCandidats = [
        { key: "Nombre de candidates", value: props.count_candidat_girls, color: '#e29578'},
        { key: "Nombre de candidats", value: props.count_candidat_boys, color: '#006d77'}
    ]

    const dataAccepted = [
        { key: "Nombre d'acceptées", value: props.count_accepted_girls, color: '#e27890'},
        { key: "Nombre d'acceptés", value: props.count_accepted_boys, color: '#b7f0c6'}
        ]

    const pourcentageCandidates = (props.count_candidat_girls / ( props.count_candidat_girls + props.count_candidat_boys) * 100).toFixed(0)
    const pourcentageAccepted = (props.count_accepted_girls / ( props.count_accepted_girls + props.count_accepted_boys) * 100).toFixed(0)
    return (
        <div>
            <h1>{props.title}</h1>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        data={dataCandidats} 
                        label
                        startAngle={0} endAngle={180}
                        dataKey="value" nameKey="key" cx="50%" cy="100%" innerRadius={80} outerRadius={120} fill="#8884d8" >
                        {dataCandidats.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>

                    <Pie
                        data={dataAccepted} 
                        label
                        startAngle={0} endAngle={180}
                        dataKey="value" nameKey="key" cx="50%" cy="100%" innerRadius={20} outerRadius={60} fill="#8884d8" >
                        {dataAccepted.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Legend iconSize={10} layout='horizontal' verticalAlign='bottom' align="center" />
                </PieChart>
            </ResponsiveContainer>
            <p>Soit {pourcentageCandidates}% de candidates et {pourcentageAccepted}% de filles ayant accepté le voeu </p>
        </div>
    )
}

export default GirlBoyProportion
