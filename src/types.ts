import { LoaderFunctionArgs } from 'react-router-dom'
// eslint-disable-next-line import/no-unresolved
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'

export type LoaderFunctionParams = LoaderFunctionArgs & ToolkitStore
