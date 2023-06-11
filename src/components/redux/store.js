import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./actions/reducer/userReducer";

const Store = configureStore({
    reducer: {
        userReducer: userReducer,
    }
})

export default Store;