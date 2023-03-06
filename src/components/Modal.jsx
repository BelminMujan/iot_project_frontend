import React from "react";

const Modal =(props)=>{
    return <div className="modal-wrapper">
        <div className="backdrop" onClick={props?.close}></div>
        <div className="content">{props?.children}</div>
    </div>
}

export default Modal