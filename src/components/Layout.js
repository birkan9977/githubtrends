import React, { useContext, useState } from 'react';
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
  const [pageIndex, setPageIndex]=useState(0)

  const [HOME,HOT_REPOS,CONTACTS,REFERENCES] = [1,2,4,8]
  

  const TopChart = () => { 

    return(
            <div> {loggedin?`${username}'s `:null} 
                  Top {filters.count>0?filters.count:'30'} 
                  {` Chart for '${filters.language}'`}
            </div>
    )
  }


  const handleLoginToggle = () => {
        
        setLoginVisible(!loginvisible)
}
  const handlePageChange = (pageindex) => {
        
    setPageIndex(pageindex)
    console.log(pageindex)


}

const bitwise = HOME & HOT_REPOS & CONTACTS & REFERENCES
console.log(bitwise)
//00001111

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
                <a href='#home' onClick={()=>handlePageChange(1)}><li>Home</li></a>
                <a href='#hot' onClick={()=>handlePageChange(2)}><li>Hot Repos</li></a>
                <a href='#contact' onClick={()=>handlePageChange(4)}><li>Contact</li></a>
                <a href='#ref' onClick={()=>handlePageChange(8)}><li>References</li></a>
                <a  
                    href='#'
                    onClick={handleLoginToggle}

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
                                  toggle= {handleLoginToggle}/>

              </div>

              {HOT_REPOS & pageIndex?
              <div id='data-section' style={{display:loginvisible?'none':'block'}}>
              
                <h3>
                  <TopChart/>
                </h3>
              
                  <DataLoader/>

              </div>
              :null}
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
              
            </footer>


        </main>
        


    )



}