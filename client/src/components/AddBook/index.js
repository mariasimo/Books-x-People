import React, {useState} from 'react'
import { useMutation } from '@apollo/react-hooks';
import { ADD_BOOK, GET_BOOKS } from '../../queries'
import './styles.scss'

const AddBook = ({history}) => {
    const [addBook, {loading: addBookLoading}] = useMutation(ADD_BOOK)
    
    const  [state, setState] = useState({
        name: "",
        author: "",
        comment: "",
        recommendedBy: ""
    })


    const handleSubmit = (e) => {
        e.preventDefault()
        addBook({
            variables: {
                author: state.author,
                name: state.name, 
                comment: state.comment,
                recommendedBy: state.recommendedBy
            },
            refetchQueries:[{query:GET_BOOKS}]
        }) 
        .then(bookSubmitted => {
            const {id} = bookSubmitted.data.addBook
            history.push(`/gracias/${id}`)
        })
    }

    return (
        <div className="add-book container page">
            <form id="add-book" className="content" onSubmit={(e) => handleSubmit(e)}>
                <div className="field">
                    <label>Nombre:</label>
                    <input type="text" onChange={(e) => setState({...state, recommendedBy:e.target.value})}/>
                </div>

                <div className="field">
                    <label>Título del libro:</label>
                    <input type="text" onChange={(e) => setState({...state, name:e.target.value})}/>
                </div>

                <div className="field">
                    <label>Autor:</label>
                    <input type="text" onChange={(e) => setState({...state, author:e.target.value})}/>
                </div>

                <div className="field">
                    <p><label>¿Quieres dejar un comentario?</label></p>
                    <textarea onChange={(e) => setState({...state, comment:e.target.value})}/>
                </div>

                <button>+</button>
            </form>
        </div>
    )
}

export default AddBook;