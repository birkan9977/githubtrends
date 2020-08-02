import React, {useState}  from 'react';
import MyContext from '../myContext'


const FilterQuery = (props) => {

  return(
    <MyContext.Consumer>
    {context => ( 
    <div>
      <select
        onChange={(ev) => context.handleChangeLanguage(ev.target.value)}>
        <option value='javascript'>Java Script</option>
        <option value='python'>Python</option>
        <option value='java'>Java</option>
        <option value='c++'>C++</option>
      </select>
    </div>
    
    )}
      </MyContext.Consumer>

  )
}

export default FilterQuery