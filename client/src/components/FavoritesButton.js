import React from 'react'
import { constellation } from '../services/favorites'
import { toast } from "react-toastify"


export default function FavoritesButton(props){

    const { selectedPic } = props;
    let Id 
    if(props.user){
      Id = props.user._id
    }
    console.log(Id)
    
    function handleSave(){
          constellation(Id, selectedPic)
          .then((res)=>{
          toast("You added it!")              
          console.log(res)
        })
      }
      
    
    
    
    return(
    <div> 
      <button className= "form-btn" onClick={handleSave}>
      Add to My Constellation
      </button>
    </div>
    )
    }