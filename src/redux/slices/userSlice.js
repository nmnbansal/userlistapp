import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsers } from '../../services/api';

export const fetchUsersList = createAsyncThunk('users/fetchUsersList', async (page, { rejectWithValue }) => {
  try {
    const data = await fetchUsers(page);
    return data;
  } catch (error) {
    return rejectWithValue(error.error);
  }
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    page: 1,
    totalPages: 1,
    loading: false,
    error: null,
  },
  reducers: {
    resetUsers: (state) => {
      state.users = [];
      state.page = 1;
      state.totalPages = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersList.fulfilled, (state, action) => {
        state.loading = false;
        // Only add users with unique ids
        const newUsers = action.payload.data.filter(
          (newUser) => !state.users.some((u) => u.id === newUser.id)
        );
        state.users = [...state.users, ...newUsers];
        state.page = action.payload.page + 1;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchUsersList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUsers } = userSlice.actions;
export default userSlice.reducer;