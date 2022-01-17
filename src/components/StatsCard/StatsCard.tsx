import './StatsCard.scss'
export interface StatsCardProps {
    children: JSX.Element,
    title: string,
    description?: string
}

const StatsCard = (props: StatsCardProps) => {
    const { children, title, description } = props

    return (
        <div className='pcs-statscard' >
            <h1 className='pcs-statscard-title'>{title}</h1>
            <div className='pcs-statscard-content'>
                {children}
                {description && <p className='pcs-statscard-description'>{description}</p>}
            </div>
        </div>
    )
}

export default StatsCard
