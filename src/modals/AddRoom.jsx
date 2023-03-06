import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import { createRoom } from "../api/room";
import Button from "../components/Button";
import Input from "../components/Input";
import Modal from "../components/Modal";
import { roomsSuccess } from "../redux/roomsSlice";

const AddRoomModal = (props) => {
    const [title, setTitle] = useState("")
    const [xAxis, setxAxis] = useState(0)
    const [yAxis, setyAxis] = useState(0)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const handleSubmit = () => {
        setLoading(true)
        createRoom(title, xAxis, yAxis, false).then(res => {
            console.log(res);
            dispatch(roomsSuccess(res.data))
            setLoading(false)
            props.close && props.close()
        })
    }
    return <Modal close={() => props.close()}>
        <h4>New room</h4>
        <Input type="text" label="Room Title" value={title} onChange={(e) => setTitle(e.target.value)}></Input>
        <Input type="number" label="Room X (in centimeters)" value={xAxis} onChange={(e) => setxAxis(e.target.value)}></Input>
        <Input type="number" label="Room Y (in centimeters)" value={yAxis} onChange={(e) => setyAxis(e.target.value)}></Input>
        {loading ?
            <ClipLoader color="#1e96fc" size={32} /> :
            <Button onClick={handleSubmit}>Add</Button>}
    </Modal>
}

export default AddRoomModal