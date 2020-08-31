import * as actions from './reducerActions';
import urlMaker from '../components/urlmaker';
import { InitialFilters } from '../app/context';

const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case actions.changeFilter:
      return ChangeFilter(state, payload.filterName, payload.filterValue);

    case actions.defaultFilter:
      return resetFilters();

    case actions.manualFilter:
      return manualFilters(state, payload);

    default:
      return state;
  }
};

export function manualFilters(state, filters) {
  const { language, stars, keyword } = filters.manualfilters;

  let newState = {
    ...state,
    language: language,
    stars: stars,
    keyword: keyword,
  };

  const url = urlMaker(newState);

  newState = {
    ...newState,
    url: url,
  };

  return newState;
}

export function resetFilters() {
  sessionStorage.clear();
  return InitialFilters;
}

export function ChangeFilter(state, filterName, filterValue) {
  let newState = {
    ...state,
    [filterName]: filterValue,
  };
  const url = urlMaker(newState);

  newState = {
    ...newState,
    url: url,
  };

  return newState;
}

export default reducer;
