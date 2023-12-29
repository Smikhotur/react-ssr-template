import User from '../../models/user'

export default interface UserState {
  loading: boolean
  usersList: User[]
  error: string
  currentUser: User | undefined
}
