import React from "react";

const Input=(props)=>{
    return <div className="input-field-wrapper">
        {props.label && <p>{props.label}</p>}
        <input {...props} />
    </div>
}
export default Input