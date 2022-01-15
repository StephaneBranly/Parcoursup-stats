import logoParcoursup from '../../assets/logoParcoursup.svg'

import './Header.scss'

const Header = () => {
    return (
        <div className="pcs-header">
            <img src={logoParcoursup} alt="Logo Parcoursup" />
            <h1 className="pcs-main-title">
                📊 Statistiques sur la plateforme
            </h1>
            <div>🚧Work in Progress...🚧</div>
        </div>
    )
}

export default Header
