import React from 'react'
import { toast } from 'react-toastify';
import App from '../App';
import { constellation } from '../services/favorites'




export default function DailyFavoritesButton(props){

const { data } = props;
console.log(data, "linea 11")
let Id 
if(props.user){
  Id = props.user._id
}
console.log(Id)

function handleSave(){
  
    constellation(Id, data)
    .then((res)=>{
      toast("You added it!")
      console.log(res)
    })

}


return(
<div> 
  <button className="form-btn" onClick={handleSave}>
  Add to My Constellation
  </button>
</div>
)
}