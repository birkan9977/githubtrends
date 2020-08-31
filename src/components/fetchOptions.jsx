import React, { useState, useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';
import * as actions from '../store/fetchActions';
import FetchContext from '../app/fetchContext';
import AppContext from '../app/context';
import { manualFilter } from '../store/reducerActions';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.5rem;
  border: 1px solid gray;
  border-radius: 5px;

  .changeOptions {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .inputRadio {
    margin-left: 10px;
  }

  .disableSelect {
    user-select: none;
  }
`;

const OptionalVisibility = styled.div`
  ${(props) => (props.visible ? Div : 'display:none')};
`;

const Label = styled.label`
  color: papayawhip;
  padding: 0.1em;
  margin: 0.1em;
  :hover {
    cursor: pointer;
  }
  .optionLabels {
    margin-bottom: -20px;
  }
`;
const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: ${(props) => props.inputColor || 'palevioletred'};
  border-radius: 3px;
  :hover {
    cursor: pointer;
  }
`;

const Button = styled.button`
  display: block;
  color: hsl(340, 59%, 30%);
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  width: auto;
  height: auto;
`;

const Options = styled.div`
  display: ${Div};
  :hover {
    background: rgb(158, 112, 95);
    background: radial-gradient(
      circle,
      rgba(158, 112, 95, 0.7) 0%,
      rgba(150, 117, 131, 0.3) 100%
    );
    color: white;
  }
`;
const Hover = styled.div`
  :hover {
    color: #fefefe;
  }
`;

export default function FetchOptions(props) {
  const { fetchOptions, dispatchFetchOptions } = useContext(FetchContext);
  const { dispatch } = useContext(AppContext);
  const { fetchOption, hideOption } = fetchOptions;

  const [fetchVisible, setFetchVisible] = useState(!hideOption);
  const [localFetchOption, setFetchOption] = useState(fetchOption);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const fetchonchange = fetchOption === 'fetchonchange';
  const manual = fetchOption === 'manual';

  const prevFetchOption = usePrevious(fetchOption);

  let setSessionStorage = (key, value) => {
    sessionStorage.setItem(key, value);
  };

  useEffect(() => {
    if (prevFetchOption === fetchOption && manual) {
      //console.log('work once send data!!!', props.manualFilters);

      sendToFiltersReducer(props.manualFilters);
      sendFetchOptionToReducer('fetchonchange');
    } else {
      sendFetchOptionToReducer(localFetchOption);
      //console.log(fetchOption);
    }
  }, [localFetchOption]);

  const sendToFiltersReducer = (manualfilters) => {
    const action = {
      type: manualFilter,
      payload: { manualfilters },
    };
    dispatch(action);
  };

  const handleFetchVisibility = () => {
    setFetchVisible(!fetchVisible);
    sendHideOptionToReducer(fetchVisible);
  };

  const handleOptionChange = (e) => {
    setFetchOption(e.target.value);
  };

  const sendFetchOptionToReducer = (selectedOption) => {
    const action = {
      type: actions.fetchOption,
      payload: selectedOption,
    };
    dispatchFetchOptions(action);

    setSessionStorage('fetchOption', selectedOption);
  };

  const sendHideOptionToReducer = (selectedOption) => {
    const action = {
      type: actions.hideOptions,
      payload: selectedOption,
    };
    dispatchFetchOptions(action);

    //session storage accepts only string values
    let selectedHideOption = '';
    switch (true) {
      case selectedOption:
        selectedHideOption = 'true';
        console.log(hideOption);
        break;
      case !selectedOption:
        selectedHideOption = 'false';
        break;
    }
    console.log('test1');
    setSessionStorage('hideOption', selectedHideOption);
  };

  const handleSubmitFilters = () => {
    sendToFiltersReducer(props.manualFilters);
    manualSubmit();
  };

  const manualSubmit = () => {
    const action = {
      type: actions.manualSubmit,
      payload: true,
    };
    dispatchFetchOptions(action);
  };

  return (
    <Div id="fetch-options">
      <div className="changeOptions disableSelect">
        <Input
          type="checkbox"
          id="fetch-data"
          onClick={handleFetchVisibility}
          checked={fetchVisible}
        />
        <Label
          className="optionLabels"
          onClick={handleFetchVisibility}
          htmltFor="fetch-data"
        >
          {fetchVisible ? 'Hide ' : 'Show '}Fetch Options
        </Label>
      </div>

      <OptionalVisibility visible={fetchVisible}>
        <Options>
          <div className="changeOptions inputRadio disableSelect">
            <Input
              type="radio"
              name="fetch"
              id="FetchOnChange"
              value="fetchonchange"
              inputColor="rebeccapurple"
              onClick={handleOptionChange}
              defaultChecked={fetchonchange}
            />

            <Label className="optionLabels" htmlFor="FetchOnChange">
              <Hover>Fetch Data on Change</Hover>
            </Label>
          </div>

          <div className="changeOptions inputRadio disableSelect">
            <Input
              type="radio"
              name="fetch"
              id="manual"
              value="manual"
              onClick={handleOptionChange}
              defaultChecked={manual}
            />

            <Label className="optionLabels" htmlFor="manual">
              <Hover>Manual Submit</Hover>
            </Label>
          </div>
        </Options>
      </OptionalVisibility>

      <div
        style={
          localFetchOption === 'manual'
            ? { display: 'block' }
            : { display: 'none' }
        }
      >
        <Button onClick={handleSubmitFilters}>Submit Filters</Button>
      </div>
    </Div>
  );
}
