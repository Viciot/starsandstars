import React , { useState } from "react";
import { Link } from "react-router-dom"
import App from "../App"
import {nodeMailService} from "../services/nodemailer"
import Axios from 'axios'


export default function Card(props) {
    const {
        hdurl,
        url,
        title,
        explanation,
        date
    } = props.data
    
        const initialFormState = {}

        const [formState, setFormState] = useState(initialFormState)

        function handleOnChange(event){
            setFormState({ ...formState, [event.target.name]: event.target.value })
        }

    function handleSendEmail(event) {
        event.preventDefault();
        Axios.post('http://localhost:5005/api/favorites/send-star', { ...formState, hdurl, url } )  //concatenamos el contenido del form con la hdurl y asi creamos un objeto y lo mandamos
        .then(res=> setFormState(initialFormState))
        .catch(err=>console.log(err))
    }
        
    
    return(
       <>
            <div>
               <img src={url} alt="card-detail-img"/>

            <div className="detail-title">
                <p className="detail-title">{title}</p>
            </div>

            <div className="detail-line-1">
                <p className="detail-explanation">{explanation}</p>
            </div>
            <div className="detail-line-2">
                <p className="detail-tagline">{date}</p>
            </div>
            </div>
            
            <form onSubmit={handleSendEmail} >
                <label htmlFor="email">Email</label>
                <input value= {formState.email} type="email" name="email" id="email" onChange={handleOnChange}/>
                <label htmlFor="message">Message</label>
                <textarea value= {formState.message} type="text" name="message" id="message" onChange={handleOnChange}></textarea>                
                <button type="submit">Send a Star</button>
            </form>
     </>
 
    )
}