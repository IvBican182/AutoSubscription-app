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


interface AuthResponse {
    user: any;
    
}
// interface ErrorPayload {
//     message: string;
// }

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

export const changeUserData = createAsyncThunk<any,{ userId: any; formData: any }>("api/changeUserData", async({ userId, formData }) => {
    try {
        const response = await fetch(`http://localhost:3050/api/profile/update/${userId}`, {
            method: "PUT",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(formData)
        });
        const userData = await response.json();
        console.log(userData);
        return userData;
    }
    catch (error){
        throw new Error("failed to change data");

    }
    
})

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
        .addCase(changeUserData.fulfilled, (state, action) => {
            state.user = action.payload.user
        })
    }

});

export default userSlice.reducer;