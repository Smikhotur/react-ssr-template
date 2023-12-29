import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (data, thunkApi) => {
    const api: AxiosInstance = thunkApi.extra as AxiosInstance
    return api.get('/users').then((response) => {
      return response.data
    })
  }
)

export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrentUsers',
  async (data, thunkApi) => {
    const api: AxiosInstance = thunkApi.extra as AxiosInstance
    return api.get('/current_user').then((response) => {
      return response.data
    })
  }
)
