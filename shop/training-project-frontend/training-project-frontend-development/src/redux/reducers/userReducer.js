import { createSlice } from '@reduxjs/toolkit'

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {
    user: {
      username: '',
      roles: []
    }
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user
    }
  }
})

export const { setUser } = userInfoSlice.actions

export default userInfoSlice.reducer