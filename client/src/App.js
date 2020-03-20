import React from 'react';

import './globalStyles/base.scss';
import BookList from './components/BookList'


function App() {
  return (
    <main>
      <section className="intro">
          <h1 className="title t1">Books x People</h1>
          <div className="content">
            <p>Cuando leemos,  escuchamos nuestros pensamientos en palabras de otros. Nos inspiramos, pensamos con los demas,  nos sentimos acompañados y viajamos durante horas por el espacio interior.</p>
            <p>En estos tiempos difíciles un libro puede ser un gran aliado. Deja aquí tu lectura recomendada.</p>
          </div>
          <p>Recomienda un libro para estos días en casa. <span className="b">#YoMeQuedoEnCasa</span></p>
          
          <button className="btn">Añadir un libro a la estantería</button>
          <button className="btn-line">Buscar libro</button>
      </section>

      <section className="book-list">   
        <BookList/>
      </section>
      {/* <AddBook/> */}
    </main>
  );
}

export default App;
