import React from 'react';
import Loading from '../Loading'
import ErrorMessage from '../ErrorMessage'

import { GET_BOOK_DETAILS } from '../../queries'
import { useQuery } from '@apollo/react-hooks';

const BookDetails = ({bookId}) => {
    const { loading, error, data } = useQuery(GET_BOOK_DETAILS, { variables: {id:bookId}})

    if(error) return <ErrorMessage/>
    if(loading) return <Loading/>
    
    const { book } = data

    return (
        book 
        ? (
            <div class="book-details">
                <h1>{book.name}</h1>
                <p>{book.genre}</p>
                <p>{book.author.name}</p>
            </div>
        )
        : "No book selected"
    )
}

export default BookDetails
