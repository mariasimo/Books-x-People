import React from 'react';
import './styles.scss'
import {useQuery} from '@apollo/react-hooks';
import { GET_TAGS } from '../../queries' 
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';
import TagList from '../Tags';

const SearchBook = () => {
    const {loading, error, data} = useQuery(GET_TAGS);
    if(error) return <ErrorMessage/>
    if(loading) return <Loading/>    
    const { tags } = data

    return (
        <div className="search-book page">
            <div className="content">
            {!error
            ?  !loading 
                ? tags && (
                        <div>
                            <h1>Estoy buscando un libro para...</h1> 
                            <TagList tags={tags}/>
                        </div>
                )
                : <Loading/>
            : <ErrorMessage/>}
            </div>
        </div>
    )
}

export default SearchBook
