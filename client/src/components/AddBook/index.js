import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { ADD_BOOK, GET_BOOKS, GET_TAGS, ADD_TAG } from '../../queries'
import './styles.scss'
import TagList from '../Tags';
import {shuffle,addBookSize} from '../../utils'

import axios from 'axios';

const AddBook = ({history}) => {
    const [addBook] = useMutation(ADD_BOOK)
    const [addTag] = useMutation(ADD_TAG ,{ onCompleted(data) { 
        setState({...state,  newTags: [...state.newTags, data.addTag.id]})
    }})
    const {data} = useQuery(GET_TAGS)

    const  [state, setState] = useState({
        name: "",
        author: "",
        comment: "",
        recommendedBy: "",
        tags: [],
        newTags: []
    })
   
    useEffect(() => {
        if(data && data.tags){
            let tags = shuffle(data.tags).slice(0,6).map(tag => tag = {...tag, isChecked: false})
            setState({...state, tags:tags})
        } 
    }, [data]);

    useEffect(() => {
        if(state.newTags.length) addNewBook(state.tags, state.newTags)
    }, [state])

    const handleNewTag = (e) => {    
        if (e.key === "Enter") {
            e.preventDefault()
            const newTag = {
                name: e.target.value,
                isChecked: true
            }
            setState({...state, tags: [...state.tags, newTag]})

            let newTagDOMEL = document.querySelector('.create-tag')
            newTagDOMEL.value = " ";
        }
    }

    const addNewTags = (tags) => {
        tags.forEach(tag => {
            return addTag({
                variables: {
                    name:tag.name,
                    moderated: false,
                    published: false
                }
            })
        })
    }

    const addNewBook = (tags, newTags) => {
        const bookSize = addBookSize()
        let tagList = tags.filter(tag=> (tag.isChecked===true && tag.id !== undefined)).map(tag => tag.id)
        tagList.push(...newTags)

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
                tags: tagList
            },
            refetchQueries:[{query:GET_BOOKS}]
        }) 
        .then(bookSubmitted => {
            sendMail(bookSubmitted.data.addBook)
            const {id} = bookSubmitted.data.addBook
            history.push(`/gracias/${id}`)
        })
        .catch(err => console.log(err))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const tagsToAdd = state.tags.filter(tag => tag.id===undefined);

        if(tagsToAdd.length){
            addNewTags(tagsToAdd)
        } else {
            addNewBook(state.tags, state.newTags)
        }


    }

    const sendMail = mailData => {
        return axios.post(`${process.env.REACT_APP_API_URL}/send-mail`, mailData)
    }

    return (
        <div className="add-book page">
            <form id="add-book" className="content w-padding" onSubmit={(e) => handleSubmit(e)}>
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
                    <fieldset>
                        <legend>Este es un libro perfecto para...</legend>
                        <TagList tags={[...state.tags]}/>
                    </fieldset>
                    <input type="text" className="create-tag" placeholder="Añade tu propia etiqueta" onKeyDown={(e) =>handleNewTag(e) && e.preventDefault()}/>
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