import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import Button from "../components/Button";
import Room from "../components/Room";
import AddRoomModal from "../modals/AddRoom";
import { getAllRooms } from "../redux/roomsSlice";

const Overview = () => {
    const { user } = useSelector(state => state.user)
    const [addRoomModal, setAddRoomModal] = useState(false)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllRooms())
    }, [])
    
    const { data, loading, errors, message } = useSelector(state => state.rooms)
    return <div className="overview-wrapper">
        <h4>Dobrodošli {user?.firstName} {user?.lastName}</h4>
        {loading && <ClipLoader color="#1e96fc" size={32} />}
        {message && <p className="error-message">{message}</p>}
        <div className="rooms">
        {data && data.length ? data.map((room, i)=>{
            return <Room key={room.id}room={room}/>
        }): !loading && <p>Currently no rooms.</p>}
        </div>
        <Button onClick={()=>{setAddRoomModal(true)}}>Add room</Button>
        {addRoomModal && <AddRoomModal close={()=>setAddRoomModal(false)}/>}
    </div>
}
export default Overview