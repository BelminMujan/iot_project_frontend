import { configureStore } from '@reduxjs/toolkit'
import roomsSlice from './redux/roomsSlice'
import userSlice from './redux/userSlice'

export default configureStore({
  reducer: {
    user: userSlice,
    rooms: roomsSlice
  },
})