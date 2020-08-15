import React, {useState, useContext} from 'react';

import AppContext from '../app/context'
import { changeFilter } from '../store/reducerActions'


const FilterQuery = () => {

const { dispatch } = useContext(AppContext)

const [keyword,setKeyword]=useState('')

const handleTextKeyChange = (e) => {
  setKeyword(e.target.value)
}



const sendtoReducer = (filterName,filterValue) => {
  const action = {
    type: changeFilter,
    payload: {
      filterName: filterName,
      filterValue: filterValue
      
    }
  };
  dispatch(action);
};

  return(
    
    
    <div id='filter-queries'>
      <label htmlFor='dropdown-language' id='label-language'>Language</label>
      <select id='dropdown-language' name='dropdown-language' defaultValue='Python'
        onChange={(e) => sendtoReducer('language',e.target.value)}>
        <option value=''>All</option>
        <option value='Javascript'>Java Script</option>
        <option value='Python'>Python</option>
        <option value='Java'>Java</option>
        <option value='C++'>C++</option>
        <option value='Swift'>Swift</option>
        <option value='Ruby'>Ruby</option>
        <option value='C'>C</option>
        <option value='C#'>C#</option>
        <option value='Rust'>Rust</option>
        <option value='TypeScript'>TypeScript</option>
        <option value='Dart'>Dart</option>
        <option value='Shell'>Shell</option>
        <option value='Objective-C'>Objective-C</option>
        <option value='CSS'>CSS</option>
      </select>
     
      <label htmlFor='dropdown-followers' id='label-followers'>Stars greater than:</label>
      <select id='dropdown-followers' defaultValue='10000'
        onChange={(e) => sendtoReducer('stars',e.target.value)}>
        <option value='0'>0</option>
        <option value='500'>500</option>
        <option value='1000'>1000</option>
        <option value='5000'>5000</option>
        <option value='10000'>10000</option>
        <option value='20000'>20000</option>
        <option value='30000'>30000</option>
        <option value='40000'>40000</option>
        <option value='50000'>50000</option>
      </select>

      <label htmlFor='input-keyword' id='label-keyword'>Search Keyword</label>
      <input type='text' id='input-keyword'
      onChange={handleTextKeyChange}
      onKeyPress={(e)=>e.which===13?sendtoReducer('keyword',keyword):null}
      >
              {/*console.log(keyword)*/}
      

      </input>
      <button onClick={() => sendtoReducer('keyword',keyword)}>Submit</button>
    </div>
    
    

  )
}

export default FilterQuery




