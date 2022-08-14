import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  token: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return { isLoggedIn: true, token: action.payload.token }
    },
    unsetUser() {
      return initialState
    },
  },
})

export const { setUser, unsetUser } = userSlice.actions
export default userSlice.reducer
