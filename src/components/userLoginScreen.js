import React, { useContext, useState, useEffect } from 'react';
import Backend from './backend'
import userContext from '../app/usercontext'
import customData from '../database/data.json'



const UserLoginScreen = (props) => {

const userlist = customData
//console.log(userlist)
const { users } = useContext(userContext)

const [loginInput,setloginInput]=useState('')
const [passwordInput,setPasswordInput]=useState('')
const [hiddenPassword,setHiddenPassword]=useState('')
const [hidepassword,setHidePassword]=useState(false)
const [submitted,setSubmitted]=useState(false)
const [error,setError] = useState(false)

const changeLoginHandler = (e) => {
  //console.log(e.target.value)
  setloginInput(e.target.value)
  setError(false)

}

const changePasswordHandler = (e) => {
  setPasswordInput(e.target.value)
  setError(false)
}

const resetSubmission = () => {
setSubmitted(false)

}

const handleError = (e) => {
console.log('error',e)
setError(e)
}


const Errormessage = () => {
let message=''

if(error){
  console.log('error')
  message = 'Wrong password or login'
  
}
  
return message
  
}

const Back = () =>{
  return(
    <Backend  login={loginInput} 
              password={passwordInput} 
              reset={resetSubmission}
              submitted={submitted}
              error={(e)=>handleError(e)}
              toggle={props.toggle}
              
              />

  
  )
}
const onSubmitHandler = (e) => {
    e.preventDefault()
    console.log(loginInput,passwordInput)
    setSubmitted(true)
}

const passwordToggle = () => {
  setHidePassword(!hidepassword)
}

const securepassword = (p) => {
  let hiddentext = ''
    let len = p.length
    console.log(p,len)
    
    for(let i=0; i<len; i++){
      hiddentext += '*'
      //console.log(hiddentext)
    }
    //console.log(hiddentext)
    return setHiddenPassword(hiddentext)
}

const delayedsecure = () => {
  
  return(setTimeout(()=>setHidePassword(true),2000))
}

useEffect(()=>{
  setHidePassword(false)
  let password_input_element = document.getElementById('user_password')
  
  let user =  Object.entries(userlist).find(([key,value]) => 
              (value.email === loginInput) 
  )

  if(user!==undefined){

    console.log(user)

    // example of object destructuring
    let userinfo = {
      userid: [
        user[0],
        { second: user[1].password }
      ]
    };
    
    let { userid: [first, { second }] } = userinfo;

    console.log(first) //userid
  
    console.log(second) //password
  
    //input password text field value assigned according to login info
    //password_input_element.value = second
    
    setPasswordInput(second)
    securepassword(second)
    

    
    
    
    
    //setTimeout(()=>securepassword(second),1)
    //console.log(hiddentext)
    //password_input_element.value = securepassword(second)
    password_input_element.value = delayedsecure()
    
  }

},[loginInput])




  let loginvisibility = props.visible?'flex':'none'
  
  return(
    
    <div style={{
                  display:`${loginvisibility}`, 
                  flexDirection:'column', 
                  width:'300px',
                  lineHeight:'2',
                  border:'1px solid lightgray',
                  padding:'10px',
                  fontSize:'0.8rem',
                  boxSizing: 'borderBox',
                  alignItems:'center',
                  background:'linear-gradient(0deg, rgba(195,129,34,0.6) 0%, rgba(156,146,114,0.5) 100%)',
    }}
    
    >

<span>Click 'Login' Tab to Close</span>
      <form style={{
          display:'flex',
          flexDirection:'column',
          width:'200px',
          justifyContent:'right',
          alignItems:'center',
          border:'1px dashed lightblue',
          borderRadius:'15px',
          background:'linear-gradient(0deg, rgba(195,129,34,0.6) 27%, rgba(89,81,55,0.6) 66%)',
          boxShadow: '5px 10px rgb(89,81,55,0.3)'
          }}> 

        <h3 style={{textAlign:'center'}}>User Login</h3>

        <label forhtml='user_login'>Name : </label>

        <select  style={{width:'150px'}}
                id='user_login'
                type='text'
                onChange={changeLoginHandler} 
                defaultValue='notselected'
                required
                >
                <option value='notselected'>Choose</option>
                {Object.entries(userlist).map(([key,value,index]) => 
                <option key={index} value={value.email}>{value.firstname} {value.lastname}</option>
                )}              
        </select>

        <label forhtml='user_password'>Password : <a
        style={{cursor:'pointer'}}
        onClick={passwordToggle}
          >{hidepassword?'show':'hide'}</a></label>
        
        <input  id='user_password' 
                type='text' 
                
                onChange={changePasswordHandler}
                required
                value={hidepassword?hiddenPassword:passwordInput}
                style={{width:'150px'}}
                disabled

                >
        </input>

        <button onClick={onSubmitHandler}
                style={{width:'50px'}} 
                >Submit</button>

                
               
      </form>
      {submitted?<Back/>:null}
      {error?<Errormessage/>:null}
    </div>

  )
}

export default UserLoginScreen