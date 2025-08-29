import { createSlice } from "@reduxjs/toolkit";

const savedTasks = JSON.parse(localStorage.getItem("tasks")) || {};

const taskSlice = createSlice({
  name: "tasks",
  initialState: savedTasks, // {date: [tasks]}
  reducers: {
    addTask: (state, action) => {
      const { date, text, time } = action.payload;
      const newTask = { text, time, completed: false };

      if (!state[date]) {
        state[date] = [];
      }
      state[date].push(newTask);
      localStorage.setItem("tasks", JSON.stringify(state));
    },

    toggleComplete: (state, action) => {
      const { date, index } = action.payload;
      state[date][index].completed = !state[date][index].completed;
      localStorage.setItem("tasks", JSON.stringify(state));
    },

    deleteTask: (state, action) => {
      const { date, index } = action.payload;
      state[date].splice(index, 1);
      if (state[date].length === 0) {
        delete state[date]; // remove empty date
      }
      localStorage.setItem("tasks", JSON.stringify(state));
    },
  },
});

export const { addTask, toggleComplete, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
