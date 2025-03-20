import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateTaskDTO } from '../../utils/types';
import { UpdateTaskDTO, UpdateTaskStatusDTO } from './../../utils/types';
import { CREATE_TASK, GET_TASK, UPDATE_TASK, UPDATE_TASK_STATUS } from '../../api/http';

export const createTask = createAsyncThunk('task/create', async (dto: CreateTaskDTO) => {
  const { data } = await CREATE_TASK(dto);
  // console.log("DATAAAA", data);
  return data;
});

export const fetchAllTask = createAsyncThunk('task/all', async () => {
  const { data } = await GET_TASK();
  // console.log("DATAAAA", data);
  return data;
});

export const editTask = createAsyncThunk('task/edit', async (dto: UpdateTaskDTO) => {
  const { data } = await UPDATE_TASK(dto);
  // console.log("DATAAAA", data);
  return data;
});

export const updateTaskStatus = createAsyncThunk(
  'task/update/status',
  async (dto: UpdateTaskStatusDTO) => {
    const { data } = await UPDATE_TASK_STATUS(dto);
    // console.log("DATAAAA", data);
    return data;
  },
);
