import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  },
  reducers: {
    loadData: (state, action) => {
      if (action.payload.length > 0) {
        state.tasks = [...action.payload];
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      } else {
        localStorage.removeItem("tasks");
      }
    },
    updateList: (state, action) => {
      state.tasks = [...action.payload];
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    addTask: (state, action) => {
      state.tasks = [...state.tasks, action.payload];
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    clearAllTasks: (state) => {
      state.tasks = [];
      localStorage.removeItem("tasks");
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    editTask: (state, action) => {
      let index = 0;
      const remainingTask = state.tasks.filter((task, i) => {
        if (task.id === action.payload.id) {
          index = i;
        }
        return task.id !== action.payload.id;
      });
      remainingTask.splice(index, 0, action.payload);
      state.tasks = [...remainingTask];
      const user = JSON.parse(localStorage.getItem("userData"));
      user.totalCompleted = state.tasks.filter((d) => d.isCompleted).length;
      localStorage.setItem("userData", JSON.stringify(user));
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
  },
});

export const {
  addTask,
  loadData,
  removeTask,
  editTask,
  updateList,
  clearAllTasks,
} = taskSlice.actions;

export const selectTask = (state) => state.task.tasks;

export default taskSlice.reducer;
