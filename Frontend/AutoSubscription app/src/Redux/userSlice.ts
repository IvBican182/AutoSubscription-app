import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../interfaces/interfaces";


interface userState {
    users: any[];
    isLoading: boolean;
    error: string | null;
};

const initialState : userState = {
    users: [],
    isLoading: false,
    error: null,

};



// interface ErrorPayload {
//     message: string;
// }

export const fetchUsers = createAsyncThunk<User[]>("api/users", async() => {
    const response = await fetch("http://localhost:3050/api/users");
    const data = await response.json();
    console.log(data);
    return data.users;

});

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload
        })
    }

});

export default userSlice.reducer;