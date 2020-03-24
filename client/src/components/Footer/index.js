import React from 'react';
import './styles.scss';

const Footer = () => {
    return (
        <footer>
            <span className="small">
                María Simó, en Madrid. Marzo 2020
            </span>
            <div className="social">
                <a href="https://github.com/mariasimo/" target="_blank"><img src={`${process.env.REACT_APP_URL}/github-icon.svg`}/></a>
                <a href="https://www.linkedin.com/in/maria-simo/" target="_blank"><img src={`${process.env.REACT_APP_URL}/linkedin-icon.svg`}/></a>
            </div>
        </footer>
    )
}

export default Footer;