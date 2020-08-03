import React, {useState} from 'react';
import DataLoader from './data'
import FilterQuery from './filter'

export default function FilterData(props){
const [selectedFilter,setSelectedFilter]=useState('')
function handleChange(e){
  setSelectedFilter(e)
  props.filter(e)
}

function handleChangeFollowers(e){
  setSelectedFilter(e)
  props.filterFollowers(e)
}

        return(
        <FilterQuery  onChange={handleChange} onFollowersChange={handleChangeFollowers}/>
        
        )

}

export function LoadData(props){
  {console.log('Loaddata/Language:',props.filters.language)}
  {console.log('Loaddata/Followers:',props.filters.followers)}
  return(
  <DataLoader 
  filterlanguage={props.filters.language} 
  filterFollowers={props.filters.followers}
  />
  
  )

} 
    









