import React from 'react'
import './styles.scss'

const SocialSharing = () => {
    return (
        <div className="social-sharing">
            <p>Compartir:</p>
            <ul className="social-icons horizontal-list">
                <li><a href="/"><img alt="social-sharing" src={`${process.env.REACT_APP_URL}/whatsapp-icon.svg`}/></a></li>
                <li><a href="/"><img alt="social-sharing" src={`${process.env.REACT_APP_URL}/twitter-icon.svg`}/></a></li>
                <li><a href="/"><img alt="social-sharing" src={`${process.env.REACT_APP_URL}/linkedin-icon.svg`}/></a></li>
                <li><a href="/"><img alt="social-sharing" src={`${process.env.REACT_APP_URL}/instagram-icon.svg`}/></a></li>
                <li><a href="/"><img alt="social-sharing" src={`${process.env.REACT_APP_URL}/mail-icon.svg`}/></a></li>
            </ul>
        </div>
    )
}

export default SocialSharing
