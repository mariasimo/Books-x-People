import React from 'react';
import './styles.scss';

export const Footer = () => {
    return (
        <footer>
            <p className="small">
                María Simó, en Madrid. Marzo 2020
            </p>
            <div className="social">
                <a href="#"><img src={`/github-icon.svg`}/></a>
                <a href="#"><img src={`/linkedin-icon.svg`}/></a>
            </div>
        </footer>
    )
}
