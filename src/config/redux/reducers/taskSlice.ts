import { createSlice } from '@reduxjs/toolkit';
import { ErrorType, TaskDTO } from '../../utils/types';

export interface TaskState {
  task: TaskDTO;
  tasks: TaskDTO[];
  loading: boolean;
  error?: ErrorType | null | string;
}

const initialState: TaskState = {
  task: {} as TaskDTO,
  tasks: [],
  error: {
    message: '',
  },
  loading: false,
};

export const taskSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentTask: (state, action) => {
      state.task = action.payload;
    },
  },
});

export const { setCurrentTask } = taskSlice.actions;

export default taskSlice.reducer;
