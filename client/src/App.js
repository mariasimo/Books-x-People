import React, {useState} from 'react';
import {
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import './globalStyles/base.scss';
import queryString from 'query-string'

import BookList from './components/BookList'
import AddBook from './components/AddBook'
import Intro from './components/Intro';
import Header from './components/Header';
import ThankYou from './components/ThankYou';
import BookDetails from './components/BookDetails'
import SearchBook from './components/SearchBook';

function App({location}) {
  const queryTagObject = queryString.parse(location.search);

  const [selectedTags, setSelectedTags] = useState([])

  const handleTagSelection = tags => {
      setSelectedTags(tags)
  }

  return (
    <main>
    {location.pathname !== '/' && <Header/>}
      <section className="section_1-2 section-fixed">
        <Switch>
          <Route path="/" exact component={Intro}/>
          <Route path="/recomendar-libro" component={AddBook}/>
          <Route path="/gracias/:id" component={ThankYou}/>
          <Route path="/libro/:bookId" render={(props) => <BookDetails {...props}/>}/>
          <Route path="/buscar-libro" render={() => <SearchBook handleTagSelection={(tags)=>handleTagSelection(tags)} queryTag={queryTagObject.tag}/>} />
        </Switch>
      </section>

      <section className={`section_1-2 section-fixed book-list-container ${location.pathname!=='/' ? 'header-layout' : ""}` }>   
      
      <BookList selectedTags={selectedTags} queryTag={queryTagObject.tag} {...location}/>
      
      </section>

      {/* <Footer/> */}
      {/* <AddBook/> */}
    </main>
  );
}

export default withRouter(App);
