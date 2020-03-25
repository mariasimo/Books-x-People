import React, {useState} from 'react'
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

const BookItem = ({name, width, author, height, id, getSelected, pickedBook, tags, selectedTags, queryTag}) => {  
    const factor = (name.length > 25 || author.length > 25) ? .6 : .75;
    const fontSize = width.replace('em', '')* factor + 'em';

    const isSelectedByTag = tags => {
        const tagsIds = tags.map(tag => tag.id)
        const allTags = Object.values(selectedTags)
        allTags.push(queryTag)

        const isTagIncluded =  allTags.map(tag => {
            return (tagsIds.includes(tag))
        })
        return (isTagIncluded.includes(true)) ? true : false;
    }

    return (
        <li onClick={getSelected} className={(pickedBook === id) ? 'picked-book' : "", (isSelectedByTag(tags)) ? 'selected-by-tag':""} >
            <Link to={`/libro/${id}`}>
                <div className="vertical-text" style={{width:width, height: height, fontSize: fontSize}}>
                    <span className="book-title">{name}</span>
                    <span className="book-author">{author}</span>
                </div>
            </Link>
        </li>
    )
}
    
const BookList = ({selectedTags, queryTag, pathname}) => {
    const [selected, setSelected] = useState(null)

    const {loading, error, data} = useQuery(GET_BOOKS);
    let books = data && data.books;
    
    return (
        <div className="book-list-container">
            {!error
            ?  !loading 
                ? books && (
                    <ul className={`book-list ${((selectedTags.length || queryTag) && pathname.includes('/buscar-libro')) ? 'search-mode' : ''}`}>
                        {books.sort((a,b) => b.createdAt.localeCompare(a.createdAt)).map( book => (   
                            <BookItem 
                                {...book} 
                                key={book.id} 
                                pickedBook={selected} 
                                getSelected={() => setSelected(book.id)}
                                selectedTags={selectedTags}
                                queryTag={queryTag}
                            />
                        )
                        )}
                    </ul>
                )
                : <Loading/>
            : <ErrorMessage/>}
        </div>
        )
}

export default BookList;


