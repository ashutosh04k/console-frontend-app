import { configureStore } from "@reduxjs/toolkit"
import authReducer from './auth-slice/authslice';



const store = configureStore({
  reducer : {
    auth : authReducer
  }
})

export default store ;