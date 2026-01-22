import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Language: 'ENG',
  DarkMode: false,
  isSidebarOpen: true,
};

const WebState = createSlice({
  name: 'webState',
  initialState,
  reducers: {
    ChangeLanguage: (state, action) => {
      state.Language = action.payload;
    },
    ToggleDarkMode: (state) => {
      state.DarkMode = !state.DarkMode;
    },
    SetSidebarStatus: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
    ToggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    }
  }
});

export const { 
  ChangeLanguage, 
  ToggleDarkMode, 
  SetSidebarStatus, 
  ToggleSidebar 
} = WebState.actions;

export default WebState.reducer;