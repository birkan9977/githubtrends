import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './slice';



export default configureStore({
  reducer: {
    filters: filtersReducer,
  },
});