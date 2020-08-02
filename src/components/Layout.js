import React from 'react';
import '../styles/Layout.css'
import FilterData, { LoadData } from './filterData'

export default function Layout() {
  
  
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
              <p>test nav left</p>
              <FilterData/>
              
              </nav>

              <section id='center-section'>
              <h3>Top 30 Chart</h3>
              <LoadData/>
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