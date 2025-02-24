export type Objective = {
  id: string;
  title: string;
  completed: boolean;
};

export interface DayObject {
  id: string;
  date: string;
  objectives: Objective[]
}

export interface DaysDataState {
  data: DayObject[];
}
