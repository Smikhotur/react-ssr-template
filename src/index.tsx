import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import Routes from './Routes'
import rootReducer from './reducers'
import axios from 'axios'
import { HelmetProvider } from 'react-helmet-async'
import { loadableReady } from '@loadable/component'

const axiosInstance = axios.create({
  baseURL: '/api',
})
const store = configureStore({
  reducer: rootReducer,
  preloadedState: window.INITIAL_STATE,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: axiosInstance,
      },
      serializableCheck: false,
    }),
})

loadableReady(() => {
  // eslint-disable-next-line import/no-named-as-default-member
  ReactDOM.hydrate(
    <Provider store={store}>
      <HelmetProvider>
        <React.StrictMode>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </React.StrictMode>
      </HelmetProvider>
    </Provider>,
    document.querySelector('#root')
  )
})
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    INITIAL_STATE: any
  }
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
