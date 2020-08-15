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


const codelanguages = {
  'JavaScript':'JavaScript','Python':'Python','Java':'Java','C++':'C++',
  'Swift':'Swift','Ruby':'Ruby','C':'C','C#':'C#','Rust':'Rust',
  'TypeScript':'TypeScript','Dart':'Dart','Shell':'Shell','Objective-C':'Objective-C',
  'CSS':'CSS'
  
}



const starValues = {
    '0':0,'100':100,'500':500,'1k':1000,'5k':5000,'10k':10000,
    '20k':20000,'30k':30000,'40k':40000,'50k':50000,
    '100k':100000
  }

                   
  return(
    
    
    <div id='filter-queries'>
      <label htmlFor='dropdown-language' id='label-language'>Language</label>
      
      <select id='dropdown-language' 
              name='dropdown-language' 
              defaultValue='Python'
              
              onChange={(e) => sendtoReducer('language',e.target.value)}>
                
                {Object.entries(codelanguages).sort().map(([key,value]) => 
                <option value={value}>{key}</option>
                )}

      </select>
     
      <label htmlFor='dropdown-followers' id='label-followers'>Stars greater than:</label>
      
      <select id='dropdown-followers' 
              defaultValue='10000'
              
              onChange={(e) => sendtoReducer('stars',e.target.value)}>

                {Object.entries(starValues).sort((a,b)=>a[1]-b[1]).map(([key,value]) =>
                <option value={value}>{key}</option>
                )}
        
      </select>

      <label  htmlFor='input-keyword' 
              id='label-keyword'>Search Keyword</label>

      <input  type='text' 
              id='input-keyword'
              onChange={handleTextKeyChange}
              onKeyPress={(e)=>e.which===13?sendtoReducer('keyword',keyword):null}
      >
              {/*console.log(keyword)*/}
      

      </input>
      
      <button 
              onClick={() => sendtoReducer('keyword',keyword)}>Submit</button>
    </div>
    
    

  )
}

export default FilterQuery




