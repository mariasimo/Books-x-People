import React from 'react';
import './App.scss';
import BookList from './components/BookList'
import AddBook from './components/AddBook';


function App() {
  return (
    <div className="App">
      <h1>Nowadays Readings</h1>
      <p>Recomienda un libro para estos días en casa</p>
      <BookList/>
      <AddBook/>
    </div>
  );
}

export default App;
