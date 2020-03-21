import React from 'react'
import Loading from '../Loading'
import { Link } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage'
import  './styles.scss';

// This package help us to bind apollo to our component
import {useQuery} from '@apollo/react-hooks';

// To fetch data we need to make two steps
// First we have to construct our query
// * We import it from:
import { GET_BOOKS } from '../../queries' 

const BookItem = ({name, author, recommendedBy, width, height, id}) => {  

    const factor = (name.length > 25 || author.length > 25) ? .6 : .8;
    const fontSize = width.replace('em', '')* factor + 'em';

    return (
        <li>
            <Link to={`/libro/${recommendedBy}/${id}`}>
                <div className="vertical-text" style={{width:width, height: height, fontSize: fontSize}}>
                    <span className="book-title">{name}</span>
                    <span className="book-author">{author}</span>
                </div>
            </Link>
        </li>
    )
}
    
const BookList = () => {
  
    // Then we have to bind it to our component 
    // For that, we use useQuey
    const {loading, error, data} = useQuery(GET_BOOKS);
    
    if(error) return <ErrorMessage/>
    if(loading) return <Loading/>
    
    // If theres no error and no loading, we get the books from data
    const { books } = data
    console.log(books)
    return (
        <ul className="book-list">
            {books.map( book => (   
                <BookItem key={book.id} {...book}/>)
            )}
        </ul>
    )
}

export default BookList;