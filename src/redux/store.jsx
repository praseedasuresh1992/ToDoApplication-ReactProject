import { configureStore }  from "@reduxjs/toolkit"
import  userSlice  from "./slice"
import groupTaskReducer from "./GroupTaskSlice"
import taskReducer from "./taskSlice"
import  feedbackReducer from "./FeedbackSlice"

export const store=configureStore({
  reducer:{
    users:userSlice,
    tasks:taskReducer,
    groupTasks:groupTaskReducer,
    feedback: feedbackReducer,


  }
})