import * as actions from './fetchActions';
import Display from '../components/displayData';

const FetchOptionsReducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case actions.hideOptions:
      return HideOptions(state, payload);

    case actions.fetchOption:
      return FetchOption(state, payload);

    case actions.manualSubmit:
      return ManualSubmit(state, payload);

    default:
      return state;
  }
};

export function ManualSubmit(prevstate, payload) {
  let newState = {
    ...prevstate,
    manualSubmit: payload,
  };

  const display = Display(newState);

  newState = {
    ...newState,
    display: display,
  };

  return newState;
}

export function HideOptions(prevstate, payload) {
  let newState = {
    ...prevstate,
    hideOption: payload,
  };

  return newState;
}

export function FetchOption(prevstate, payload) {
  let newState = {
    ...prevstate,
    fetchOption: payload,
  };

  const display = Display(newState);

  newState = {
    ...newState,
    display: display,
  };

  return newState;
}

export default FetchOptionsReducer;
