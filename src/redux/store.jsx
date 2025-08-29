import { configureStore }  from "@reduxjs/toolkit"
import  userSlice  from "./slice"
import taskReducer from "./taskSlice"

export const store=configureStore({
  reducer:{
    users:userSlice,
    tasks:taskReducer


  }
})