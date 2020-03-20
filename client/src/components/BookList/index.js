import React, {useState} from 'react'
import Loading from '../Loading'
import ErrorMessage from '../ErrorMessage'

// This package help us to bind apollo to our component
import {useQuery} from '@apollo/react-hooks';

// To fetch data we need to make two steps
// First we have to construct our query
// * We import it from:
import { GET_BOOKS } from '../../queries' 
import BookDetails from '../BookDetails';

const BookItem = ({name, getSelected}) => {  
    return (
        <li onClick={getSelected}>{name}</li>
    )
}
    
const BookList = () => {
    const [selected, setSelected] = useState(null)
  
    // Then we have to bind it to our component 
    // For that, we use useQuey
    const {loading, error, data} = useQuery(GET_BOOKS);
    
    if(error) return <ErrorMessage/>
    if(loading) return <Loading/>
    
    // If theres no error and no loading, we get the books from data
    const { books } = data

    return (
        <div>
            {books.map( book => (
                <BookItem key={book.id} {...book} getSelected={() => setSelected(book.id)}/>)
            )}
            <BookDetails bookId={selected}/>
        </div>
    )
}

export default BookList;