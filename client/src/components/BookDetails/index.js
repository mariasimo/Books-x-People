import React from 'react';
import Loading from '../Loading'
import ErrorMessage from '../ErrorMessage'
import './styles.scss';

import { GET_BOOK_DETAILS } from '../../queries'
import { useQuery } from '@apollo/react-hooks';

const BookDetails = ({match}) => {
    // Anidar una desestructuración aqui para extraer directamente books?
    const { loading, error, data } = useQuery(GET_BOOK_DETAILS, { variables: {id:match.params.bookId}})
    const book = data && data.book;

    return (
        <div class="book-details page">
            {!error
                ?  !loading 
                    ? book && (
                        <div className="content">
                            <p>Recomendado por <span className="b">{book.recommendedBy}</span></p>
                            <h1 className="title t1">{book.name}</h1>
                            <h2 className="title t3">{book.author}</h2>
                            <p>{book.comment}</p>
                        </div>
                    )
                    : <Loading/>
                : <ErrorMessage/>
            }
        </div>
    )
}

export default BookDetails
