import { createSlice } from '@reduxjs/toolkit'

console.log('authSlice');
const initialState = {
  user: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    }
  }
})

export const { setUser } = authSlice.actions

export default authSlice.reducer
