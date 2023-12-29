import { fetchUsers } from '../services/userService'
import { useEffect } from 'react'
import { RootState } from '../store'
import { useAppDispatch, useAppSelector } from '../hooks/useTypedSelector'
import { Helmet } from 'react-helmet-async'

const UsersListPage = () => {
  const users = useAppSelector((state: RootState) => {
    return state.users
  })

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (users.usersList.length == 0) {
      dispatch(fetchUsers())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderUsers = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return users.usersList.map((user: any) => {
      return <li key={user.id}>{user.name}</li>
    })
  }

  const Head = () => {
    //ESX template string is req
    return (
      <Helmet>
        <title>{`${users.usersList.length}`} Users loaded</title>
        <meta property="og:title" content="Users App" />
      </Helmet>
    )
  }
  return (
    <div>
      <Head />
      {users.loading && <div>Loading....</div>}
      {!users.loading && users.error ? <div>Error : {users.error}</div> : null}
      {!users.loading && <ul>{renderUsers()}</ul>}
    </div>
  )
}
function loadUserList(store: any) {
  return store.dispatch(fetchUsers())
}
export { loadUserList }
export default UsersListPage
