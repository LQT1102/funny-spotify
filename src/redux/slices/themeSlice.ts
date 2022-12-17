import { createSlice } from "@reduxjs/toolkit";

export type ThemeStateType = {
    themeMode: "dark" | "light",
    themeConfig: any
}

const initialData: ThemeStateType = {themeMode : "dark", themeConfig: {}};

const themeSlice = createSlice({
    name: "theme",
    initialState: initialData,
    reducers: {
        updateToLightMode(state, action){
            state.themeMode = "light";
            state.themeConfig = action.payload;
            return state;
        },
        updateToDarkMode(state, action){
            state.themeMode = "dark";
            state.themeConfig = action.payload;
            return state;
        }
    }
})

const { actions, reducer} = themeSlice;
export const { updateToLightMode } = actions;
export const themeReducer = reducer;
export default themeSlice;