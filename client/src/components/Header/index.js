import React from 'react'
import {Link} from 'react-router-dom'
import './styles.scss'

const Header = () => {
    console.log(process.env)
    return (
        <header>
            <img src={`${process.env.REACT_APP_URL}/book-icon.svg`} alt="Book icon"/>
            <Link to="/">
                <p className="title t3 vertical-text">Books x People</p>
            </Link>
            <img src={`${process.env.REACT_APP_URL}/people-icon.svg`} alt="People icon"/>
        </header>
    )
}

export default Header;
