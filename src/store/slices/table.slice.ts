import { createSlice } from '@reduxjs/toolkit'

export interface TableState {
    refresh: boolean
}

const initialState: TableState = {
  refresh: false
}

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    toggleRefresh: (state) => {
      state.refresh = !state.refresh 
    }
  },
})

// Action creators are generated for each case reducer function
export const { toggleRefresh } = tableSlice.actions

export default tableSlice.reducer