
import React from 'react';
import {Link} from 'react-router-dom';

const BookConfirmation = () => {
    return (
        <div className="page">
            <div className="content">
                <h1 className="title t2">Dicho y hecho</h1>
                <p>
                    Toda la información de este libro se ha borrado con éxito de la base de datos
                </p>

                <div className="go-back">
                    <br/>
                    <Link to="/" className="btn-line">Volver al inicio</Link>
                </div>
            </div>
        </div>
    )
}

export default BookConfirmation
