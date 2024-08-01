
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'http://localhost:5000/api';

const initialState = {
    user: null,
    loading: false,
    error: null,
    message: null
};

export const userSignup = createAsyncThunk('auth/userSignup', async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const userLogin = createAsyncThunk('auth/userLogin', async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/login`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userSignup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userSignup.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(userSignup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(userLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.message = action.payload.message;
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
