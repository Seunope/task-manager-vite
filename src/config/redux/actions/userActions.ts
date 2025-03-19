import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// export const fetchOneAgent = createAsyncThunk('user/fetchOneAgent', async (userId: string) => {
//   const token = getAuthToken();
//   const response = await axios.get(GET_ONE_AGENT(userId), {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response?.data;
// });
