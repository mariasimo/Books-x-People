import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';


const TagList = ({tags}) => {
    return (
        tags &&
            <div className="tags-group">
              {tags.map(tag => (
                 <Link to={`/buscar-libro/?tag=${tag.id}`} key={tag.id}>
                    <span className="tag">{tag.name}</span>
                 </Link>
                ))}
        </div>        
    )
}

export default TagList
