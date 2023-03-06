import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Button from "../components/Button";
import Input from "../components/Input";
import { register, userErrors, userMessage } from "../redux/userSlice";

const Register =()=>{
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [disabled, setDisabled] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handeRegister = async () => {
        let res = await dispatch(register({ email, password, firstName, lastName }));
        if (res) {
            console.log(res);
            // navigate("/");
        }
    };
    useEffect(()=>{
        dispatch(userMessage())
        dispatch(userErrors())
        if(email && password && passwordConfirm && firstName && lastName && (password === passwordConfirm)){
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [email, password, passwordConfirm, firstName, lastName])
    const { errors, message, loading } = useSelector((state) => state.user);
    if(localStorage.getItem("token")){
        navigate("/");
    }
    return <div className="login-wrapper">
        <div className="content">
            <Input label="Email" type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <Input label="First Name" type="text" name="given-name" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
            <Input label="Last Name" type="text" name="family-name" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
            <Input label="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <Input label="Password Confirm" type="password" value={passwordConfirm} onChange={(e)=>setPasswordConfirm(e.target.value)}/>
            <div  style={{margin: 'auto'}}>{loading ? <ClipLoader color="#1e96fc" size={32} /> :
            <div className="controls">
                {message && <p className="error-message">{message}</p>}
                <Button disabled={disabled} onClick={handeRegister}>Register</Button>
            </div>
            }</div> 
            <p>Already have an account? <Link to={'/login'}>Login</Link></p>
        </div>
    </div>
}

export default Register