import React, {useState} from 'react';


const FilterQuery = (props) => {

const [keyword,setKeyword]=useState('')

const handleTextKeyChange = (e) => {
  setKeyword(e.target.value)
}


  return(
    

    <div id='filter-queries'>
      <label id='label-language'>Language</label>
      <select id='dropdown-language' defaultValue='javascript'
        onChange={(e) => props.filter(e.target.value)}>
        <option value='javascript'>Java Script</option>
        <option value='python'>Python</option>
        <option value='java'>Java</option>
        <option value='c++'>C++</option>
      </select>

      <label id='label-followers'>Followers greater than:</label>
      <select id='dropdown-followers' defaultValue='0'
        onChange={(e) => props.filterFollowers(e.target.value)}>
        <option value='0'>0</option>
        <option value='10000'>10000</option>
        <option value='20000'>20000</option>
        <option value='30000'>30000</option>
        <option value='40000'>40000</option>
        <option value='50000'>50000</option>
      </select>

      <label id='label-keyword'>Search Keyword</label>
      <input type='text' id='input-keyword'
      onChange={handleTextKeyChange}
      >
              {/*console.log(keyword)*/}
      

      </input>
      <button onClick={() => props.filterKeyword(keyword)}>Submit</button>
    </div>
    
    

  )
}

export default FilterQuery




