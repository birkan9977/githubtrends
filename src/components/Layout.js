import React, {useEffect, useState, useContext} from 'react';
import FilterQuery from './filter'
import DataMiddleMan from './dataMid'
import '../styles/mainOutput.css'
import AppContext, { AppConsumer } from '../app/context'
import Dispatch from './dispatch'

export default function Layout() {
const [xcount, setXCount]=useState(0)
const [xurl,xsetUrl]=useState('')

const appfilters = useContext(AppContext)

  const getCount = (e) =>{
    setXCount(e)
    console.log(xcount)
  }

  const getUrl = (e) =>{
    xsetUrl(e)
    console.log(xurl)
  }

  const disp = () =>{
  return(<Dispatch key = 'count' value = {xcount}/>)
  }
  useEffect(() => {
    
    disp()
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

              <FilterQuery/>

              </nav>

              <section id='center-section'>
              
              <h3>Top {xcount>0?xcount:'30'} Chart</h3>
              
              <DataMiddleMan 
                  count = {getCount} 
                  xurl={getUrl}
              />

              </section>

              <Dispatch 
                  xcount = {xcount} 
                  xurl={xurl}
              />

              <nav id='right-nav-bar'>
              <h3>Filters:</h3>
              <p>Language: {appfilters.language}</p>
              <p>Stars: {appfilters.stars}</p>
              <p>Keyword: {appfilters.keyword}</p>
              <p>Api address:</p>
              <textarea id='url-textarea' defaultValue={appfilters.url}>
              
              {/*context.setFilter('count',count)*/} 
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