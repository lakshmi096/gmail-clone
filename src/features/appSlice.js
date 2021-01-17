import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    isSidebarOpen: true
  },
  reducers: {
    toggleSidebarStatus: state => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const { toggleSidebarStatus } = appSlice.actions;

export const selectIsSidebarOpen = state => state.app.isSidebarOpen;

export default appSlice.reducer;
