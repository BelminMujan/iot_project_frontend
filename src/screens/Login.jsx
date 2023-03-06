import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Button from "../components/Button";
import Input from "../components/Input";
import { login, userErrors, userMessage } from "../redux/userSlice";

const Login =()=>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogin = async () => {
        let res = await dispatch(login({ email: email, password: password }));
        if (res) {
            console.log(res);
            navigate("/");
        }
    };
    useEffect(()=>{
        dispatch(userMessage())
        dispatch(userErrors())
    }, [email, password])
    const { errors, message, loading } = useSelector((state) => state.user);
    if(localStorage.getItem("token")){
        navigate("/");
    }
    return <div className="login-wrapper">
        <div className="content">
            <Input label="Email" type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <Input label="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <div  style={{margin: 'auto'}}>{loading ? <ClipLoader color="#1e96fc" size={32} /> :
            <div className="controls">
                {message && <p className="error-message">{message}</p>}
                <Button onClick={handleLogin}>Login</Button>
            </div>
            }</div> 
            <p>Don't have an account? <Link to={'/register'}>Crate one</Link></p>
        </div>
    </div>
}

export default Login