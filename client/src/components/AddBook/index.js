import React, {useState} from 'react'
import {useQuery, useMutation } from '@apollo/react-hooks';
import { GET_AUTHORS, ADD_BOOK, GET_BOOKS } from '../../queries'
import './styles.scss'

const AddBook = () => {
    const {loading, data} = useQuery(GET_AUTHORS)
    const [addBook, {data: addBookData}] = useMutation(ADD_BOOK)
    
    const  [state, setState] = useState({
        name: "",
        genre: "",
        authorId: ""
    })

    const displayAuthors = () => {
        if(!loading) {
            const {authors} = data
            return (
                authors.map(author => (
                    <option value={author.id} key={author.id}>{author.name}</option>
                ))
            )
        } else {
            return (
                <option disabled>Loading...</option>
            )
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addBook({
            variables: {
                name: state.name, 
                genre: state.genre,
                authorId: state.authorId
            },
            refetchQueries:[{query:GET_BOOKS}]
        })
        
    }

    return (
        <div className="add-book container page">
            <form id="add-book" onSubmit={(e) => handleSubmit(e)}>
                <div className="field">
                    <label>Book Name:</label>
                    <input type="text" onChange={(e) => setState({...state, name:e.target.value})}/>
                </div>

                <div className="field">
                    <label>Genre:</label>
                    <input type="text" name="genre"  onChange={(e) => setState({...state, genre:e.target.value})}/>
                </div>

                <div className="field">
                    <label>Author:</label>
                    <select  onChange={(e) => setState({...state, authorId:e.target.value})}>
                        <option label="Select Author"></option>
                        {displayAuthors()}
                    </select>
                </div>

                <button>+</button>
            </form>
        </div>
    )
}

export default AddBook;