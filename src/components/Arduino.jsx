import { HubConnectionBuilder } from "@microsoft/signalr";
import React, { useEffect, useState } from "react";
import Input from "./Input";

const Arduino=()=>{
    const [temp, setTemp]=useState(10)
    const handleTemp= async ()=>{
        try {
            let res = await fetch(`${process.env.REACT_APP_API}/api/Room/update_temperature`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({Value: temp, Id:"test"}),
            });
            
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(()=>{
        handleTemp()
    },[temp])
    return<div style={{width:"200px"}}>
        <Input type="number" value={temp} onChange={(e)=>{setTemp(e.target.value)}}/>

    </div>
}
export default Arduino