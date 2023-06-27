import { createSlice } from '@reduxjs/toolkit';

const storedClients = localStorage.getItem('clients');

const clientsSlice = createSlice({
  name: 'clients',
  initialState: { 
    data: storedClients ? JSON.parse(storedClients) : [] 
  },
  reducers: {
    setClients: (state, action) => {
      state.data = action.payload;
      localStorage.setItem('clients', JSON.stringify(state));
    },
  },
});

export const { setClients } = clientsSlice.actions;

export default clientsSlice.reducer;
