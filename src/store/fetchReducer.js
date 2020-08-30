import * as actions from './fetchActions';
import Display from '../components/displayData';

const FetchOptionsReducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case actions.hideOptions:
      console.log('reducer,hideOptions', payload);
      return HideOptions(state, payload);

    case actions.fetchOption:
      console.log('reducer,fetchOption', payload);
      return FetchOption(state, payload);

    case actions.manualSubmit:
      console.log('reducer,manualSubmit', payload);
      return ManualSubmit(state, payload);

    default:
      return state;
  }
};

export function ManualSubmit(prevstate, payload) {
  console.log('ManualSubmit: prevstate ', prevstate);

  let newState = {
    ...prevstate,
    manualSubmit: payload,
  };

  const display = Display(newState);

  newState = {
    ...newState,
    display: display,
  };

  console.log('ManualSubmit: newState ', newState);
  return newState;
}

export function HideOptions(prevstate, payload) {
  console.log('HideOptions: prevstate ', prevstate);
  let newState = {
    ...prevstate,
    hideOption: payload,
  };

  console.log('HideOptions: newState ', newState);
  return newState;
}

export function FetchOption(prevstate, payload) {
  console.log('FetchOption: prevstate ', prevstate);
  let newState = {
    ...prevstate,
    fetchOption: payload,
  };

  const display = Display(newState);

  newState = {
    ...newState,
    display: display,
  };

  console.log('FetchOption: newState ', newState);
  return newState;
}

export default FetchOptionsReducer;
