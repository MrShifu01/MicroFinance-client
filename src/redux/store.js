import { configureStore } from '@reduxjs/toolkit'
import pageReducer from './pageSlice'
import clientsReducer from './clientsSlice'
import loansReducer from './loansSlice'

const store = configureStore({
    reducer: {
        loans: loansReducer,
        clients: clientsReducer,
        page: pageReducer,
    }
})

export default store