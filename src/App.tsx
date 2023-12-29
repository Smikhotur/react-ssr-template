import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import { fetchCurrentUser } from './services/userService'
import { Helmet } from 'react-helmet-async'

const App = () => {
  return (
    <div>
      <Helmet>
        <title>React SEO</title>
        <meta property="og:title" content="React SEO" />
      </Helmet>
      <Header />
      <Outlet />
    </div>
  )
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function loadCurrentUser(store: any) {
  return store.dispatch(fetchCurrentUser())
}
export { loadCurrentUser }
export default App
