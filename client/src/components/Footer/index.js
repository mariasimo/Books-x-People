import React from 'react';
import './styles.scss';

export const Footer = () => {
    return (
        <footer>
            <p className="small">
                María Simó, en Madrid. Marzo 2020
            </p>
            <div className="social">
                <a href="#"><img src={`${process.env.REACT_APP_URL}/github-icon.svg`}/></a>
                <a href="#"><img src={`${process.env.REACT_APP_URL}/linkedin-icon.svg`}/></a>
            </div>
        </footer>
    )
}
