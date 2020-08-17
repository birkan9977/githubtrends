import React, { useContext, useState, useEffect } from 'react';
import Backend from './backend'
import userContext from '../app/usercontext'
import customData from '../database/data.json'



const UserLoginScreen = (props) => {

 const userlist = customData
//console.log(userlist)
const { users } = useContext(userContext)

const [loginInput,setloginInput]=useState('abc@abc')
const [passwordInput,setPasswordInput]=useState('1234')
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
              
              />

  
  )
}
const onSubmitHandler = (e) => {
    e.preventDefault()
    console.log(loginInput,passwordInput)
    setSubmitted(true)
}

useEffect(()=>{
  let element = document.getElementById('user_password')
  let user = Object.entries(userlist).find(([key,value]) => 
  (value.email === loginInput) 
  )

  //console.log(user[1].password)

  element.value = user[1].password
  setPasswordInput(element.value)
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
                defaultValue=''
                required
                >
                {Object.entries(userlist).map(([key,value,index]) => 
                <option key={index} value={value.email}>{value.firstname} {value.lastname}</option>
                )}              
        </select>

        <label forhtml='user_password'>Password : </label>

        <input  id='user_password' 
                type='text' 
                onChange={changePasswordHandler}
                required
                defaultValue=''
                style={{width:'150px'}}>
        </input>

        <button onClick={onSubmitHandler}
                style={{width:'50px'}} 
                >Submit</button>

                {/*Below code is to update all comps after context is updated 
                beginning from app*/}
                {users.user.loggedin?props.user(users.user.userid):null}
      </form>
      {submitted?<Back/>:null}
      {error?<Errormessage/>:null}
    </div>

  )
}

export default UserLoginScreen