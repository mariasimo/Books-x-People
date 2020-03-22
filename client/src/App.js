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
import BookDetails from './components/BookDetails'
import SearchBook from './components/SearchBook';

function App({location}) {
  return (
    <main>
    {location.pathname !== '/' && <Header/>}
      <section className="section_1-2 section-fixed">
        <Switch>
          <Route path="/" exact component={Intro}/>
          <Route path="/recomendar-libro" component={AddBook}/>
          <Route path="/gracias/:id" component={ThankYou}/>
          <Route path="/libro/:bookId" render={(props) => <BookDetails {...props}/>}/>
          <Route path="/buscar-libro" component={SearchBook}/>
        </Switch>
      </section>

      <section className={`section_1-2 section-fixed book-list-container ${location.pathname!=='/' ? 'header-layout' : ""}` }>   
        <BookList/>
      </section>

      {/* <Footer/> */}
      {/* <AddBook/> */}
    </main>
  );
}

export default withRouter(App);
