import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const savedGroupTasks = JSON.parse(localStorage.getItem("groupTasks")) || {};

const groupTaskSlice = createSlice({
  name: "groupTasks",
  initialState: savedGroupTasks,
  reducers: {
    addGroupTask: (state, action) => {
      const { groupName, memberId, memberName, date, text, time, priority } = action.payload;

      const newTask = {
        id: uuidv4(),
        memberId,
        memberName,
        date,
        text,
        time,
        priority,
        completed: false,
      };

      if (!state[groupName]) {
        state[groupName] = { members: {} };
      }

      if (!state[groupName].members[memberId]) {
        state[groupName].members[memberId] = [];
      }

      state[groupName].members[memberId].push(newTask);

      localStorage.setItem("groupTasks", JSON.stringify(state));
    },

    updateGroupTask: (state, action) => {
      const { groupName, memberId, taskId, updatedTask } = action.payload;

      const tasks = state[groupName]?.members?.[memberId];
      if (tasks) {
        const idx = tasks.findIndex((t) => t.id === taskId);
        if (idx !== -1) {
          tasks[idx] = { ...tasks[idx], ...updatedTask }; // ✅ merge updated fields
        }
      }

      localStorage.setItem("groupTasks", JSON.stringify(state));
    },

    toggleGroupComplete: (state, action) => {
      const { groupName, memberId, taskId } = action.payload;
      const tasks = state[groupName]?.members?.[memberId];
      if (tasks) {
        const task = tasks.find((t) => t.id === taskId);
        if (task) {
          task.completed = !task.completed;
        }
      }
      localStorage.setItem("groupTasks", JSON.stringify(state));
    },

    deleteGroupTask: (state, action) => {
      const { groupName, memberId, taskId } = action.payload;
      const tasks = state[groupName]?.members?.[memberId];
      if (tasks) {
        state[groupName].members[memberId] = tasks.filter((t) => t.id !== taskId);
      }
      if (state[groupName] && Object.keys(state[groupName].members).length === 0) {
        delete state[groupName];
      }
      localStorage.setItem("groupTasks", JSON.stringify(state));
    },
  },
});

export const { addGroupTask, updateGroupTask, toggleGroupComplete, deleteGroupTask } =
  groupTaskSlice.actions;

export default groupTaskSlice.reducer;
