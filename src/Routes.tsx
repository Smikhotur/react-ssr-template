import UsersListPage, { loadUserList } from './pages/UsersListPage'
import { RouteObject, useRoutes } from 'react-router-dom'
import App from './App'
import NotFoundPage from './pages/NotFoundPage'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute '
import AdminsListPage, { loadAdminsList } from './pages/AdminsListPage'
import AppPage from './pages/AppPage'

//const AppPage = loadable(() => import('./pages/AppPage'),{ssr: true})
//const UsersListPage = loadable(() => import('./pages/UsersListPage'),{ssr: true})

//const AdminsListPage = loadable(() => import('./pages/AdminsListPage'),{ssr: true})

const routes: RouteObject[] = [
  {
    element: <App />,
    path: '/',
    //loader: loadCurrentUser,
    children: [
      {
        path: '/',
        element: <AppPage />,
      },
      {
        path: '/users',
        element: (
          <ProtectedRoute to="/login-user">
            <UsersListPage />
          </ProtectedRoute>
        ),
        loader: loadUserList,
      },
      {
        path: '/admins',
        element: (
          <ProtectedRoute to="/login">
            <AdminsListPage />
          </ProtectedRoute>
        ),
        loader: loadAdminsList,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]

export { routes }
export default function Router() {
  return useRoutes(routes)
}
