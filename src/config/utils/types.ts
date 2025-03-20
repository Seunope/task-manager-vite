export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export type ErrorType = {
  message?: string | null;
};

export type UserDTO = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};

export type TaskDTO = {
  id: number;
  title: string;
  user_id: number;
  status: TaskStatus;
  description: string;
  created_at: string;
};

export type LoginDTO = {
  email: string;
  password: string;
};

export type SignUpDTO = {
  name: string;
  email: string;
  password: string;
};

export type UpdateTaskStatusDTO = {
  taskId: number;
  status: TaskStatus;
};

export type UpdateTaskDTO = {
  title: string;
  taskId: number;
  description: string;
};

export type CreateTaskDTO = {
  title: string;
  description: string;
};
