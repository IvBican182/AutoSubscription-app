import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


import { SignUpFormData, LoginFormData } from "../interfaces/interfaces";
import { PayloadAction } from "@reduxjs/toolkit";



interface AuthState {
    user: any | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
};

interface AuthResponse {
    user: any;
    token: string;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isLoading: false,
    error: null,
};

interface ErrorPayload {
    message: string;
}

export const userSignUp = createAsyncThunk<AuthResponse, SignUpFormData>("auth/signUp", async(formData,thunkAPI) => {
    try {
        const response = await fetch("http://localhost:3050/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
       });
   
       const data = await response.json();
       console.log(data);
       return data;
    } 
    catch (error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const userLogin = createAsyncThunk<AuthResponse, LoginFormData>("auth/login", async(formData,thunkAPI) => {
    try {
        const response = await fetch("http://localhost:3050/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
       });
   
       const data = await response.json();
       console.log(data);
       return data;
    } 
    catch (error){
        return thunkAPI.rejectWithValue(error);
    }
});

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
        console.log(`Token: ${token}`)

        if (!response.ok) {
            throw new Error('Failed to update user data');
        }

        const userData = await response.json();
        console.log(userData);
        return userData;
    }
    catch (error){
        throw new Error("failed to change data");

    }
    
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
          },
    },
    extraReducers(builder) {
        builder
        .addCase(userSignUp.pending, (state) => {
            state.isLoading = true;
          })
        .addCase(userSignUp.fulfilled, ( state, action: PayloadAction<{ user: any, token: string }>) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
        })
        .addCase(userSignUp.rejected, (state, action) => {
            state.isLoading = false;
            const errorPayload = action.payload as ErrorPayload;
            state.error = errorPayload?.message || action.error.message || 'Failed to sign up';
          })
        .addCase(userLogin.fulfilled, (state, action: PayloadAction<{ user: any, token: string }>) => {
            state.isLoading = false;
            state.token = action.payload.token
            state.user = action.payload.user

        })
        .addCase(updateUserData.fulfilled, (state, action: PayloadAction<{ user: any, token: string }>) => {
            state.user = action.payload.user
            
        })
    },

});

export default authSlice.reducer;
export const { logout } = authSlice.actions;



