import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/userSlice";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    if (!localStorage.getItem("token")) {
        console.log('redirect to login');
        return <Navigate replace to="/login" />;
    } else if (!user) {
        console.log('get user');
        dispatch(getUser());
    }
    return (
        <div>
            {!user ? <div className="dashboard-loading">
                <ClipLoader color="#1e96fc" size={64} />
            </div> :
            <div className="dashboard-wrapper">
                <Toaster />
                <Outlet />
            </div>}
        </div>
    );
}

export default Dashboard