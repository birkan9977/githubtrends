import React, { useContext, useState, useEffect } from 'react';
import FilterQuery from './filter'
import AppContext from '../app/context'
import '../styles/mainOutput.css'
import DataLoader from './data'
import UserLoginScreen from './userLoginScreen'
import UserInfo from './userinfo'
import userContext from '../app/usercontext'

export default function Layout() {


  const { filters } = useContext(AppContext)
  
  const { users } = useContext(userContext)
  const loggedin = users.user.loggedin
  const username = users.user.info.firstname

  const [loginvisible,setLoginVisible]=useState(true)

  const onClickLoginShowToggle = () => {
        
        setLoginVisible(!loginvisible)
}

    return (
      
        <main id='main'>
            <header id='header'>
              <div className='page-title'>
              <h1>GitHub Trending Repositories</h1>
              </div>

              <div className='user-info'>
              
              <UserInfo/>
              
              </div>
              

            </header>

            <nav id='topics-nav-bar'> 
              <ul>
                <a href='#home'><li>Home</li></a>
                <a href='#hot'><li>Hot Topics</li></a>
                <a href='#contact'><li>Contact</li></a>
                <a href='#ref'><li>References</li></a>
                <a  
                    href='#'
                    onClick={onClickLoginShowToggle}

                >   <li>Login</li></a>
              </ul>
            </nav>

            
            
            <section id='middle-section'>
            
              <nav id='left-nav-bar'>  
              <h3>Search:</h3>

              <FilterQuery/>
              
              </nav>

              <section id='center-section'>

              <div id='login' style={{display:'flex',justifyContent:'center'}}>
              
                <UserLoginScreen  visible={loginvisible}
                                  toggle= {onClickLoginShowToggle}/>

              </div>

              <div id='data-section' style={{display:loginvisible?'none':'block'}}>
              
              <h3>{loggedin?`${username}'s`:null} Top {filters.count>0?filters.count:'30'} 
              {` Chart for '${filters.language}'`}
              
              </h3>
              
              <DataLoader/>

              </div>
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