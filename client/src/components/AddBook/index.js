import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { ADD_BOOK, GET_BOOKS, GET_TAGS } from '../../queries'
import './styles.scss'

const AddBook = ({history}) => {
    const [addBook, {loading: addBookLoading}] = useMutation(ADD_BOOK)
    const { loading, error, data } = useQuery(GET_TAGS)
    
    const  [state, setState] = useState({
        name: "",
        author: "",
        comment: "",
        recommendedBy: ""
    })

    // Random book size
    const randomHeight = () => Math.floor(Math.random() * (95 - 80)) + 80 + '%'; 
    const randomWidth = () => Math.floor(Math.random() * (3.75- 1.75)) + 1.75 + "em"; 

    const shuffle = (o) => {
        for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    const addBookSize = () => ({
        width: randomWidth(),
        height: randomHeight(),
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const bookSize = addBookSize()
        addBook({
            variables: {
                author: state.author,
                name: state.name, 
                comment: state.comment,
                recommendedBy: state.recommendedBy,
                moderated: false,
                published: false,
                width: bookSize.width,
                height: bookSize.height
            },
            refetchQueries:[{query:GET_BOOKS}]
        }) 
        .then(bookSubmitted => {
            console.log(bookSubmitted)
            const {id} = bookSubmitted.data.addBook
            history.push(`/gracias/${id}`)
        })
    }

    const displayTags = () => {
        return data && (shuffle(data.tags).slice(0,6).map((tag, idx) => {
            return (
                < >
                    <input type="checkbox" name={tag.name} value={tag.name} id={`tag-${idx}`} className="tag"/>
                    <label for={`tag-${idx}`}>{tag.name}</label>
                </>
            )
        }))
    }

    return (
        <div className="add-book page">
            <form id="add-book" className="content" onSubmit={(e) => handleSubmit(e)}>
                <div className="field">
                    <label>Tu nombre:</label>
                    <input type="text" required onChange={(e) => setState({...state, recommendedBy:e.target.value})}/>
                </div>

                <div className="field">
                    <label>Título del libro:</label>
                    <input type="text" required onChange={(e) => setState({...state, name:e.target.value})}/>
                </div>

                <div className="field">
                    <label>Autor:</label>
                    <input type="text" required onChange={(e) => setState({...state, author:e.target.value})}/>
                </div>

                <div className="field">
                    <fieldset className="tags-group">
                        <legend>Este libro es perfecto para...</legend>
                        {displayTags()}
                    </fieldset>
                    <input type="text" className="create-tag" placeholder="Añade tu propia etiqueta"/>
                </div>

                <div className="field">
                    <label>¿Por qué lo recomiendas?</label>
                    <textarea rows="5" onChange={(e) => setState({...state, comment:e.target.value})}/>
                </div>

                <div class="buttons">
                    <Link to="/" class="btn-line-black">Cancelar</Link>
                    <button class="btn-black">Añadir libro</button>
                </div>
            </form>
        </div>
    )
}

export default AddBook;