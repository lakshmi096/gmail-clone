import { configureStore } from '@reduxjs/toolkit';
import mailReducer from '../features/mailSlice';
import authReducer from '../features/authSlice';
import appReducer from '../features/appSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    mail: mailReducer,
    app: appReducer,
  },
});
