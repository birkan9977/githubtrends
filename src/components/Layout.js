import React, { Suspense, lazy, useContext, useState, useEffect } from 'react';
import FilterQuery from './filter';
import AppContext from '../app/context';
import '../styles/mainOutput.css';
import userContext from '../app/usercontext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect,
} from 'react-router-dom';
import FetchContext from '../app/fetchContext';
import Loadable from 'react-loadable';
import Loading from './loading-component';

//react-loadable third-party plugin
const DataLoader = Loadable({
  loader: () => import('./data'),
  loading: Loading,
});
const UserLoginScreen = Loadable({
  loader: () => import('./userLoginScreen'),
  loading: Loading,
});
const UserInfo = Loadable({
  loader: () => import('./userinfo'),
  loading: Loading,
});
const TextArea = Loadable({
  loader: () => import('./styledComponents/textarea'),
  loading: Loading,
});

export default function Layout() {
  const { filters } = useContext(AppContext);
  const { users } = useContext(userContext);
  const { fetchOptions } = useContext(FetchContext);

  const [login, setLogin] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');
  const loggedin = users.user.loggedin;
  const username = users.user.info.firstname;
  const display = fetchOptions.display;

  useEffect(() => {
    setLogin(false);
  }, [login]);

  function handleCurrentLocation(e) {
    setCurrentLocation(e);
  }

  const TopChart = () => {
    return (
      <div>
        {' '}
        {loggedin ? `${username}'s ` : null}
        Top {filters.count > 0 ? filters.count : '30'}
        {` Chart for '${filters.language}'`}
      </div>
    );
  };

  const handleLoginChange = () => {
    setLogin(true);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  return (
    <main id="main">
      <header id="header">
        <div className="page-title">
          <h1>GitHub Trending Repositories</h1>
        </div>

        <div className="user-info">
          <UserInfo />
        </div>
      </header>

      <nav id="topics-nav-bar">
        <Router>
          <ul>
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/hot_repos">
              <li>Hot Repos</li>
            </Link>
            <Link to="/contact">
              <li>Contact</li>
            </Link>
            <Link to="/references">
              <li>References</li>
            </Link>
            <Link to="/login">
              <li>Login</li>
            </Link>

            <Switch>
              <Route exact path="/">
                <GetLocation currentPath={(e) => handleCurrentLocation(e)} />
              </Route>
              <Route path="/hot_repos">
                <GetLocation currentPath={(e) => handleCurrentLocation(e)} />
              </Route>
              <Route path="/contact">
                <GetLocation currentPath={(e) => handleCurrentLocation(e)} />
              </Route>
              <Route path="/references">
                <GetLocation currentPath={(e) => handleCurrentLocation(e)} />
              </Route>
              <Route path="/login">
                <GetLocation currentPath={(e) => handleCurrentLocation(e)} />
              </Route>
            </Switch>

            {login ? <Redirect to="/hot_repos" /> : null}
          </ul>
        </Router>
      </nav>

      <section id="middle-section">
        <nav id="left-nav-bar">
          <h3>Search:</h3>

          <FilterQuery />
        </nav>

        <section id="center-section">
          {currentLocation}

          {currentLocation === '/login' ? (
            <div
              id="login"
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <UserLoginScreen loginChange={handleLoginChange} />
            </div>
          ) : null}

          {currentLocation === '/hot_repos' ? (
            <div id="data-section" style={{ display: 'block' }}>
              <h2>
                <TopChart />
              </h2>
              {display ? (
                <div>
                  <DataLoader />
                </div>
              ) : null}
            </div>
          ) : null}
        </section>

        <nav id="right-nav-bar">
          <h3>Filters:</h3>

          <p>Language: {filters.language}</p>
          <p>Stars: {filters.stars}</p>
          <p>Keyword: {filters.keyword}</p>

          <fieldset className="animate">
            <legend htmlFor="url-textarea">Api address</legend>
            <TextArea id="url-textarea" value={filters.url} readOnly={true} />
          </fieldset>
        </nav>
      </section>

      <footer className="box" id="footer">
        <h4>mailbirkan@gmail.com - Created by GitHub ID: Birkan9977</h4>
      </footer>
    </main>
  );
}

function GetLocation(props) {
  let history = useHistory();
  let currentPath = history ? history.location.pathname : null;

  useEffect(() => {
    props.currentPath(currentPath);
  }, [props]);

  return <></>;
}
