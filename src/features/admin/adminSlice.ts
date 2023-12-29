import { createSlice } from '@reduxjs/toolkit'
import { fetchAdmins } from '../../services/adminService'

const initialState = {
  loading: false,
  adminsList: [],
  error: '',
  currentUser: undefined,
}
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAdmins.fulfilled, (state, action) => {
      state.adminsList = action.payload
    })
  },
})

const adminReducer = adminSlice.reducer
export { adminReducer }
