import { createSlice } from "@reduxjs/toolkit";

export type DemoStateType = {
    count: number;
}

const initialData: DemoStateType = {count: 0};

const demoSlice = createSlice({
    name: "demo",
    initialState: initialData,
    reducers: {
        increase(state, action){
            state.count = state.count + 1
            return state;
        }
    }
})

const { actions, reducer} = demoSlice;
export const { increase } = actions;
export const demoReducer = reducer;
export default demoSlice;