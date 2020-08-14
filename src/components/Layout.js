import React, { useContext } from 'react';
import FilterQuery from './filter'
import AppContext from '../app/context'
import '../styles/mainOutput.css'
import DataLoader from './data'

export default function Layout() {

const { filters } = useContext(AppContext)


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

              <FilterQuery/>
              
              </nav>

              <section id='center-section'>
              
              <h3>Top {filters.count>0?filters.count:'30'} Chart</h3>
              
              
              <DataLoader/>
              </section>

              

              <nav id='right-nav-bar'>
              <h3>Filters:</h3>
              <p>Language: {filters.language}</p>
              <p>Stars: {filters.stars}</p>
              <p>Keyword: {filters.keyword}</p>
              <p>Api address:</p>
              <textarea id='url-textarea' 
                        value={filters.url}
                        readOnly
                        
                        
              >
              
              </textarea>
              </nav>

            </section>

            

            <footer className='box' id='footer'>
            <h4>mailbirkan@gmail.com  - Created by GitHub ID: Birkan9977</h4>
            <p></p>
            </footer>


        </main>

      


    )



}