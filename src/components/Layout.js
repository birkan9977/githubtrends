import React, {useState} from 'react';
import FilterQuery from './filter'
import DataLoader from './data'
import '../styles/mainOutput.css'
import { useSelector, useDispatch } from 'react-redux';
import {

  selectLanguage,
  selectStars,
  selectKeyword,
  selectUrl,
  selectCount,
  selectLoading,
  selectState,

} from '../app/slice'

export default function Layout() {

  const count = useSelector(selectCount);
  const stars = useSelector(selectStars);
  const language = useSelector(selectLanguage);
  const keyword = useSelector(selectKeyword);
  const url = useSelector(selectUrl);
  const loading = useSelector(selectLoading);
  const state = useSelector(selectState);

  const dispatch = useDispatch()

function displayChartNumber(){ 
  let displaytext=''

    if(loading){
      displaytext = '30'
    }else{
      if(state.count>0){
        displaytext =  `Displaying ${count} results.`
      } else {
        displaytext = 'Change Search Criteria'
      }
    }
    return displaytext
}

    return (
      
        <main id='main'>

            <header id='header'>
              <h1>GitHub Trending Repositories</h1>

              
            </header>

            <nav id='topics-nav-bar'> 
              <ul>
                <a href='#home'><li>Home</li></a>
                <a href='#hot'><li>Hot Topics</li></a>
                <a href='#contact'><li>Contact</li></a>
                <a href='#ref'><li>References</li></a>
              </ul>
            </nav>


            {/*console.log(state)*/}

            <section id='middle-section'>

              <nav id='left-nav-bar'>  
              <h3>Search:</h3>

              <FilterQuery/>

              </nav>

              <section id='center-section'>
              
              <h3>Top {count>0?count:'30'} Chart</h3>
              {/*displayChartNumber()*/}
              {console.log('loading/layout:',loading)}
              <DataLoader/>
              </section>

              {console.log('filterData',state)}

              <nav id='right-nav-bar'>
              <h3>Filters:</h3>
              <p>Language: {language}</p>
              <p>Stars: {stars}</p>
              <p>Keyword: {keyword}</p>
              <p>Api address:</p>
              <textarea id='url-textarea' defaultValue={url}></textarea>
              </nav>

            </section>

            

            <footer className='box' id='footer'>
            <h4>mailbirkan@gmail.com  - Created by GitHub ID: Birkan9977</h4>
            <p></p>
            </footer>


        </main>




    )



}