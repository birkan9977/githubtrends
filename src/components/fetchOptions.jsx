import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.5rem;

  .changeOptions {
    display: flex;
    flex-direction: row;
    align-items: center;
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
  margin-bottom: -1px;
  color: ${(props) => props.inputColor || 'palevioletred'};
  border-radius: 3px;
  :hover {
    cursor: pointer;
  }
`;

const Button = styled.button`
  display: block;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  width: 80px;
  height: auto;
`;

export default function FetchOptions() {
  const [fetchVisible, setFetchVisible] = useState(true);
  const [fetchOption, setFetchOption] = useState('manuel');

  const handleFetchVisibility = () => {
    setFetchVisible(!fetchVisible);
  };

  const handleOptionChange = (e) => {
    setFetchOption(e.target.value);
    console.log(e.target.value);
  };

  return (
    <Div id="fetch-options">
      <div className="changeOptions">
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
        <div className="changeOptions">
          <Input
            type="radio"
            name="fetch"
            id="FetchOnChange"
            value="fetchonchange"
            inputColor="rebeccapurple"
            onClick={handleOptionChange}
          />

          <a>
            <Label className="optionLabels" htmlFor="FetchOnChange">
              Fetch Data on Change
            </Label>
          </a>
        </div>

        <div className="changeOptions">
          <Input
            type="radio"
            name="fetch"
            id="manuel"
            value="manuel"
            onClick={handleOptionChange}
            defaultChecked
          />

          <Label className="optionLabels" htmlFor="manuel">
            Manuel Submit
          </Label>
        </div>
      </OptionalVisibility>

      <div
        style={
          fetchOption === 'manuel' ? { display: 'block' } : { display: 'none' }
        }
      >
        <Button>Submit</Button>
      </div>
    </Div>
  );
}
