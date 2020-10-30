import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import taskReducer from '../features/taskSlice';
import userReducer from '../features/userSlice';


export default configureStore({
  reducer: {
    counter: counterReducer,
    task:taskReducer,
    user:userReducer
  },
});
