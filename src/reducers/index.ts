import { combineReducers } from '@reduxjs/toolkit'
import { userReducer } from '../features/user/userSlice'
import { authReducer } from '../features/auth/authSlice'
import { adminReducer } from '../features/admin/adminSlice'

const rootReducer = combineReducers({
  users: userReducer,
  auth: authReducer,
  admin: adminReducer,
})

export default rootReducer
