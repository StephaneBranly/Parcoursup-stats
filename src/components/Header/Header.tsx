import logoParcoursup from '../../assets/logoParcoursup.svg'

import './Header.scss'

const Header = () => {
    return (
        <div className="pcs-header">
            {/* <img
                className="pcs-header-logo"
                src={logoParcoursup}
                alt="Logo Parcoursup"
            /> */}
            <h1 className="pcs-header-title">
                📊 Statistiques sur la plateforme
            </h1>
        </div>
    )
}

export default Header
