import React, { useState, useContext, useEffect, useRef } from 'react';
import AppContext from '../app/context';
import { changeFilter, defaultFilter } from '../store/reducerActions';
import FetchOptions from './fetchOptions.jsx';
import FetchContext from '../app/fetchContext';
import InitialFilters from '../app/context';
import * as actions from '../store/fetchActions';

const FilterQuery = () => {
  const { filters, dispatch } = useContext(AppContext);
  const [keyword, setKeyword] = useState('');
  const { fetchOptions, dispatchFetchOptions } = useContext(FetchContext);
  const { fetchOption, manualSubmit } = fetchOptions;
  const [state, setState] = useState({
    stars: filters.stars,
    language: filters.language,
    keyword: filters.keyword,
  });
  const manual = fetchOption === 'manual';
  const fetchonchange = fetchOption === 'fetchonchange';

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const prevFetchOption = usePrevious(fetchOption);

  const handleMenu = (filterValues) => {
    let elemLanguage = document.getElementById('dropdown-language');
    elemLanguage.value = filterValues.language;

    let elemStars = document.getElementById('dropdown-followers');
    elemStars.value = filterValues.stars;

    let elemKeyword = document.getElementById('input-keyword');
    elemKeyword.value = filterValues.keyword;
  };

  const handleManualReset = () => {
    let initialFilters = {
      stars: InitialFilters._currentValue.stars,
      language: InitialFilters._currentValue.language,
      keyword: InitialFilters._currentValue.keyword,
    };

    setState(initialFilters);
    handleMenu(initialFilters);
    if (manualSubmit) resetSubmit();
  };

  const handleManualFilters = (filterName, filterValue) => {
    let newState = {
      ...state,
      [filterName]: filterValue,
    };
    setState(newState);
    console.log('filtersManual:', newState);
    if (manualSubmit) resetSubmit();
  };

  const handleTextKeyChange = (e) => {
    setKeyword(e.target.value);
  };

  const sendtoReducer = (filterName, filterValue) => {
    if (prevFetchOption === fetchOption && fetchonchange) {
      console.log('sendToReducerOnChange');
      const action = {
        type: changeFilter,
        payload: {
          filterName: filterName,
          filterValue: filterValue,
        },
      };
      dispatch(action);
    }
  };

  const resetSubmit = () => {
    const action = {
      type: actions.manualSubmit,
      payload: false,
    };
    dispatchFetchOptions(action);
  };
  const resetFilters = () => {
    const action = {
      type: defaultFilter,
    };
    dispatch(action);
  };

  useEffect(() => {
    console.log(filters);
    handleMenu(filters);
  }, [filters]);

  const codelanguages = {
    JavaScript: 'JavaScript',
    Python: 'Python',
    Java: 'Java',
    'C++': 'C++',
    Swift: 'Swift',
    Ruby: 'Ruby',
    C: 'C',
    'C#': 'C#',
    Rust: 'Rust',
    TypeScript: 'TypeScript',
    Dart: 'Dart',
    Shell: 'Shell',
    'Objective-C': 'Objective-C',
    CSS: 'CSS',
    All: 'All',
  };

  const starValues = {
    0: 0,
    100: 100,
    500: 500,
    '1k': 1000,
    '5k': 5000,
    '10k': 10000,
    '20k': 20000,
    '30k': 30000,
    '40k': 40000,
    '50k': 50000,
    '100k': 100000,
  };

  return (
    <>
      <FetchOptions manualFilters={state} />
      <div id="filter-queries" className="disable-select">
        <label htmlFor="dropdown-language" id="label-language">
          Language
        </label>

        <select
          id="dropdown-language"
          name="dropdown-language"
          defaultValue={filters.language}
          onChange={(e) =>
            manual
              ? handleManualFilters('language', e.target.value)
              : sendtoReducer('language', e.target.value)
          }
        >
          {Object.entries(codelanguages)
            .sort()
            .map(([language, value]) => (
              <option key={`language-${value}`} value={value}>
                {language}
              </option>
            ))}
        </select>

        <label htmlFor="dropdown-followers" id="label-followers">
          Stars greater than:
        </label>

        <select
          id="dropdown-followers"
          defaultValue={filters.stars}
          onChange={(e) =>
            manual
              ? handleManualFilters('stars', e.target.value)
              : sendtoReducer('stars', e.target.value)
          }
        >
          {Object.entries(starValues)
            .sort((a, b) => a[1] - b[1])
            .map(([stars, value]) => (
              <option key={`followers-${value}`} value={value}>
                {stars}
              </option>
            ))}
        </select>

        <label htmlFor="input-keyword" id="label-keyword">
          Search Keyword
        </label>

        <input
          type="text"
          id="input-keyword"
          defaultValue={filters.keyword}
          onChange={
            manual
              ? (e) => handleManualFilters('keyword', e.target.value)
              : handleTextKeyChange
          }
          onKeyPress={
            fetchonchange
              ? (e) =>
                  e.which === 13
                    ? manual
                      ? handleManualFilters('keyword', keyword)
                      : sendtoReducer('keyword', keyword)
                    : null
              : null
          }
        ></input>

        <button
          style={manual ? { display: 'none' } : { display: 'block' }}
          onClick={() =>
            manual
              ? handleManualFilters('keyword', keyword)
              : sendtoReducer('keyword', keyword)
          }
        >
          Submit Keyword
        </button>
        <button onClick={() => (manual ? handleManualReset() : resetFilters())}>
          Reset Filters
        </button>
      </div>
    </>
  );
};

export default FilterQuery;
