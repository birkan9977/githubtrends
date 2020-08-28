import React, { useState, useEffect, useContext, useRef } from 'react';
import { TextMinimize, keyIndex } from '../extraFunctions/dataFunctions';

import AppContext from '../app/context';
import { changeFilter } from '../store/reducerActions';
//import { idMaker } from '../extraFunctions/dataFunctions';

export default function DataLoader() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const { filters, dispatch } = useContext(AppContext);

  const setReadMoreEmpty = () => [];

  const sendtoReducer = (filterName, filterValue) => {
    const action = {
      type: changeFilter,
      payload: {
        filterName: filterName,
        filterValue: filterValue,
      },
    };
    dispatch(action);
  };

  //console.log(filters)

  const headers = {
    headers: {
      'user-agent': 'GitHub Trending Repositories via React Js -by birkan9977-',
      Accept: 'application/json',
    },
  };

  const ref = useRef();

  useEffect(() => {
    ref.current = data;

    setReadMoreEmpty();

    setError(null);

    sendtoReducer('loading', true);

    fetch(filters.url, headers)
      .then((response) => response.json())

      .then((data) => {
        setData(data.items);

        //global
        if (data.items) sendtoReducer('count', data.items.length);
        sendtoReducer('loading', false);
      })
      .catch((err) => {
        setError(err);
        console.log('error', err);
        sendtoReducer('loading', false);
      });

    //set to session storage at every mutation

    const setSessionStorage = () => {
      sessionStorage.setItem('language', filters.language);
      sessionStorage.setItem('stars', filters.stars);
      sessionStorage.setItem('keyword', filters.keyword);
    };

    setSessionStorage();

    //clean up after unmount
    return () => {
      setData(null);
      setSessionStorage();
    };
  }, [filters.url]);

  function displayresults() {
    let displaytext = '';

    if (filters.loading) {
      displaytext = 'Loading Data Please Wait...';
    } else {
      if (filters.count > 1) {
        displaytext = `Displaying ${filters.count} results.`;
      } else if (filters.count === 1) {
        displaytext = `Displaying ${filters.count} result.`;
      } else {
        displaytext =
          'Search Filters returned no results. Try changing search filters.';
      }
    }
    return displaytext;
  }

  //console.log(readMore)
  function textMin(text, keyNo) {
    return (
      <TextMinimize keyNo={keyNo} text={text} setEmpty={setReadMoreEmpty} />
    );
  }

  const ItemIncrement = (function () {
    let counter = 0;
    return function () {
      counter += 1;
      return counter;
    };
  })(); //closure with self invoked function:)

  //const genid = idMaker();

  return (
    <div>
      <p></p>
      <p>{error ? `Error: ${error}` : displayresults()}</p>

      <ul>
        {data && ref.current !== data
          ? data.map((item, index) => (
              <>
                <div id="repo-items">
                  <div id="repo-list-items">
                    <div id="order-number">{ItemIncrement()}</div>

                    {/*console.log(genid.next().value)*/}

                    <li
                      id="repo-list-items-name"
                      key={`repo-list-items-name-${index}`}
                    >
                      {item.name}
                    </li>

                    <li
                      id="repo-list-items-description"
                      key={`repo-list-items-description-${index}`}
                    >
                      {textMin(item.description, index + 1)}
                    </li>

                    <li
                      id="repo-list-items-url"
                      key={`repo-list-items-url-${index}`}
                    >
                      <a href={item.html_url} target="_blank" rel="noopener">
                        GitHub Link
                      </a>
                    </li>

                    <li
                      id="repo-list-items-stars"
                      key={`repo-list-items-stars-${index}`}
                    >
                      {item.stargazers_count} Stars
                    </li>
                  </div>

                  <div id="repo-user-items">
                    <div id="repo-list-items-img">
                      <li
                        id="repo-list-items-img-list"
                        key={`repo-list-items-img-list-${index}`}
                      >
                        {item.language ? item.language : null}
                      </li>

                      <figure id="repo-img-figure">
                        <img src={item.owner.avatar_url} alt={item.login}></img>
                        <figcaption id="repo-img-caption">
                          {item.owner.login}
                        </figcaption>
                      </figure>
                    </div>
                  </div>
                </div>
              </>
            ))
          : null}
      </ul>
    </div>
  );
}
