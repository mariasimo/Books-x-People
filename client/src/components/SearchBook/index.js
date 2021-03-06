import React from 'react';
import './styles.scss'
import {useQuery} from '@apollo/react-hooks';
import { GET_TAGS } from '../../queries' 
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';
import TagList from '../Tags';

const SearchBook = ({handleTagSelection, queryTag}) => {
    const {loading, error, data} = useQuery(GET_TAGS);
    if(error) return <ErrorMessage/>
    if(loading) return <Loading/>    
    const { tags } = data;
     
    return (
        <div className="search-books page">
            <div className="content">
            {!error
            ?  !loading 
                ? tags && (
                    <form>
                        <fieldset>
                            <legend>Estoy buscando un libro para...</legend>
                            <TagList queryTag={queryTag} tags={tags} handleTagSelection={(tags)=>handleTagSelection(tags)}/>
                        </fieldset>
                    </form>
                )
                : <Loading/>
            : <ErrorMessage/>}
            </div>
        </div>
    )
}

export default SearchBook
