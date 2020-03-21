import React from 'react'
import './styles.scss'

const SocialSharing = () => {
    return (
        <div className="social-sharing">
            <p>Compartir:</p>
            <ul className="social-icons horizontal-list">
                <li><a href="#"><img src={`/whatsapp-icon.svg`}/></a></li>
                <li><a href="#"><img src={`/twitter-icon.svg`}/></a></li>
                <li><a href="#"><img src={`/linkedin-icon.svg`}/></a></li>
                <li><a href="#"><img src={`/instagram-icon.svg`}/></a></li>
                <li><a href="#"><img src={`/mail-icon.svg`}/></a></li>
            </ul>
        </div>
    )
}

export default SocialSharing
