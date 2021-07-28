import React from "react"
import { Link } from "react-router-dom"
import Search from "../components/Search"
 
export default function DetailsPageHeader(props){
    
    const {data} = props
    console.log(props, "linea 8")

    return(
      
        <div>
        
        {
        data && 
        <div className="img-detail">
            <img src={data.hdurl} alt="today-img"/>

            <div className="detail-title">
                <p className="detail-title">{data.title}</p>
            </div>
        
            <div className="detail-line-1">
            <p className="detail-explanation">{data.explanation}</p>
            </div>
            <div className="detail-line-2">
                <p className="detail-tagline">{data.date}</p>
            </div>
        </div>
        }
        
        <Search/>
        </div>
    )
    
}