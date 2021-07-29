import React from 'react'
import { Link } from "react-router-dom"
import DetailsPageHeader from "../pages/DetailsPageHeader"
import DailyFavoritesButton from "../components/DailyFavoritesButton"




//axios.get(`${process.env.REACT_APP_SERVER_URL}/some-route`, { withCredentials: true });
//!some-route que deberiamos poner?¿¿??¿


    // "copyright": ,
    // "date": "YYYY-MM-DD"
    // "explanation": 
    // "hdurl": "https://apod.nasa.gov/apod/image/2107/IC1396SH2-129Ou4_50Hsieh.jpg",
    // "media_type": "image",
    // "service_version": "",
    // "title": "",
    // "url": "https://apod.nasa.gov/apod/image/2107/IC1396SH2-129Ou4_50Hsieh_1024.jpg"


function Header(props){
      const {data, user} = props

    return(
        <div>
        {
        data &&            
        <div className= "header">
        
        <div className='img-container'>
        <img className= "header-pic" src= {`${data.hdurl}`} alt='pic of the day'/>
        </div>
        {/* <DetailsPageHeader
            data={data}
        /> */}
        <br/>
        
        <Link className="details-link" to={"/daily-details"} > See Details </Link>
       

        </div>
        
        }
       
        <DailyFavoritesButton  data={data} user={user} />
       
        </div>

    )
}

export default Header


    