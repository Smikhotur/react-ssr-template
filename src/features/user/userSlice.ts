import { createSlice } from '@reduxjs/toolkit'
import UserState from './userState'
import { fetchCurrentUser, fetchUsers } from '../../services/userService'

const initialState: UserState = {
  loading: false,
  usersList: [],
  error: '',
  currentUser: undefined,
}
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false
      state.usersList = action.payload
      state.error = ''
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false
      state.usersList = []
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      state.error = action.error.message!
    })
  },
})

const userReducer = userSlice.reducer

export { userReducer }
