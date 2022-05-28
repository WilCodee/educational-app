import { createSlice } from '@reduxjs/toolkit'
import { floatColumn, keyColumn } from 'react-datasheet-grid'

export interface GradesState {
    grades: any[]
}

const initialState: GradesState = {
  grades: [
    {
        ...keyColumn("grade0" , floatColumn),
        title: "Nota 0",
    }
  ]
}

export const gradesSlice = createSlice({
  name: 'grades',
  initialState,
  reducers: {
    addGrade: (state, action) => {
      state.grades = [...state.grades,     {
        ...keyColumn("grade" + state.grades.length, floatColumn),
        title: "Nota " + state.grades.length,
    }]  
    }
  },
})

// Action creators are generated for each case reducer function
export const { addGrade } = gradesSlice.actions

export default gradesSlice.reducer