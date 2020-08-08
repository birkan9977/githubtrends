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


export const selectLanguage = state => state.filters.language;
export const selectStars = state => state.filters.stars;
export const selectKeyword = state => state.filters.keyword;
export const selectUrl = state => state.filters.url;
export const selectCount = state => state.filters.count;
export const selectLoading = state => state.filters.loading;
export const selectState = state => state.filters;

export default filtersSlice.reducer;
