import React from 'react';


const FilterQuery = (props) => {

  return(
    <div id='filter-queries'>
      <p>Language</p>
      <select id='dropdown-language' defaultValue='javascript'
        onChange={(e) => props.onChange(e.target.value)}>
        <option value='javascript'>Java Script</option>
        <option value='python'>Python</option>
        <option value='java'>Java</option>
        <option value='c++'>C++</option>
      </select>

      <p>Followers greater than:</p>
      <select id='dropdown-followers' defaultValue='50000'
        onChange={(e) => props.onFollowersChange(e.target.value)}>
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




