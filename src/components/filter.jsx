import React from 'react';


const FilterQuery = (props) => {

  return(
    <div id='filter-queries'>
      <label id='language'>Language</label>
      <select id='dropdown-language' defaultValue='javascript'
        onChange={(e) => props.filter(e.target.value)}>
        <option value='javascript'>Java Script</option>
        <option value='python'>Python</option>
        <option value='java'>Java</option>
        <option value='c++'>C++</option>
      </select>

      <label id='followers'>Followers greater than:</label>
      <select id='dropdown-followers' defaultValue='50000'
        onChange={(e) => props.filterFollowers(e.target.value)}>
        <option value='10000'>10000</option>
        <option value='20000'>20000</option>
        <option value='30000'>30000</option>
        <option value='40000'>40000</option>
        <option value='50000'>50000</option>
      </select>
    </div>
    
    

  )
}

export default FilterQuery




