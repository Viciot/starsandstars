import React , { useState } from "react";
import Axios from 'axios'
import Search from "../components/Search"


export default function Card(props) {
    const {
        hdurl,
        url,
        title,
        explanation,
        date        
    } = props.data

    const {user} = props
    
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
            
            { user &&  
            <div>
            <form className="form-stars" onSubmit={handleSendEmail} >
                <label htmlFor="email">Email</label>
                <input value= {formState.email} type="email" name="email" id="email" onChange={handleOnChange}/>
                <label htmlFor="message">Message</label>
                <textarea value= {formState.message} type="text" name="message" id="message" onChange={handleOnChange}></textarea>                
                <button className='form-btn' type="submit">Send a Star</button>
            </form>
            </div>    
            }

            <Search/>
     </>
 
    )
}