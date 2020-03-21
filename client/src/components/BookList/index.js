import React from 'react'
import Loading from '../Loading'
import ErrorMessage from '../ErrorMessage'
import  './styles.scss';

// This package help us to bind apollo to our component
import {useQuery} from '@apollo/react-hooks';

// To fetch data we need to make two steps
// First we have to construct our query
// * We import it from:
import { GET_BOOKS } from '../../queries' 

const BookItem = ({name, author, getSelected, bookSize}) => {  
    const fontSize = +bookSize.width.replace('em', '')*.8 + 'em';
    return (
        <li onClick={getSelected}>
            <div className="vertical-text" style={{width:bookSize.width, height: bookSize.height, fontSize: fontSize}}>
                <span className="book-title">{name}</span>
                <span className="book-author">{author}</span>
            </div>
        </li>
    )
}
    
const BookList = () => {
    // const [selected, setSelected] = useState(null)
  
    // Then we have to bind it to our component 
    // For that, we use useQuey
    const {loading, error, data} = useQuery(GET_BOOKS);
    
    if(error) return <ErrorMessage/>
    if(loading) return <Loading/>
    
    // If theres no error and no loading, we get the books from data
    const { books } = data
    console.log(data)

    // Random book size
    const randomHeight = () => Math.floor(Math.random() * (85 - 75)) + 75 + 'vh'; 
    const randomWidth = () => Math.floor(Math.random() * (3.75- 1.75)) + 1.75 + "em"; 

    const bookSize = () => ({
        width: randomWidth(),
        height: randomHeight(),
    })
  
    return (
        <ul className="book-list">
            {books.map( book => (   
                <BookItem key={book.id} {...book} 
                    // getSelected={() => setSelected(book.id)} 
                    bookSize={bookSize()}
                />)
            )}
            {/* <BookDetails bookId={selected}/> */}
        </ul>
    )
}

export default BookList;