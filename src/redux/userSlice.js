import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: { user: null, errors: null, message: null, loading: false },
    reducers: {
        userSuccess: (state, action) => {
            state.user = action.payload;
        }, 
        userErrors: (state, action) => {
            state.errors = action.payload;
        },
        userMessage: (state, action) => {
            state.message = action.payload;
        },
        userLoading: (state, action) =>{
            state.loading = action.payload
        },
        logoutReducer: (state, action) => {
            state.user = null;
            localStorage.removeItem("token");
        },
    },
});

export const register = ({email, password, firstName, lastName}) => async (dispatch) => {
    try {
        dispatch(userLoading(true))
        let res = await fetch(`${process.env.REACT_APP_API}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ email, firstName, lastName, password }),
        });

        let data = await res.json();
        console.log(data);
        dispatch(userErrors(null));
        dispatch(userMessage(null));
        if (data?.errors) {
            dispatch(userErrors(data.errors));
        }
        if (data?.message) {
            dispatch(userMessage(data.message));
        }
        dispatch(userLoading(false))
        if (data?.token && data?.data && data.data != null) {
            localStorage.setItem("token", data.token);
            dispatch(userSuccess(data.data));
            return true;
        }
    } catch (e) {
        dispatch(userLoading(false))
        dispatch(userMessage(e.message))
        return console.log(e);
    }
}

export const login = ({ email, password }) => async (dispatch) => {
    try {
        dispatch(userLoading(true))
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
        dispatch(userErrors(null));
        dispatch(userMessage(null));
        if (data?.errors) {
            dispatch(userErrors(data.errors));
        }
        if (data?.message) {
            dispatch(userMessage(data.message));
        }
        dispatch(userLoading(false))
        if (data?.token && data?.data && data.data != null) {
            localStorage.setItem("token", data.token);
            dispatch(userSuccess(data.data));
            return true;
        }
    } catch (e) {
        dispatch(userLoading(false))
        dispatch(userMessage(e.message))
        return console.log(e);
    }
};

export const getUser = () => async (dispatch) => {  
    try {
        dispatch(userLoading(true))
        let res = await fetch(`${process.env.REACT_APP_API}/auth/auto_login`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        if(res && res.status === 200){
            let data = await res.json();
            dispatch(userSuccess(data.data))
            dispatch(userMessage(data.message))
            dispatch(userLoading(false))
            if (data.success === true) {
                return false;
            }
        } else {
            dispatch(userLoading(false))
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
        dispatch(userErrors(null));
        dispatch(userMessage(null));
        if (dd?.errors) {
            dispatch(userErrors(dd.errors));
            return false
        }
        if (dd?.message) {
            dispatch(userMessage(dd.message));
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

export const { userSuccess, logoutReducer, userErrors, userMessage, userLoading } = userSlice.actions;
export default userSlice.reducer;
