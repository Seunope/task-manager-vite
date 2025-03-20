import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskDTO } from '../../utils/types';
import { createTask, fetchAllTask, editTask, updateTaskStatus } from '../actions/taskActions';

export interface TaskState {
  tasks: TaskDTO[];
  loading: boolean;
  refresh: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  error: null,
  refresh: false,
  loading: false,
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setCurrentTask: (state, action: PayloadAction<TaskDTO>) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task,
      );
    },
  },
  extraReducers: (builder) => {
    // Fetch all tasks
    builder.addCase(fetchAllTask.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllTask.fulfilled, (state, action) => {
      state.tasks = action.payload.data;
      state.loading = false;
      state.refresh = false;
    });
    builder.addCase(fetchAllTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch tasks';
    });

    // Create a task
    builder.addCase(createTask.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.tasks.push(action.payload.data);
      state.loading = false;
    });
    builder.addCase(createTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to create task';
    });

    // Edit a task
    builder.addCase(editTask.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(editTask.fulfilled, (state, action: PayloadAction<TaskDTO>) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task,
      );
      state.loading = false;
    });
    builder.addCase(editTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to edit task';
    });

    // Update task status
    builder.addCase(updateTaskStatus.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateTaskStatus.fulfilled, (state, action) => {
      console.log('action.payload.SSS', action.payload.data);
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.data.id ? action.payload.data : task,
      );
      state.loading = false;
      // state.refresh = true;
    });
    builder.addCase(updateTaskStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to update task status';
    });
  },
});

export const { setCurrentTask } = taskSlice.actions;
export default taskSlice.reducer;
