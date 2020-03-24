import React from 'react';
import Loading from '../Loading'
import { Link } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage'
import './styles.scss';

import { GET_BOOK_DETAILS } from '../../queries'
import { useQuery } from '@apollo/react-hooks';
import SocialSharing from '../SocialSharing';
import TagList from '../Tags';

const BookDetails = ({match}) => {
    // Anidar una desestructuración aqui para extraer directamente books?
    const { loading, error, data } = useQuery(GET_BOOK_DETAILS, { variables: {id:match.params.bookId}})
    const book = data && data.book;

    return (
        <div className="book-details page">
            {!error
                ?  !loading 
                    ? book && (
                        <div className="content">
                            <p>Recomendado por <span className="b">{book.recommendedBy}</span></p>
                            <h1 className="title t1">{book.name}</h1>
                            <h2 className="title t3">{book.author}</h2>
                           
                            <div className="tags-group">
                                {book.tags.map((tag,idx) => (
                                    <Link key={tag.id} to={`/buscar-libro/filtrar?tag=${tag.id}`}>
                                        <input type="checkbox" name={tag.name} value={tag.name} id={`tag-${idx}`}/>
                                        <label htmlFor={`tag-${idx}`} className={`tag ${tag.isChecked ? "is-checked" : ""}`}>{tag.name}</label>
                                    </Link>
                                ))}
                            </div>

                            <p>{book.comment}</p>
                            <div className="go-back">
                                <Link to="/" className="btn-line">Devolver a la estantería</Link>
                            </div>
                            <SocialSharing bookId={book.id} bookName={book.name}/>
                        </div>
                    )
                    : <Loading/>
                : <ErrorMessage/>
            }
        </div>
    )
}

export default BookDetails
