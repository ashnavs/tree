import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'http://localhost:5000/admin'; 

const initialState = {
    admin: null,
    users: [],
    loading: false,
    error: null,
};


export const adminLogin = createAsyncThunk('admin/adminLogin', async (formData, { rejectWithValue }) => {
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


const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        logout: (state) => {
            state.admin = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.admin = action.payload;
            })
            .addCase(adminLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
        },
    });
export const { logout } = adminSlice.actions;

export default adminSlice.reducer;