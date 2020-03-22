import React, {useState, useEffect} from 'react';
import './styles.scss';

// Hacer que esto sean inputs, y que haya un f
const TagList = ({tags, handleTagSelection, queryTag}) => {
    const [tagList, setTagList] = useState(tags)

    useEffect(() => {
        setTagList(tags)
    });

    const checkTag = (e) => {
        tags.forEach(tag => {
            if (tag.name === e.target.value) {
                tag.isChecked = e.target.checked;
            }
        })
        let filteredTags=tags.filter(tag => tag.isChecked === true)
        setTagList(filteredTags)
        return (handleTagSelection) && handleTagSelection(filteredTags.map(tag => tag.id))
    }
    
    return (
        tagList &&
            <div className="tags-group">
              {tagList.map((tag,idx) => (
                    <a key={tag.id}>
                        <input 
                            type="checkbox" 
                            name={tag.name} 
                            value={tag.name} 
                            id={`tag-${idx}`}  
                            onClick={(e)=>checkTag(e)}
                        />
                        <label htmlFor={`tag-${idx}`} className={`tag ${(tag.isChecked || queryTag === tag.id) ? "is-checked" : ""}`}>{tag.name}</label>
                    </a>
                ))}
            </div>        
    )
}

export default TagList
