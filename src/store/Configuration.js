import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isDark: false,
  theme: 'default',
  storeLanguage: 'en',
};

const slice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    changeIsDark: (state, action) => {
      state.isDark = !state.isDark;
    },
    setTheme: (state, action) => {
      state.theme = action.payload.theme;
    },
    setStoreLanguage: (state, action) => {
      state.storeLanguage = action.payload.language;
    },
  },
});

export const {changeIsDark, setTheme, setStoreLanguage} = slice.actions;
export default slice.reducer;
