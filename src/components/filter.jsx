import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../app/context';
import { changeFilter, defaultFilter } from '../store/reducerActions';
import { idMaker } from '../extraFunctions/dataFunctions';
import FetchOptions from './fetchOptions.jsx';

const FilterQuery = () => {
  const { filters, dispatch } = useContext(AppContext);
  //console.log('filters',filters)
  const [keyword, setKeyword] = useState('');

  const handleTextKeyChange = (e) => {
    setKeyword(e.target.value);
  };

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

  const resetFilters = () => {
    const action = {
      type: defaultFilter,
    };
    dispatch(action);
  };

  useEffect(() => {
    let elemLanguage = document.getElementById('dropdown-language');
    elemLanguage.value = filters.language;

    let elemStars = document.getElementById('dropdown-followers');
    elemStars.value = filters.stars;

    let elemKeyword = document.getElementById('input-keyword');
    elemKeyword.value = filters.keyword;
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

  const gen = idMaker();

  //console.log(gen.next().value)

  return (
    <>
      <FetchOptions />
      <div id="filter-queries" className="disable-select">
        <label htmlFor="dropdown-language" id="label-language">
          Language
        </label>

        <select
          id="dropdown-language"
          name="dropdown-language"
          defaultValue={filters.language}
          onChange={(e) => sendtoReducer('language', e.target.value)}
        >
          {Object.entries(codelanguages)
            .sort()
            .map(([key, value, index]) => (
              <option key={gen.next().value} value={value}>
                {key}
              </option>
            ))}
        </select>

        <label htmlFor="dropdown-followers" id="label-followers">
          Stars greater than:
        </label>

        <select
          id="dropdown-followers"
          defaultValue={filters.stars}
          onChange={(e) => sendtoReducer('stars', e.target.value)}
        >
          {Object.entries(starValues)
            .sort((a, b) => a[1] - b[1])
            .map(([key, value, index]) => (
              <option key={gen.next().value} value={value}>
                {key}
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
          onChange={handleTextKeyChange}
          onKeyPress={(e) =>
            e.which === 13 ? sendtoReducer('keyword', keyword) : null
          }
        >
          {/*console.log(keyword)*/}
        </input>

        <button onClick={() => sendtoReducer('keyword', keyword)}>
          Submit Keyword
        </button>
        <button onClick={() => resetFilters()}>Reset Filters</button>
      </div>
    </>
  );
};

export default FilterQuery;
