import './Header.scss'

import { MdSearch, MdBarChart } from 'react-icons/md'
import { FaSchool } from 'react-icons/fa'

export interface HeaderProps {
    currentView: string
    setView: (newView: string) => void
}

const Header = (props: HeaderProps) => {
    const { currentView, setView } = props

    const views = [
        {
            label: 'Formation',
            value: 'seeFormationInfos',
            icon: <FaSchool className="pcs-header-view-button-icon-content" />,
        },
        {
            label: 'Rechercher',
            value: 'findFormation',
            icon: <MdSearch className="pcs-header-view-button-icon-content" />,
        },
        {
            label: 'Comparer',
            value: 'compareFormations',
            icon: (
                <MdBarChart className="pcs-header-view-button-icon-content" />
            ),
        },
    ]

    const renderViewButtons = () => {
        return views.map((view, index) => (
            <div
                key={index}
                onClick={() => setView(view.value)}
                className={`pcs-header-view-button ${
                    currentView === view.value ? 'active' : ''
                }`}
            >
                <div className="pcs-header-view-button-icon">{view.icon}</div>
                <div className="pcs-header-view-button-name">{view.label}</div>
            </div>
        ))
    }
    return (
        <div className="pcs-header">
            <div className="pcs-header-head">
                <h1 className="pcs-header-title">
                    📊 Statistiques sur Parcoursup
                </h1>
            </div>
            <div className="pcs-header-menu">{renderViewButtons()}</div>
        </div>
    )
}

export default Header
