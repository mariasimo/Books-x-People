import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { ADD_BOOK, GET_BOOKS, GET_TAGS } from '../../queries'
import './styles.scss'

const AddBook = ({history}) => {
    const [addBook] = useMutation(ADD_BOOK)
    const {data} = useQuery(GET_TAGS)
    
    const  [state, setState] = useState({
        name: "",
        author: "",
        comment: "",
        recommendedBy: "",
        tags: []
    })
   
    useEffect(() => {
        if(data && data.tags){
            let tags = shuffle(data.tags).slice(0,6).map(tag => tag = {...tag, isChecked: false})
            setState({...state, tags:tags})
        } 
    }, [data]);

    const checkTag = (e) => {
        const {tags} = state;
        tags.forEach(tag => {
            if (tag.name === e.target.value)
                tag.isChecked =  e.target.checked
            })
            setState({...state, tags:tags})
    }
    
    
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
        const tags = state.tags.filter(tag=>tag.isChecked==true).map(tag => tag.id)
        console.log(tags)
        addBook({
            variables: {
                author: state.author,
                name: state.name, 
                comment: state.comment,
                recommendedBy: state.recommendedBy,
                moderated: false,
                published: false,
                width: bookSize.width,
                height: bookSize.height,
                tags: tags
            },
            refetchQueries:[{query:GET_BOOKS}]
        }) 
        .then(bookSubmitted => {
            const {id} = bookSubmitted.data.addBook
            history.push(`/gracias/${id}`)
        })
    }

    const displayTags = () => {
        return state.tags.map((tag, idx) => {
            return (
                // Refactorizat y converit en un componente
                <>
                    <input type="checkbox" name={tag.name} value={tag.name} id={`tag-${idx}`} className="tag" onClick={(e)=>checkTag(e)}/>
                    <label htmlFor={`tag-${idx}`} className={tag.isChecked ? 'is-checked' : ''}>{tag.name}</label>
                </>
            )
        })
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

                <div className="buttons">
                    <Link to="/" className="btn-line-black">Cancelar</Link>
                    <button className="btn-black">Añadir libro</button>
                </div>
            </form>
        </div>
    )
}

export default AddBook;