import React, {useState} from 'react';
import LoadData from './filterData'
import FilterQuery from './filter'
import '../styles/mainOutput.css'

export default function Layout() {
const [state,setState] = useState({
  stars:'10000',
  language:'javascript',
  keyword:'',
  url:'',
  count:0,
  loading:true,
})

function displayChartNumber(){ 
  let displaytext=''

    if(state.loading){
      displaytext = '30'
    }else{
      if(state.count>0){
        displaytext =  `Displaying ${state.count} results.`
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


            {console.log(state)}

            <section id='middle-section'>

              <nav id='left-nav-bar'>  
              <h3>Search:</h3>

              <FilterQuery 
              
              filterLanguage={e=>setState(prevState => ({
                ...prevState,
                language: e
              }))}

              filterStars={e=>setState(prevState => ({
                ...prevState,
                stars: e
              }))}

              filterKeyword={e=>setState(prevState => ({
                ...prevState,
                keyword: e
              }))}
              
              />

              </nav>

              <section id='center-section'>
              
              <h3>Top {state.count>0?state.count:'30'} Chart</h3>
              {/*displayChartNumber()*/}
              {console.log(state.loading)}
              <LoadData 
              

              filters={state} 

              filteredUrl={e=>setState(prevState => ({
                ...prevState,
                url: e
              }))}

              resultCount={e=>setState(prevState=> ({
                ...prevState,
                count:e
              }))}

              loading={e=>setState(prevState=> ({
                ...prevState,
                loading:e
              }))}
              
              count={state.count}
              
              
              
              />
              </section>

              {console.log('filterData',state)}

              <nav id='right-nav-bar'>
              <h3>Filters:</h3>
              <p>Language: {state.language}</p>
              <p>Stars: {state.stars}</p>
              <p>Keyword: {state.keyword}</p>
              <p>Api address:</p>
              <textarea id='url-textarea' defaultValue={state.url}></textarea>
              </nav>

            </section>

            

            <footer id='footer'>

            </footer>


        </main>




    )



}