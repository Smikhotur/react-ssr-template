import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'
import axios from 'axios'
const store = configureStore({
  reducer: rootReducer,
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createStore = (req: any) => {
  const axiosInstance = axios.create({
    baseURL: 'http://react-ssr-api.herokuapp.com',
    headers: { cookie: req.get('cookie') || '' },
  })
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: axiosInstance,
        },
        serializableCheck: false,
      }),
  })
  return store
}
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export { createStore }
export default store
