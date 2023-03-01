import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: { user: null, errors: null, message: null, loading: false },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
        }, 
        loginErrors: (state, action) => {
            state.errors = action.payload;
        },
        loginMessage: (state, action) => {
            state.message = action.payload;
        },
        loginLoading: (state, action) =>{
            state.loading = action.payload
        },
        logoutReducer: (state, action) => {
            state.user = null;
            localStorage.removeItem("token");
        },
    },
});

export const login = ({ email, password }) => async (dispatch) => {
    try {
        dispatch(loginLoading(true))
        let res = await fetch(`${process.env.REACT_APP_API}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ email: email, password: password }),
        });

        let data = await res.json();
        console.log(data);
        dispatch(loginErrors(null));
        dispatch(loginMessage(null));
        if (data?.errors) {
            dispatch(loginErrors(data.errors));
        }
        if (data?.message) {
            dispatch(loginMessage(data.message));
        }
        dispatch(loginLoading(false))
        if (data?.token && data?.data && data.data != null) {
            localStorage.setItem("token", data.token);
            dispatch(loginSuccess(data.data));
            return true;
        }
    } catch (e) {
        dispatch(loginLoading(false))
        dispatch(loginMessage(e.message))
        return console.log(e);
    }
};

export const getUser = () => async (dispatch) => {  
    try {
        dispatch(loginLoading(true))
        let res = await fetch(`${process.env.REACT_APP_API}/auth/auto_login`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        console.log(res);
        if(res.status === 200){
            let data = await res.json();
            dispatch(loginSuccess(data.data))
            dispatch(loginMessage(data.message))
            dispatch(loginLoading(false))
            if (data.success === true) {
                return false;
            }
        } else {
            dispatch(loginLoading(false))
            localStorage.removeItem("token")
            window.location.pathname = "/login"
        }
    } catch (e) {
        localStorage.removeItem("token")
        console.log(e);
    }
};

export const updateUser=(data)=>async (dispatch) =>{
    try {
        let res = await fetch(`${process.env.REACT_APP_API}/update-user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(data),
        });
        let dd = await res.json();
        dispatch(loginErrors(null));
        dispatch(loginMessage(null));
        if (dd?.errors) {
            dispatch(loginErrors(dd.errors));
            return false
        }
        if (dd?.message) {
            dispatch(loginMessage(dd.message));
        }
        return true
    } catch (e) {
        console.log(e);
    }
}

export const deleteUser=async (id)=>{
    console.log(id);
    try {
        let res = await fetch(`${process.env.REACT_APP_API}/delete-user/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return res
    } catch (e) {
       return console.log(e);
    }
}

export const { loginSuccess, logoutReducer, loginErrors, loginMessage, loginLoading } = userSlice.actions;
export default userSlice.reducer;
