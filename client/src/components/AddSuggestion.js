import React , { useState }from 'react'
import axios from 'axios'

{/* { title, description } */}

function AddSuggestion(props){

    const {user} = props

    const initialFormState = {name: '', comment: ''}

    const [formState, setFormState] = useState(initialFormState)

    function handleChange (event) {  
        const {name, value} = event.target;
        setFormState({...formState, [name]: value});

        /*
          If you type "a" in the title input,
          name = "title", value = "a"
          setFormState({
            ...forState,
            "title": value
          })
        */
    }

    function handleFormSubmit(event){
        event.preventDefault()
        const {name, comment} = formState

        axios.post('http://localhost:5005/api/suggestions', {name, comment, user: user._id})
        .then(setFormState(initialFormState))
        .catch(err=>console.log(err))
    }

    return (
        <div>
        <form className="form-stars"  onSubmit={handleFormSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={formState.name} onChange={ e => handleChange(e)}/>
          <label>Make a suggestion:</label>
          <textarea name="comment" value={formState.comment} onChange={ e => handleChange(e)} />
          
          <input className='form-btn' type="submit" value="Submit" />
        </form>
      </div>
    )
}

export default AddSuggestion
