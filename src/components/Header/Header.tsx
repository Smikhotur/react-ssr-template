import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector'
import { RootState } from '../../store'
import { useEffect } from 'react'
import { fetchCurrentUser } from '../../services/userService'

const Header = () => {
  const auth = useAppSelector((state: RootState) => {
    return state.auth
  })
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (auth.id == -1) {
      dispatch(fetchCurrentUser())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const authButton = auth ? (
    <a href="/api/logout">Logout</a>
  ) : (
    <a href="/api/auth/google">Login</a>
  )
  return (
    <div>
      <Link to="/">React ssr</Link>
      <div>
        <Link to="/users">Users</Link>
        <Link to="/admins">Admins</Link>
        {authButton}
      </div>
    </div>
  )
}
export default Header
