import React, { useEffect, useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr"
import Input from "./Input";
import { updateRoom } from "../api/room";
const colors = [
    {
        min: -100,
        max: 10,
        color: "#0072C6"
    },
    {
        min: 10,
        max: 15,
        color: "#2EB8C0"
    },
    {
        min: 15,
        max: 18,
        color: "#6DBC49"
    },
    {
        min: 18,
        max: 20,
        color: "#E6D43F"
    },
    {
        min: 20,
        max: 23,
        color: "#F7941E"
    },
    {
        min: 23,
        max: 27,
        color: "#ED1C24"
    },
    {
        min: 27,
        max: 30,
        color: "#B9121B"
    },
    {
        min: 30,
        max: 100,
        color: "#0072C6"
    },
]
const Room = ({ room, isEdit }) => {
    const [temperature, setTemperature] = useState(0)
    const [color, setColor] = useState()
    const [roomStyle, setRoomStyle] = useState({ height: room.xAxis, width: room.yAxis})
    const [_room, setRoom] = useState({...room})
    useEffect(() => {
        const token = "Bearer "+localStorage.getItem("token");
        const connection = new HubConnectionBuilder()
            .withUrl("http://localhost:5164/temperatureHub", {
                headers:{
                    "Authorization": token
                }
            })
            .build();
        connection.on("TemperatureUpdate", (temp) => {
            setTemperature(temp);
        });
        connection.start();
        return () => {
            connection.stop();
        };
    }, []);
    useEffect(() => {
        console.log(temperature);
        setColor(colors.find((c) => temperature >= c.min && temperature < c.max))
    }, [temperature])

    useEffect(()=>{
        if(isEdit === false)
            updateRoom(_room)
    },[isEdit])

    const handleUpdate=(value, key)=>{
        let temp = _room
        temp[key] = value
        setRoom({...temp})
        setRoomStyle({ height: temp.xAxis, width: temp.yAxis})
    }
    return <div className="room-wrapper">
        {isEdit?
            <div className="edit">
                <Input value={_room?.title} onChange={(e)=>handleUpdate(e.target.value, "title")} label={"Title"} />
                <Input type="number" value={_room.xAxis} onChange={(e)=>handleUpdate(e.target.value, "xAxis")} label={"X Axis"} />
                <Input type="number" value={_room.yAxis} onChange={(e)=>handleUpdate(e.target.value, "yAxis")} label={"Y Axis"} />
            </div>
        :<h4>{_room?.title}</h4>}
        <div className="room" style={{ backgroundColor: color ? color.color : "white", ...roomStyle}}>
            <div className="temperature">
                {temperature && temperature}
            </div>
        </div>
    </div>
}
export default Room