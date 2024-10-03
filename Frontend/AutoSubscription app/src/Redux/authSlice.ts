import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


import { SignUpFormData, LoginFormData } from "../interfaces/interfaces";
import { PayloadAction } from "@reduxjs/toolkit";


//auth state interface
interface AuthState {
    user: any | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
};

//response interface, this will be returned by our thunks
interface AuthResponse {
    user: any;
    token: string;
}

//initial state
const initialState: AuthState = {
    user: null,
    token: null,
    isLoading: false,
    error: null,
};

//error interface
interface ErrorPayload {
    message: string;
}

//user sign up thunk, it takes our formData form user inputs and sends it to backend
export const userSignUp = createAsyncThunk<AuthResponse, SignUpFormData>("auth/signUp", async(formData,thunkAPI) => {
    try {
        const response = await fetch("http://localhost:3050/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
       });
   
       const data = await response.json();
       console.log(data);
       //returns our user data and token
       return data;
    } 
    catch (error){
        return thunkAPI.rejectWithValue(error);
    }
});

//user login thunk, sends formData (e-mail and password) to backend
export const userLogin = createAsyncThunk<AuthResponse, LoginFormData>("auth/login", async(formData,thunkAPI) => {
    try {
        const response = await fetch("http://localhost:3050/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
       });
   
       const data = await response.json();
       console.log(data);
       //returns user and token
       return data;
    } 
    catch (error){
        return thunkAPI.rejectWithValue(error);
    }
});

//thunk for updating user data, sends ID of user, new formData and current user token to backend. Token will be verified in backend
export const updateUserData = createAsyncThunk<any,{ userId: number; formData: any, token: any }>("api/changeUserData", async({ userId, formData, token }) => {

    try {

        const response = await fetch(`http://localhost:3050/api/profile/update/${userId}`, {
            method: "PUT",
            headers: { 
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify(formData)
        });
        //makes sure we send the token
        console.log(`Token: ${token}`)

        if (!response.ok) {
            throw new Error('Failed to update user data');
        }

        const userData = await response.json();
        console.log(userData);
        //returns new user data
        return userData;
    }
    catch (error){
        throw new Error("failed to change data");

    }
    
});

//authentication slice
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => { //logout user by removing user and token state
            state.user = null; //we will use this state to make sure the user is signed out if the token isn't present
            state.token = null;
          },
    },
    extraReducers(builder) {
        builder
        .addCase(userSignUp.pending, (state) => { 
            state.isLoading = true; //loading state while signin in our user
          })
        .addCase(userSignUp.fulfilled, ( state, action: PayloadAction<{ user: any, token: string }>) => {
            state.isLoading = false; //if signed in , our loading state is finished
            state.user = action.payload.user; //set the user state to returned user
            state.token = action.payload.token; //set token state to our returned token
        })
        .addCase(userSignUp.rejected, (state, action) => {
            state.isLoading = false; //loading state is finished upon rejection
            const errorPayload = action.payload as ErrorPayload; 
            state.error = errorPayload?.message || action.error.message || 'Failed to sign up'; //set state error to an error message
          })
        .addCase(userLogin.fulfilled, (state, action: PayloadAction<{ user: any, token: string }>) => {
            state.isLoading = false; //works the same as signin in
            state.token = action.payload.token
            state.user = action.payload.user

        })
        .addCase(updateUserData.fulfilled, (state, action: PayloadAction<{ user: any, token: string }>) => {
            state.user = action.payload.user //set the user state to updated user
            
        })
    },

});

export default authSlice.reducer;
export const { logout } = authSlice.actions;



