import React from 'react';
import {
  Switch,
  Route,
  withRouter
} from "react-router-dom";


import './globalStyles/base.scss';
import BookList from './components/BookList'
import AddBook from './components/AddBook'
import Intro from './components/Intro';
import Header from './components/Header';
import ThankYou from './components/ThankYou';

function App({location}) {
  return (
    <main>
    {location.pathname !== '/' && <Header/>}
      <section className="section_1-2 section-fixed">
        <Switch>
          <Route path="/" exact component={Intro}/>
          <Route path="/recomendar-libro" component={AddBook}/>
          <Route path="/gracias/:id" component={ThankYou}/>
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

export default withRouter(App);
