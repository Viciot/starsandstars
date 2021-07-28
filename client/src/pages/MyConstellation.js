import React, { useEffect, useState } from 'react'
import { arrayOfFavorites, deleteFavorite } from '../services/favorites';
import { Link } from "react-router-dom";



export default function MyConstellation(props) {

    console.log(props, "linea 9, myconstellation")

    const [favoritesArray, setFavoritesArray] = useState([])
    const [deleteFavsArray, setDeleteFavsArray] = useState([])
    const { setSelectedPic } = props



    let Id = null
    
    if(props.user){
        Id = props.user._id
    }
        
    function handleFav(){

        arrayOfFavorites(Id)
        .then((res)=>{
        const array = res.data
        setFavoritesArray(array)               
        })  
    }


    function handleDelete(fecha){
        deleteFavorite(Id, fecha)
        .then(res=>handleFav())
    }

    useEffect(()=>{
        handleFav()
    }, [])

    

    return (
        <div>
            {favoritesArray.map((element)=>{
                return(
                    <div key={element.url}>
                        <img src={element.hdurl} alt="card-detail-img"/>

                        <div className="detail-title">
                            <p className="detail-title">{element.title}</p>
                        </div>

                        <div className="detail-line-1">
                            <p className="detail-explanation">{element.explanation} </p>
                        </div>

                        <div className="detail-line-2">
                            <p className="detail-tagline">{element.date}</p>
                        </div>
                        <Link to={"/details"} onClick={()=>setSelectedPic(element)}>
                        <p>See details</p>
                        </Link>
                        <button onClick={()=>handleDelete(element.date)} >
                        Delete
                        </button>
                    </div>
                )
                
            }) 
            }      
        </div>
    )
    
}