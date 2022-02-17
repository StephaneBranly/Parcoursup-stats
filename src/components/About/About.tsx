import { moduleNames } from 'global'
import { useState } from 'react'
import { openLink } from 'utils'
import './About.scss'

const About = () => {
    const [open, setOpen] = useState<boolean>(false)

    const renderModules = () => {
        return moduleNames.map((m) => (
            <li onClick={() => openLink(`https://www.npmjs.com/package/${m}`)}>
                {m}
            </li>
        ))
    }
    if (!open)
        return (
            <div className="pcs-about-closed">
                <div>Session 2021</div>
                <div className="pcs-about-button" onClick={() => setOpen(true)}>
                    A propos
                </div>
            </div>
        )
    return (
        <div className="pcs-about-open">
            <div className="pcs-about-close">
                <span onClick={() => setOpen(false)}>fermer</span>
            </div>
            <div className="pcs-about-made-by">
                Application développée par Stéphane BRANLY
            </div>
            <div className="pcs-about-tags">
                <div
                    className="pcs-about-repo"
                    onClick={() =>
                        openLink(
                            'https://github.com/StephaneBranly/parcoursup-stats'
                        )
                    }
                >
                    Dépot de code 💻
                </div>
                <div
                    className="pcs-about-sponsor"
                    onClick={() =>
                        openLink(
                            'https://www.paypal.com/paypalme/StephaneBranly'
                        )
                    }
                >
                    Sponsor 💜
                </div>
                <div
                    className="pcs-about-data"
                    onClick={() =>
                        openLink(
                            'https://data.enseignementsup-recherche.gouv.fr/pages/parcoursupdata/?disjunctive.fili'
                        )
                    }
                >
                    Données publiques 🗃
                </div>
            </div>
            <div className="pcs-about-packages">
                <div className="pcs-about-packages-label">
                    Modules utilisés 📦 :
                </div>
                <ul>{renderModules()}</ul>
            </div>
        </div>
    )
}

export default About
