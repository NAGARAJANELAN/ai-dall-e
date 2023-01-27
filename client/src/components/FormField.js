import React from "react";
import './FormField.css'

const FormField=(props)=>{
    return(
        <>
            <input className="input-field" placeholder="name" type="text" name="name" onChange={props.chng}/>
            <br></br>
            <br></br>
            <input className="input-field" placeholder="Type something for DALL-E to draw" type="text" name="prompt" onChange={props.chng}/>
        </>
    )
}

export default FormField;