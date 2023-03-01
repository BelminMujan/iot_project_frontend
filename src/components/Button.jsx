import React from "react";

const Button=(props)=>{
    return <button type="button" className="button-wrapper" {...props}>{props?.children}</button>
}

export default Button