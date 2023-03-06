import React, { useEffect, useState } from "react";

const colors=[
    {
        min:-100,
        max:10,
        color: "#0072C6"
    },
    {
        min:10,
        max:15,
        color: "#2EB8C0"
    },
    {
        min:15,
        max:18,
        color: "#6DBC49"
    },
    {
        min:18,
        max:20,
        color: "#E6D43F"
    },
    {
        min:20,
        max:23,
        color: "#F7941E"
    },
    {
        min:23,
        max:27,
        color: "#ED1C24"
    },
    {
        min:27,
        max:30,
        color: "#B9121B"
    },
    {
        min:30,
        max:100,
        color: "#0072C6"
    },
]
const Room =({room})=>{
    let temperature = 22
    const [color, setColor] = useState()
    useEffect(()=>{
        setColor(colors.find((c) => temperature >= c.min && temperature < c.max))
    }, [temperature])
    return <div className="room-wrapper">
        <h4>{room?.title}</h4>
        <div className="room" style={{height:room.xAxis, width: room.yAxis, backgroundColor: color ? color.color : "white"}}>
            <div className="temperature">
                {temperature && temperature}
            </div>
        </div>
    </div>
}
export default Room