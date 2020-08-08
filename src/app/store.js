import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './filterslice';



export default configureStore({
  reducer: {
    filters: filtersReducer,
  },
});