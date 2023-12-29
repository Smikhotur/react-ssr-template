import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'

export const fetchAdmins = createAsyncThunk(
  'admin/fetchAdmins',
  async (data, thunkApi) => {
    const api: AxiosInstance = thunkApi.extra as AxiosInstance
    return api.get('/admins').then((response) => {
      return response.data
    })
  }
)
