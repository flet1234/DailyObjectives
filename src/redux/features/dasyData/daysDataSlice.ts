import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../store';

export interface dayObject {
  id: string;
  date: string;
  objectives: string[];
}

export interface daysDataState {
  data: dayObject[];
}

const initialState: daysDataState = {
  data: [],
};

export const daysDataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addNewDay: (state, action: PayloadAction<dayObject>) => {
      state.data.push({
        id: action.payload.id,
        date: action.payload.date,
        objectives: action.payload.objectives,
      });
    },
    editObjectives: (state, action: PayloadAction<dayObject>) => {
      state.data = state.data.map(day => {
        return day.id === action.payload.id
          ? {...day, objectives: action.payload.objectives}
          : day;
      });
    },
  },
});

export const {addNewDay, editObjectives} = daysDataSlice.actions;

export const selectData = (state: RootState) => state.daysDataReducer.data;

export default daysDataSlice.reducer;
