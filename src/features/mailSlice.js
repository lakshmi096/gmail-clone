import { createSlice } from '@reduxjs/toolkit';

export const mailSlice = createSlice({
  name: 'mail',
  initialState: {
    isComposeMailOpen: false,
    openedMail: null,
    mailType: 'primary',
    totalMailCount: null,
    draft: null
  },
  reducers: {
    openComposeMail: state => {
      state.isComposeMailOpen = true;
    },
    closeComposeMail: state => {
      state.isComposeMailOpen = false;
    },
    setOpenedMail: (state, action) => {
      state.openedMail = action.payload;
    },
    setMailType: (state, action) => {
      state.mailType = action.payload;
    },
    setTotalMailCount: (state, action) => {
      state.totalMailCount = action.payload;
    },
    setDraft: (state, action) => {
      state.draft = action.payload;
    }
  },
});

export const { 
  openComposeMail, 
  closeComposeMail, 
  setOpenedMail, 
  setMailType,
  setTotalMailCount,
  setDraft } = mailSlice.actions;

export const selectIsComposeMailOpen = state => state.mail.isComposeMailOpen;
export const selectOpenedMail = state => state.mail.openedMail;
export const selectMailType = state => state.mail.mailType;
export const selectTotalMailCount = state => state.mail.totalMailCount;
export const selectDraft = state => state.mail.draft;

export default mailSlice.reducer;
