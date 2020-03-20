import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";


import './globalStyles/base.scss';
import BookList from './components/BookList'
import { Footer } from './components/Footer';
import AddBook from './components/AddBook'
import Intro from './components/Intro';

function App() {
  return (
    <main>
      <section className="section_1-2">
        <Switch>
          <Route path="/" exact component={Intro}/>
          <Route path="/add-book" component={AddBook}/>
        </Switch>
      </section>
      <section className="section_1-2 book-list-container">   
        <BookList/>
      </section>

      {/* <Footer/> */}
      {/* <AddBook/> */}
    </main>
  );
}

export default App;
