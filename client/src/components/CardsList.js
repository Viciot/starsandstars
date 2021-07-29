import React from "react";
import {Link} from "react-router-dom";
import Card from '../pages/Card'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import FavoritesButton from "./FavoritesButton";


function CardsList(props){
    const { data, setSelectedPic, user } = props
  
    const arrayWithoutVideos = data.filter(item=>!item.url.includes('youtube')  && !item.url.includes('vimeo') && !item.url.includes('ustream'))

    return(
        <div className= "gallery-container">
            
            {arrayWithoutVideos.map((onePic)=>{
        

                return(
                    <div className='gallery-div'>
                    <Zoom>
                       <img className='gallery-img' src={onePic.url} alt={"card-detail-img"}/>
                     </Zoom>
                     <Link className='details-link' to={"/details"} onClick={()=>setSelectedPic(onePic)}>
                       <p>See details</p>
                     </Link>
                     {user &&

                     <FavoritesButton  selectedPic={onePic} user={user} />
                     }
                     </div>
                    )
                    
            })
            }
            
        </div>
    )
}


export default CardsList