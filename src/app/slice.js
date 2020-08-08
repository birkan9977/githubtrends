import { createSlice } from '@reduxjs/toolkit';

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    stars:'10000',
    language:'python',
    keyword:'',
    url:'',
    count:0,
    loading:false,
  },

  reducers: {
    filterLanguage: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.language = action.payload;
    },
    filterStars: (state, action) => {
      state.stars = action.payload;
    },
    filterKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    filteredUrl: (state, action) => {
      state.url = action.payload;
    },
    resultCount: (state, action) => {
      state.count = action.payload;
    },
    loadingFunc: (state, action) => {
      state.loading = action.payload;
    },

    
  },
});

export const { filterLanguage,
               filterStars, 
               filterKeyword,
               filteredUrl,
               resultCount,
               loadingFunc,

               } = filtersSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
/*
export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};
*/
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectLanguage = state => state.filters.language;
export const selectStars = state => state.filters.stars;
export const selectKeyword = state => state.filters.keyword;
export const selectUrl = state => state.filters.url;
export const selectCount = state => state.filters.count;
export const selectLoading = state => state.filters.loading;
export const selectState = state => state.filters;

export default filtersSlice.reducer;
