import { createSlice } from '@reduxjs/toolkit'

const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState: {
    users: []
  },
  reducers: {
    setUsers(state, action) {
      state.users = action.payload.users
    }
  }
})

export const { setUsers } = allUsersSlice.actions

export default allUsersSlice.reducer