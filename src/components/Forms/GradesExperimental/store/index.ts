import { configureStore } from '@reduxjs/toolkit'
import gradesReducer from './slices/grades.slice'

export const store = configureStore({
  reducer: {
      grades: gradesReducer 
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch