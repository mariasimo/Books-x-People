import React from 'react'
import './styles.scss'

const SocialSharing = () => {
    return (
        <div className="social-sharing">
            <p>Compartir:</p>
            <ul className="social-icons horizontal-list">
                <li><a href="/"><img alt="social-sharing" src={`/whatsapp-icon.svg`}/></a></li>
                <li><a href="/"><img alt="social-sharing" src={`/twitter-icon.svg`}/></a></li>
                <li><a href="/"><img alt="social-sharing" src={`/linkedin-icon.svg`}/></a></li>
                <li><a href="/"><img alt="social-sharing" src={`/instagram-icon.svg`}/></a></li>
                <li><a href="/"><img alt="social-sharing" src={`/mail-icon.svg`}/></a></li>
            </ul>
        </div>
    )
}

export default SocialSharing
