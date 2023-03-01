import React from "react";
import { useSelector } from "react-redux";

const Overview=()=>{
    const {user} = useSelector(state=>state.user)
    return <div>
        <h4>Dobrodošli {user?.firstName} {user?.lastName}</h4>
    </div>
}
export default Overview