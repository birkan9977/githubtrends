import React, { useContext, useState, useEffect } from 'react';
import FilterQuery from './filter'
import AppContext from '../app/context'
import '../styles/mainOutput.css'
import DataLoader from './data'
import UserLoginScreen from './userLoginScreen'
import UserInfo from './userinfo'
import userContext from '../app/usercontext'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect
} from "react-router-dom";


export default function Layout() {


  const { filters } = useContext(AppContext)
  
  const { users } = useContext(userContext)
  const loggedin = users.user.loggedin
  const username = users.user.info.firstname

  const [login,setLogin]=useState(false)
  const [pageIndex, setPageIndex]=useState(0)
  const [HOME,HOT_REPOS,CONTACTS,REFERENCES] = [1,2,4,8]
  const [currentLocation, setCurrentLocation] = useState('')

  useEffect(()=>{
    setLogin(false) 

  },[login])

  function handleCurrentLocation(e){
    //console.log('current path',e)
    
    setCurrentLocation(e)
  }

  const TopChart = () => { 

    return(
            <div> {loggedin?`${username}'s `:null} 
                  Top {filters.count>0?filters.count:'30'} 
                  {` Chart for '${filters.language}'`}
            </div>
    )
  }


  const handleLoginChange = () => {
        
        setLogin(true)      
  
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  const handlePageChange = (pageindex) => {
        
    setPageIndex(pageindex)
    //console.log(pageindex)


}

const bitwise = HOME & HOT_REPOS & CONTACTS & REFERENCES
//console.log(bitwise)
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
            
            <nav id='topics-nav-bar' > 
            
              <ul >
              <Router >
                <Link to="/"><li>Home</li></Link>
                <Link to="/hot_repos"><li>Hot Repos</li></Link>
                <Link to="/contact"><li>Contact</li></Link>
                <Link to="/references"><li>References</li></Link>
                <Link to="/login"><li>Login</li></Link>

                <Switch>
                  <Route exact path="/"><GetLocation currentPath={(e)=>handleCurrentLocation(e)}/></Route>
                  <Route path="/hot_repos"><GetLocation currentPath={(e)=>handleCurrentLocation(e)}/></Route>
                  <Route path="/contact"><GetLocation currentPath={(e)=>handleCurrentLocation(e)}/></Route>
                  <Route path="/references"><GetLocation currentPath={(e)=>handleCurrentLocation(e)}/></Route>
                  <Route path="/login"><GetLocation currentPath={(e)=>handleCurrentLocation(e)}/></Route>
                </Switch> 

                {login?<Redirect to="/hot_repos"/>:null}
              </Router>
              
              </ul>
            </nav>
           
            <section id='middle-section'>
            
              <nav id='left-nav-bar'>  
              <h3>Search:</h3>

                <FilterQuery/>
              
              </nav>

              <section id='center-section'>{currentLocation}

              {currentLocation==='/login'?
              <div id='login' style={{display:'flex',justifyContent:'center'}}>
               
                <UserLoginScreen  loginChange = {handleLoginChange}/>
                
              </div>
              :null}

              {currentLocation==='/hot_repos'?
              <div id='data-section' style={{display:'block'}}>
              
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


function GetLocation(props){
  let history = useHistory()
  let currentPath = history?history.location.pathname:null
      
      //console.log(currentPath, typeof currentPath)
      useEffect(()=>{
        props.currentPath(currentPath)
    
      },[props])
    
      return (
        <>
        </>
      )
      //return currentPath

}
