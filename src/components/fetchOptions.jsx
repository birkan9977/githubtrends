import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import * as actions from '../store/fetchActions';
import FetchContext from '../app/fetchContext';

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

export default function FetchOptions() {
  const [fetchVisible, setFetchVisible] = useState(true);
  const [fetchOption, setFetchOption] = useState('manuel');
  const { fetchOptions, dispatchFetchOptions } = useContext(FetchContext);

  const handleFetchVisibility = () => {
    setFetchVisible(!fetchVisible);
    //console.log(fetchVisible);
    sendHideOptionToReducer(fetchVisible);
  };

  const handleOptionChange = (e) => {
    setFetchOption(e.target.value);
    //console.log(e.target.value);
    sendFetchOptionToReducer(e.target.value);
  };

  const sendFetchOptionToReducer = (selectedOption) => {
    const action = {
      type: actions.fetchOption,
      payload: selectedOption,
    };
    dispatchFetchOptions(action);
  };

  const sendHideOptionToReducer = (selectedOption) => {
    const action = {
      type: actions.hideOptions,
      payload: selectedOption,
    };
    dispatchFetchOptions(action);
    // reset manual submit
    if (selectedOption === 'fetchonchange') resetSubmit();
  };

  const handleSubmitFilters = () => {
    const action = {
      type: actions.manualSubmit,
      payload: true,
    };
    dispatchFetchOptions(action);
  };

  const resetSubmit = () => {
    const action = {
      type: actions.manualSubmit,
      payload: false,
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
            />

            <Label className="optionLabels" htmlFor="FetchOnChange">
              <Hover>Fetch Data on Change</Hover>
            </Label>
          </div>

          <div className="changeOptions inputRadio disableSelect">
            <Input
              type="radio"
              name="fetch"
              id="manuel"
              value="manuel"
              onClick={handleOptionChange}
              defaultChecked
            />

            <Label className="optionLabels" htmlFor="manuel">
              <Hover>Manuel Submit</Hover>
            </Label>
          </div>
        </Options>
      </OptionalVisibility>

      <div
        style={
          fetchOption === 'manuel' ? { display: 'block' } : { display: 'none' }
        }
      >
        <Button onClick={handleSubmitFilters}>Submit Filters</Button>
      </div>
    </Div>
  );
}
