import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import SocialSharing from '../SocialSharing';

const ThankYou = () => {
    return (
        <div className="thank-you container page">
            <div className="content">
                <h1 className="title t3">Gracias por tu contribución</h1>
                <p>En Books X People queremos que compartir sea un acto de generosidad, respeto, empatía y comunicación.</p>
                <p>Tenemos que moderar tu participación para asegurarnos de que cumple las normas de la comunidad.</p>
                <p>Seguro que tu libro está pronto en nuestras estanterías.</p>
                
                {/* I wil need later to pass via props the link to share */}
                <SocialSharing/> 
                
                <div className="go-back">
                    <Link to="/" class="btn-line">Volver</Link>
                </div>
            </div>
        </div>
    )
}

export default ThankYou
