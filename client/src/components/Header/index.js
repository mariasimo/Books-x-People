import React from 'react'
import {Link} from 'react-router-dom'
import './styles.scss'

const Header = () => {
    return (
        <header>
            <img src={`/book-icon.svg`}/>
            <Link to="/">
                <h1 className="title t3 vertical-text">Books x People</h1>
            </Link>
            <img src={`/people-icon.svg`}/>
        </header>
    )
}

export default Header;
