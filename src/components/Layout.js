import React, {useState} from 'react';
import LoadData from './filterData'
import FilterQuery from './filter'
import '../styles/testC.css'

export default function Layout() {
const [state,setState] = useState({
  stars:'10000',
  language:'javascript',
  keyword:''
})

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
              {console.log('filterData',state)}

              </nav>

              <section id='center-section'>
              
              <h3>Top 30 Chart</h3>
              <LoadData filters={state}/>
              </section>

              <nav id='right-nav-bar'>
              <h3>Filters:</h3>
              <p>Language: {state.language}</p>
              <p>Stars: {state.stars}</p>
              <p>Keyword: {state.keyword}</p>
              </nav>

            </section>

            

            <footer id='footer'>

            </footer>


        </main>




    )



}