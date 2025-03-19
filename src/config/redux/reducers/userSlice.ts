import { createSlice } from '@reduxjs/toolkit';
import { ErrorType, UserDTO } from '../../utils/types';

export interface UserState {
  user: UserDTO;
  loading: boolean;
  error?: ErrorType | null | string;
}

const initialState: UserState = {
  user: {} as UserDTO,
  error: {
    message: '',
  },
  loading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserData: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { addUserData } = userSlice.actions;

export default userSlice.reducer;
