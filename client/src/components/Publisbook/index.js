import React from 'react';

import Loading from '../Loading'
import ErrorMessage from '../ErrorMessage'
import TagList from '../Tags'

import './styles.scss';

import { 
    GET_BOOK_DETAILS, 
    APPROVE_BOOK, 
    GET_BOOKS, 
    APPROVE_TAG, 
    DELETE_BOOK, 
    DELETE_TAG
 } from '../../queries'

import { useQuery, useMutation } from '@apollo/react-hooks';


const PublishBook = ({history, match}) => {
    const [approveBook] = useMutation(APPROVE_BOOK)
    const [approveTag] = useMutation(APPROVE_TAG)
    const [deleteBook] = useMutation(DELETE_BOOK)
    const [deleteTag] = useMutation(DELETE_TAG)

    const { loading, error, data } = useQuery(GET_BOOK_DETAILS, { variables: {id:match.params.bookId}})
    const book = data && data.book;
    const newTags = book && book.tags.filter(tag => tag.moderated === false)
    
    const approveThis = (bookId, newTags) => {
        const newTagsToAdd = newTags.filter(tag => tag.isChecked === true).map(tag => tag.id)
        const newTagsToDelete = newTags.filter(tag => tag.isChecked !== true).map(tag => tag.id)
        
        if(newTagsToAdd.length) {
            newTagsToAdd.forEach(tag => {
                approveTag({
                    variables: {
                        id: tag,
                    },
                })
                .then(tag => console.log(tag))
            })
       }

        if(newTagsToDelete.length) {
            newTagsToDelete.forEach(tag => {
                deleteTag({
                    variables: {
                        id: tag,
                    },
                })
                .then(tag => console.log(tag))
            })
        } 

        approveBook({
            variables: {
                id: match.params.bookId,
            },
            refetchQueries:[{query:GET_BOOKS},{query:GET_BOOK_DETAILS}]
        }) 
        .then(_ =>             
            history.push(`/libro/${bookId}`)
        )
    }

    const deleteThis = (bookId, newTags) => {
        console.log(bookId, newTags)
        deleteBook({
            variables: {
                id: bookId,
            }
        }) 
        .then(_ => {
              if(newTags) {
            newTags.forEach(tag => {
                deleteTag({
                    variables: {
                        id: tag.id,
                    },
                })
                .then(tag => console.log(tag))
            })
            }
            history.push(`/confirmacion/borrado/${bookId}`)
        })
      
    }
    
    return (
        <div className="book-details page">
        {!error
            ?  !loading 
                ? book && (
                    <div className="content">
                        <p>Alguien ha recomendado un nuevo libro</p>
                        <h1 className="title t1">{book.name}</h1>
                        <h2 className="title t3">{book.author}</h2>
                       
                        <div className="tags-group">
                            {book.tags.map((tag,idx) => (
                                <span className="tag">{tag.name}</span>
                            ))}
                        </div>
                        <p className="comment">{book.comment}</p>

                        <div className="moderation">
                            <h2>Moderación</h2>
                            <p>Este libro espera moderación para ser publicado en Books x People. </p>
                            
                            {newTags.length > 0 &&
                                <p><span className="b">¡Atención!</span> El usuario ha incluido nuevas etiquetas. 
                                Valídalas con un click y cuando apruebes el libro se incluirán en la selección de tags.</p>
                            } 

                            <TagList tags={[...newTags]}/>

                        </div>
                
                        <button className="btn-line" onClick={() => deleteThis(book.id, newTags)}>Borrar todo</button>
                        <button className="btn" onClick={() => approveThis(book.id, newTags)}>Aprobar este libro</button>

                        {book.published && <p className="b">Libro incluido en la estantería, ¡gracias!</p>}
                    </div>
                )
                : <Loading/>
            : <ErrorMessage/>
        }
    </div>
    )
}

export default PublishBook
