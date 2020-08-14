import * as actions from './reducerActions'  
import urlMaker from '../components/urlmaker'


const  reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case actions.changeFilter:
     return ChangeFilter(state, payload.filterName, payload.filterValue);
    default:
     return state;
}};


export function ChangeFilter(state, filterName, filterValue) {
  console.log('state:',state,'filterName:',filterName,'filterValue',filterValue )
  
  let newState = { 
    ...state, 
    [filterName]:filterValue,
  }
  const url = urlMaker(newState)

  newState = { 
    ...state, 
    [filterName]:filterValue,
    url:url,
  }
  console.log('reducer',newState)

    return newState;
    
  
}

export default reducer
