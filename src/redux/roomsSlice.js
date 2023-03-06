import { createSlice } from "@reduxjs/toolkit";

const roomsSlice = createSlice({
    name: "rooms",
    initialState: { data: null, errors: null, message: null, loading: false },
    reducers: {
        roomsSuccess: (state, action) => {
            state.data = action.payload;
        }, 
        roomsErrors: (state, action) => {
            state.errors = action.payload;
        },
        roomsMessage: (state, action) => {
            state.message = action.payload;
        },
        roomsLoading: (state, action) =>{
            state.loading = action.payload
        },
    },
});

export const getAllRooms = () => async (dispatch) => {
    try {
        dispatch(roomsLoading(true))
        let res = await fetch(`${process.env.REACT_APP_API}/api/Room/all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });

        let data = await res.json();
        console.log(data);
        dispatch(roomsErrors(null));
        dispatch(roomsMessage(null));
        if (data?.errors) {
            dispatch(roomsErrors(data.errors));
        }
        if (data?.message) {
            dispatch(roomsMessage(data.message));
        }
        dispatch(roomsLoading(false))
        if (data?.data && data.data != null) {
            dispatch(roomsSuccess(data.data));
            return true;
        }
    } catch (e) {
        dispatch(roomsLoading(false))
        dispatch(roomsMessage(e.message))
        return console.log(e);
    }
};

export const { roomsErrors, roomsLoading, roomsMessage, roomsSuccess } = roomsSlice.actions;
export default roomsSlice.reducer;