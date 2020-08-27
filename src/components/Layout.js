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
  useLocation,
  useHistory
} from "react-router-dom";


export default function Layout() {


  const { filters } = useContext(AppContext)
  
  const { users } = useContext(userContext)
  const loggedin = users.user.loggedin
  const username = users.user.info.firstname

  const [loginvisible,setLoginVisible]=useState(false)
  const [pageIndex, setPageIndex]=useState(0)
  const [HOME,HOT_REPOS,CONTACTS,REFERENCES] = [1,2,4,8]
  const [currentLocation, setCurrentLocation] = useState('')

  
  function handleCurrentLocation(e){
    console.log('loc',e)
    
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


  const handleLoginToggle = () => {
        
        setLoginVisible(!loginvisible)
}
  const handlePageChange = (pageindex) => {
        
    setPageIndex(pageindex)
    console.log(pageindex)


}

const bitwise = HOME & HOT_REPOS & CONTACTS & REFERENCES
//console.log(bitwise)
//00001111
const curLoc = currentLocation
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
              <Router>
                <Link to="/"><a href='#home'><li>Home</li></a></Link>
                <Link to="/hot_repos"><a href='#hot'><li>Hot Repos</li></a></Link>
                <Link to="/contact"><a href='#contact'><li>Contact</li></a></Link>
                <Link to="/references"><a href='#ref'><li>References</li></a></Link>
                
                {/*Login opens at every page*/}
                <a onClick={handleLoginToggle}><li>Login</li></a>

                <Switch>
                  <Route exact path="/"><GetLocation currentPath={(e)=>handleCurrentLocation(e)}/></Route>
                  <Route path="/hot_repos"><GetLocation currentPath={(e)=>handleCurrentLocation(e)}/></Route>
                  <Route path="/contact"><GetLocation currentPath={(e)=>handleCurrentLocation(e)}/></Route>
                  <Route path="/references"><GetLocation currentPath={(e)=>handleCurrentLocation(e)}/></Route>
                </Switch> 
              </Router>
              
              </ul>
            </nav>
           
            <section id='middle-section'>
            
              <nav id='left-nav-bar'>  
              <h3>Search:</h3>

                <FilterQuery/>
              
              </nav>

              <section id='center-section'>{curLoc}

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


function GetLocation(props){
  let history = useHistory()
  let currentPath = ''
  currentPath = history?history.location.pathname.toString():'nopath'
      
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
/*
function GetLocation(props) {
  
  let currentPath = FindLocation()
  console.log(currentPath)

  useEffect(()=>{
    props.currentPath(currentPath)

  },[props])

  return (
    <>
    </>
  )
}

function HotRepos() {
  
  let currentPath = FindLocation()
  console.log(currentPath)

  return currentPath
}

function Contact() {

  let currentPath = FindLocation()
  console.log(currentPath)

  return currentPath
}

function References() {

  let currentPath = FindLocation()
  console.log(currentPath)

  return currentPath
}
*/