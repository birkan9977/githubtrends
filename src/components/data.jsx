import React, { useState, useEffect, useContext, useRef } from 'react';
import { TextMinimize } from '../extraFunctions/dataFunctions';

import AppContext from '../app/context';
import { changeFilter } from '../store/reducerActions';
import AbortController from 'abort-controller';
import * as actions from '../store/fetchActions';
import FetchContext from '../app/fetchContext';

export default function DataLoader() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const { filters, dispatch } = useContext(AppContext);
  const { dispatchFetchOptions } = useContext(FetchContext);

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

  const headers = {
    headers: {
      'user-agent': 'GitHub Trending Repositories via React Js -by birkan9977-',
      Accept: 'application/json',
    },
  };

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const resetSubmit = () => {
    const action = {
      type: actions.manualSubmit,
      payload: false,
    };
    dispatchFetchOptions(action);
  };

  const prevUrl = usePrevious(filters.url);

  let setSessionStorage = () => {
    sessionStorage.setItem('language', filters.language);
    sessionStorage.setItem('stars', filters.stars);
    sessionStorage.setItem('keyword', filters.keyword);
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    //console.log(prevUrl, filters.url);

    if (prevUrl !== filters.url) {
      setReadMoreEmpty();

      setError(null);

      sendtoReducer('loading', true);

      fetch(filters.url, headers, { signal: signal })
        .then((response) => response.json())

        .then((data) => {
          setData(data.items);

          //global
          if (data.items) {
            sendtoReducer('count', data.items.length);
            sendtoReducer('loading', false);
          }
        })
        .catch((err) => {
          if (error.name === 'AbortError') return;
          setError(err);
          console.log('error', err);
          sendtoReducer('loading', false);
        });

      setSessionStorage();

      signal.addEventListener('abort', () => {
        //console.log(`fetch request for ${filters.url} aborted!`);
      });
    }
    //clean up after unmount
    return () => {
      controller.abort();
      setData(null);
      setSessionStorage();
      resetSubmit();
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
  })();

  return (
    <div>
      <p></p>
      <p>{error ? `Error: ${error}` : displayresults()}</p>

      <ul>
        {data
          ? data.map((item, index) => (
              <>
                <div id="repo-items">
                  <div id="repo-list-items">
                    <div id="order-number">{ItemIncrement()}</div>

                    <li id="repo-list-items-name">{item.name}</li>

                    <li id="repo-list-items-description">
                      {textMin(item.description, index + 1)}
                    </li>

                    <li id="repo-list-items-url">
                      <a href={item.html_url} target="_blank" rel="noopener">
                        GitHub Link
                      </a>
                    </li>

                    <li id="repo-list-items-stars">
                      {item.stargazers_count} Stars
                    </li>
                  </div>

                  <div id="repo-user-items">
                    <div id="repo-list-items-img">
                      <li id="repo-list-items-img-list">
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
