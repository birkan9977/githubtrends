import React, { useContext, useState, useEffect } from 'react';
import FilterQuery from './filter'
import AppContext from '../app/context'
import '../styles/mainOutput.css'
import DataLoader from './data'
import userContext from '../app/usercontext'
import UserLoginScreen from './userLoginScreen'


export default function Layout(props) {

const { filters } = useContext(AppContext)
const { users } = useContext(userContext)

const [loginvisible,setLoginVisible]=useState(true)
const [userloggedin,setUserLoggedin]=useState(false)

const onClickLoginShowToggle = () => {
    setLoginVisible(!loginvisible)
}



useEffect(()=>{
  setUserLoggedin(users.user.loggedin)
  
},[users.user.loggedin])

    return (
      
        <main id='main'>
            <header id='header'>
              <h1>GitHub Trending Repositories</h1>
              
              
              <h2>{userloggedin?users.user.info.firstname:null}</h2>
              <h3>{userloggedin?users.user.info.lastname:null}</h3>
              
              
            </header>

            <nav id='topics-nav-bar'> 
              <ul>
                <a href='#home'><li>Home</li></a>
                <a href='#hot'><li>Hot Topics</li></a>
                <a href='#contact'><li>Contact</li></a>
                <a href='#ref'><li>References</li></a>
                <a onClick={onClickLoginShowToggle} href='#'><li>Login</li></a>
              </ul>
            </nav>

            
            
            <section id='middle-section'>
            
              <nav id='left-nav-bar'>  
              <h3>Search:</h3>

              <FilterQuery/>
              
              </nav>

              <section id='center-section'>
              <div id='login' style={{display:'flex',justifyContent:'center'}}>
              <UserLoginScreen user= {props.user} visible={loginvisible}/>
              </div>
              <div id='data-section' style={{display:loginvisible?'none':'block'}}>
              <h3>Top {filters.count>0?filters.count:'30'} Chart</h3>
              
              
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