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
  id: string;
  title: string;
  user_id: string;
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
  taskId: string;
  status: TaskStatus;
};

export type UpdateTaskDTO = {
  name: string;
  taskId: string;
  description: string;
  status: TaskStatus;
};

export type CreateTaskDTO = {
  name: string;
  description: string;
};
