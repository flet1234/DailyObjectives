import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../store';
import {
  DayObject,
  DaysDataState,
  Objective,
} from '../../../interfaces-and-types/interfacesAndTypes';

const initialState: DaysDataState = {
  data: [],
};

export const daysDataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addNewDay: (state, action: PayloadAction<DayObject>) => {
      const thisDay = state.data.find(day => day.date === action.payload.date);
      if (thisDay) {
        thisDay.objectives = [
          ...thisDay.objectives,
          ...action.payload.objectives,
        ];
        thisDay.id = action.payload.id;
      } else {
        state.data.push({
          id: action.payload.id,
          date: action.payload.date,
          objectives: [...action.payload.objectives],
        });
      }
    },
    deleteDay: (state, action: PayloadAction<{id: string}>) => {
      state.data = state.data.filter(day => {
        return day.id !== action.payload.id;
      });
    },
    addObjectives: (state, action: PayloadAction<DayObject>) => {
      state.data = state.data.map(day => {
        return day.id === action.payload.id
          ? {
              ...day,
              objectives: [...day.objectives, ...action.payload.objectives],
            }
          : day;
      });
    },
    editOneObjective: (
      state,
      action: PayloadAction<{id: string; objective: Objective}>,
    ) => {
      state.data = state.data.map(day => {
        return day.id === action.payload.id
          ? {
              ...day,
              objectives: day.objectives
                ? day.objectives.map(objective => {
                    return objective.id === action.payload.objective.id
                      ? action.payload.objective
                      : objective;
                  })
                : [],
            }
          : day;
      });
    },
    deleteObjective: (
      state,
      action: PayloadAction<{id: string; objectiveId: string}>,
    ) => {
      state.data = state.data.map(day => {
        return day.id === action.payload.id
          ? {
              ...day,
              objectives: day.objectives.filter(objective => {
                return objective.id !== action.payload.objectiveId;
              }),
            }
          : day;
      });
    },
  },
});

export const {
  addNewDay,
  addObjectives,
  editOneObjective,
  deleteObjective,
  deleteDay,
} = daysDataSlice.actions;

export const selectData = (state: RootState) => state.daysDataReducer.data;

export default daysDataSlice.reducer;
