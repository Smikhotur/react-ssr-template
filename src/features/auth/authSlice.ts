import { createSlice } from '@reduxjs/toolkit'
import { fetchCurrentUser } from '../../services/userService'
import User from '../../models/user'

const initialState: User = {
  id: -1,
  name: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.fulfilled, (state) => {
      state.id = 1
      state.name = 'x'
    })
  },
})

const authReducer = authSlice.reducer

export { authReducer }
