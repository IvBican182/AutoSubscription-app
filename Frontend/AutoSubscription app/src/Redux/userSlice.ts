import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../interfaces/interfaces";


interface userState {
    users: any[];
    user: any;
    isLoading: boolean;
    error: string | null;
};

const initialState : userState = {
    users: [],
    user: {},
    isLoading: false,
    error: null,

};



export const fetchUsers = createAsyncThunk<User[]>("api/users", async() => {
    const response = await fetch("http://localhost:3050/api/users");
    const data = await response.json();
    console.log(data);
    return data.users;

});

export const fetchSingleUser = createAsyncThunk<any, number>("api/singleUser", async( userId:any ) => {
    const response = await fetch(`http://localhost:3050/api/profile/${userId}`);
    const userData = await response.json();
    console.log(userData);
    return userData.user;


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
        .addCase(fetchSingleUser.fulfilled, (state, action) => {
            state.user = action.payload
        })
        
    }
});

export default userSlice.reducer;