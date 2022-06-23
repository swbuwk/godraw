import { combineReducers, configureStore } from "@reduxjs/toolkit"
import canvasSlice from "./reducers/canvasSlice"
import toolSlice from "./reducers/toolSlice"

const rootReducer = combineReducers({
    canvas: canvasSlice,
    tool: toolSlice
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['canvas/setCanvas', "tool/setTool"],
        ignoredPaths: ['canvas.canvas', 'tool.tool'],
      },
    }),
})
