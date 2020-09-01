import React, { useState, useEffect } from 'react';
import customData from '../database/data.json';
import Loadable from 'react-loadable';
import Loading from './loading-component';


const Backend = Loadable({
  loader: () => import('./backend'),
  loading: Loading,
});

const UserLoginScreen = (props) => {
  const userlist = customData;

  const [loginInput, setloginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [hiddenPassword, setHiddenPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [timerid, setTimerid] = useState(0);
  const [timerMiliseconds, setTimerMiliseconds] = useState(1000);

  const changeLoginHandler = (e) => {
    setloginInput(e.target.value);
    setError(false);
  };

  const changePasswordHandler = (e) => {
    //using keyPress instead of onChange to hide password with delay
    switch (e.which) {
      case 13:
        //return carriage
        //console.log(e.which)
        break;

      default:
        let currentValue = passwordInput;

        //console.log(e.which)

        let lastchar = String.fromCharCode(e.which);
        currentValue += lastchar;

        setPasswordInput(currentValue);

        securePassword(currentValue);

        setError(false);
    }
  };

  const deleteChar = (e) => {
    //backspace delete ascii '8'
    if (e.which == 8) {
      let currentValue = passwordInput;
      currentValue = currentValue.substring(0, currentValue.length - 1);

      setPasswordInput(currentValue);
      securePassword(currentValue);
      setError(false);
    }
  };
  const resetSubmission = () => {
    setSubmitted(false);
  };

  const handleError = (e) => {
    setError(e);
  };

  const Errormessage = () => {
    let message = '';

    if (error) {
      message = 'Wrong password or login';
    }

    return message;
  };

  const Back = () => {
    return (
      <Backend
        login={loginInput}
        password={passwordInput}
        reset={resetSubmission}
        submitted={submitted}
        error={(e) => handleError(e)}
        loginChange={props.loginChange}
      />
    );
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();

    setSubmitted(true);
  };

  const passwordshowtoggle = () => {
    setHidePassword(!hidePassword);
  };

  const changeTypePassword = () => {
    if (hidePassword) {
      return hiddenPassword;
    } else {
      return passwordInput;
    }
  };

  const securePassword = (password) => {
    let hiddenText = '';
    let len = password.length;
    //console.log(password,len)

    for (let i = 1; i <= len; i++) {
      //view last character not hidden!
      if (i === len) {
        hiddenText += password[len - 1];
      } else {
        hiddenText += '*';
      }
    }

    setHiddenPassword(hiddenText);
    clearTimeout(timerid);
    setTimerid(setTimeout(() => completeSecure(hiddenText), timerMiliseconds));
  };

  const completeSecure = (password) => {
    //replace password with '*'
    let len = password.length;
    let passwordDestructured = [...password];

    if (len !== 0) {
      passwordDestructured.splice(passwordDestructured.length - 1, 1, '*');
      let newHiddenString = passwordDestructured.join('');
      setHiddenPassword(newHiddenString);
    }
  };
  const delayedsecure = () => {
    //works after 'useEffect' to hide password in whole
    return setTimeout(() => setHidePassword(true), timerMiliseconds);
  };
  

  useEffect(() => {
    setHidePassword(false);

    let user = userlist.find((user) => user.email === loginInput);
    
    if (user) {
      // example of object destructuring
      let userInfo = {
        userid: [user, { userPassword: user.password }],
      };

      let {
        userid: [userDetails, { userPassword }],
      } = userInfo;

      //input password text field value assigned according to login info
      //password_input_element.value = { second }
      //console.log('userDetails',userDetails)

      setPasswordInput(userPassword);
      securePassword(userPassword);
      delayedsecure();
    }
  }, [loginInput]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        lineHeight: '2',
        border: '1px solid lightgray',
        padding: '10px',
        fontSize: '0.8rem',
        boxSizing: 'borderBox',
        alignItems: 'center',
        background:
          'linear-gradient(0deg, rgba(195,129,34,0.6) 0%, rgba(156,146,114,0.5) 100%)',
        marginTop: '1.5rem',
      }}
    >
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '200px',
          justifyContent: 'right',
          alignItems: 'center',
          border: '1px dashed lightblue',
          borderRadius: '15px',
          background:
            'linear-gradient(0deg, rgba(195,129,34,0.6) 27%, rgba(89,81,55,0.6) 66%)',
          boxShadow: '5px 10px rgb(89,81,55,0.3)',
        }}
      >
        <h3 style={{ textAlign: 'center' }}>User Login</h3>

        <label forhtml="user_login">Name : </label>

        <select
          style={{ width: '150px' }}
          id="user_login"
          type="text"
          onChange={changeLoginHandler}
          defaultValue="notselected"
          required
        >
          <option value="notselected">Choose</option>
          {Object.entries(userlist).map(([key, value, index]) => (
            <option key={index} value={value.email}>
              {value.firstname} {value.lastname}
            </option>
          ))}
        </select>

        <label style={{ marginTop: '20px' }} forhtml="user_password">
          Password :{' '}
          <a style={{ cursor: 'pointer' }} onClick={passwordshowtoggle}>
            {hidePassword ? 'show' : 'hide'}
          </a>
        </label>

        <label forhtml="timer-miliseconds" style={{ marginBottom: '-10px' }}>
          Timer Hide Miliseconds
        </label>

        <input
          id="timer-miliseconds"
          style={{ margin: '10px' }}
          type="number"
          defaultValue="1000"
          step="100"
          min="0"
          max="2000"
          onChange={(e) => setTimerMiliseconds(e.target.value)}
        ></input>

        <input
          id="user_password"
          type="text"
          onKeyPress={changePasswordHandler}
          onKeyDown={deleteChar}
          required
          value={changeTypePassword()}
          style={{ width: '150px' }}
        ></input>

        <button onClick={onSubmitHandler} style={{ width: '50px' }}>
          Submit
        </button>
      </form>

      {submitted ? <Back /> : null}
      {error ? <Errormessage /> : null}
    </div>
  );
};

export default UserLoginScreen;
