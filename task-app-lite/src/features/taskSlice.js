import { createSlice } from "@reduxjs/toolkit";
import { updateTaskOrder } from "../api/index";

const sortTasks = (tasks, order) => {
  const sortedTasks = [];
  order.map((el, i) => {
    sortedTasks[i] = tasks.filter((t) => t.pos === el)[0];
  });
  return sortedTasks;
};

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  },
  reducers: {
    loadData: (state, action) => {
      if (action.payload.length > 0) {
        const taskOrder = JSON.parse(localStorage.getItem("taskOrder"));
        if (taskOrder.length > 0) {
          const sortedTasks = sortTasks(action.payload, taskOrder);
          state.tasks = [...sortedTasks];
          localStorage.setItem("tasks", JSON.stringify(sortedTasks));
        } else {
          state.tasks = [...action.payload];
          localStorage.setItem("tasks", JSON.stringify(action.payload));
        }
      } else {
        localStorage.removeItem("tasks");
      }
    },
    updateList: (state, action) => {
      state.tasks = [...action.payload];
      const taskOrder = action.payload.map((el) => {
        return el.pos;
      });
      const id = JSON.parse(localStorage.getItem("userData")).id;
      updateTaskOrder(id, { taskOrder }).catch((err) => console.log(err));
      localStorage.setItem("taskOrder", JSON.stringify([...taskOrder]));
      localStorage.setItem("tasks", JSON.stringify(action.payload));
    },
    addTask: (state, action) => {
      state.tasks = [action.payload, ...state.tasks];
	  const taskOrder = JSON.parse(localStorage.getItem("taskOrder"));
	  taskOrder.unshift(state.tasks.length)
	  localStorage.setItem("taskOrder", JSON.stringify([...taskOrder]));
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    clearAllTasks: (state) => {
      state.tasks = [];
      localStorage.removeItem("tasks");
    },
    removeTask: (state, action) => {
	  const pos=state.tasks.filter(t=>t.id===action.payload).pos;
	  const taskOrder = JSON.parse(localStorage.getItem("taskOrder"));
	  taskOrder.splice(taskOrder.indexOf(pos),1)
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
	  localStorage.setItem("taskOrder", JSON.stringify([...taskOrder]));
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
    updateTask: (state, action) => {
      let index = 0;
      const remainingTask = state.tasks.filter((task, i) => {
        if (task?._id2 && task._id2 === action.payload._id2) {
          index = i;
        }
        return task?._id2 !== action.payload._id2;
      });
      const payloadtask = action.payload;
      delete payloadtask._id2;
      remainingTask.splice(index, 0, payloadtask);
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
  updateTask,
} = taskSlice.actions;

export const selectTask = (state) => state.task.tasks;

export default taskSlice.reducer;
