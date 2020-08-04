import React, {useState} from 'react';
//import '../styles/Layout.css'
import LoadData from './filterData'
import FilterQuery from './filter'
import '../styles/testC.css'


export default function Layout() {
const [state,setState] = useState({
  followers:'0',
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
              <h3>Search Filters:</h3>
              <FilterQuery 
              
              filter={e=>setState(prevState => ({
                ...prevState,
                language: e
              }))}

              filterFollowers={e=>setState(prevState => ({
                ...prevState,
                followers: e
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
              <p>test nav right</p>
              </nav>

            </section>

            

            <footer id='footer'>

            </footer>


        </main>




    )



}