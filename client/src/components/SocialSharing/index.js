import React from 'react'
import './styles.scss'

const SocialSharing = ({bookId, bookName}) => {

    let message; 
    if(bookId && bookName) {
        message = `Books%20x%20People%20—%20%23YoMeQuedoEnCasa%20leyendo%20${bookName}%20https://books-x-people.herokuapp.com/libro/${bookId}`
    } else {
        message = `Books%20x%20People%20—%20Recomienda%20un%20libro%20%23YoMeQuedoEnCasa%20https://books-x-people.herokuapp.com`
    }


return (
        <div className="social-sharing">
            <p>Compartir:</p>
            <ul className="social-icons horizontal-list">
                <li class="whastapp-web"><a target="_blank" href={`https://web.whatsapp.com/send?text=${message}`} data-action="share/whatsapp/share"><img alt="social-sharing" src={`${process.env.REACT_APP_URL}/whatsapp-icon.svg`}/></a></li>
                <li class="whastapp-mobile"><a target="_blank" href={`whatsapp://send?text=${message}`} data-action="share/whatsapp/share"><img alt="social-sharing" src={`${process.env.REACT_APP_URL}/whatsapp-icon.svg`}/></a></li>
                <li><a target="_blank" href={`https://twitter.com/intent/tweet?text=${message}`}><img alt="social-sharing" src={`${process.env.REACT_APP_URL}/twitter-icon.svg`}/></a></li>
                <li><a target="_blank" href={`https://www.linkedin.com/shareArticle?mini=true&url=${process.env.REACT_APP_URL}&title=Books%20%x%20People&summary=${message}&source=${process.env.REACT_APP_URL}`}><img alt="social-sharing" src={`${process.env.REACT_APP_URL}/linkedin-icon.svg`}/></a></li>
                <li><a target="_blank" href={`mailto:?&subject=&body=${message}`}><img alt="social-sharing" src={`${process.env.REACT_APP_URL}/mail-icon.svg`}/></a></li>
            </ul>
        </div>
    )
}

export default SocialSharing
