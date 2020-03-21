import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

const ThankYou = () => {
    return (
        <div className="thank-you container page">
            <div className="content">
                <h1 className="title t3">Gracias por tu contribución</h1>
                <p>En Books X People queremos que compartir sea un acto de generosidad, respeto, empatía y comunicación.</p>
                <p>Tenemos que moderar tu participación para asegurarnos de que cumple las normas de la comunidad.</p>
                <p>Seguro que tu libro está pronto en nuestras estanterías.</p>
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
                <div className="go-back">
                    <Link to="/" class="btn-line">Volver</Link>
                </div>
            </div>
        </div>
    )
}

export default ThankYou
