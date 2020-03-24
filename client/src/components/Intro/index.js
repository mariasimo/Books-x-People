import React from 'react'
import {Link } from "react-router-dom";
import './styles.scss';

const Intro = () => {
    return (
      <div className="intro">
          <h1 className="title t1">Books x People</h1>
          <div className="content">
            <p>Cuando leemos,  escuchamos nuestros pensamientos en palabras de otros. Nos inspiramos, nos sentimos acompañados y hacemos viajes de interior.</p>
            <p>En estos tiempos difíciles un libro puede ser un gran aliado. Deja aquí tu lectura recomendada.</p>
            <p>Recomienda un libro para estos días en casa. <span className="b">#YoMeQuedoEnCasa</span></p>
          </div>

          <div className="button-group">
            <Link to="/recomendar-libro" className="btn">Añadir un libro a la estantería</Link>
            <Link to="/buscar-libro" className="btn-line">Buscar libro</Link>
          </div>         
        </div>
    )
}

export default Intro
