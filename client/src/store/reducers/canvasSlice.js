import { createSlice } from "@reduxjs/toolkit"

export const canvasSlice = createSlice({
    name: "canvas",
    initialState: {
        canvas: null,
    },
    reducers: {
        setCanvas(state, action) {
            state.canvas = action.payload
        },
    }
})

export default canvasSlice.reducer
export const {setCanvas} = canvasSlice.actions