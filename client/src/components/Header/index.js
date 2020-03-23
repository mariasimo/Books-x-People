import React from 'react'
import {Link} from 'react-router-dom'
import './styles.scss'

const Header = () => {
    return (
        <header>
            <Link to="/">
            <div className="desktop">
                <img src={`${process.env.REACT_APP_URL}/book-icon.svg`} alt="Book icon"/>
                    <p className="title t3 vertical-text">Books x People</p>
                <img src={`${process.env.REACT_APP_URL}/people-icon.svg`} alt="People icon"/>
            </div>
            
            <div className="mobile">
                <img src={`${process.env.REACT_APP_URL}/acronym.svg`} alt="People icon"/>
                <img src={`${process.env.REACT_APP_URL}/pictogram.svg`} alt="People icon"/>
            </div>

            </Link>
        </header>
    )
}

export default Header;
