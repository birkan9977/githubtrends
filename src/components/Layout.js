import React from 'react';
import FilterQuery from './filter'
//import DataLoader from './data'
import '../styles/mainOutput.css'
import { AppConsumer } from '../app/context'

export default function Layout() {

  

    return (
      <AppConsumer>
      { context =>
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
              
              <h3>Top {context.count>0?context.count:'30'} Chart</h3>
              
              {/*<DataLoader/>*/}
              </section>

              

              <nav id='right-nav-bar'>
              <h3>Filters:</h3>
              <p>Language: {context.language}</p>
              <p>Stars: {context.stars}</p>
              <p>Keyword: {context.keyword}</p>
              <p>Api address:</p>
              <textarea id='url-textarea' defaultValue={context.url}></textarea>
              </nav>

            </section>

            

            <footer className='box' id='footer'>
            <h4>mailbirkan@gmail.com  - Created by GitHub ID: Birkan9977</h4>
            <p></p>
            </footer>


        </main>

      }
      </AppConsumer>


    )



}