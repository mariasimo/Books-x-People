import React, {useState} from 'react'
import Loading from '../Loading'
import ErrorMessage from '../ErrorMessage'
import {StyledBookList,StyledBookItem} from './styles';

// This package help us to bind apollo to our component
import {useQuery} from '@apollo/react-hooks';

// To fetch data we need to make two steps
// First we have to construct our query
// * We import it from:
import { GET_BOOKS } from '../../queries' 
import BookDetails from '../BookDetails';



const BookItem = ({name, getSelected}) => {  
   
    const randomHeight = () => Math.floor(Math.random() * (82.5 - 65)) + 65 + 'vh'; 
    const randomWidth = () => Math.floor(Math.random() * (7.5 - 2)) + 2 + "em"; 

    const num = randomWidth;
    console.log(num)

    return (
        <StyledBookItem onClick={getSelected} bookWidth={num} bookHeight={randomHeight}>
            <span>{name}</span>
        </StyledBookItem>
    )
}
    
const BookList = (props) => {
    const [selected, setSelected] = useState(null)
  
    // Then we have to bind it to our component 
    // For that, we use useQuey
    const {loading, error, data} = useQuery(GET_BOOKS);
    
    if(error) return <ErrorMessage/>
    if(loading) return <Loading/>
    
    // If theres no error and no loading, we get the books from data
    const { books } = data
    console.log(props)
    return (
        <StyledBookList>
            {books.map( book => (
                <BookItem key={book.id} {...book} getSelected={() => setSelected(book.id)}/>)
            )}
            {/* <BookDetails bookId={selected}/> */}
        </StyledBookList>
    )
}

export default BookList;