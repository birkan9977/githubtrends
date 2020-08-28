import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.5rem;

  .changeOptions {
    display: flex;
    flex-direction:row;
    align-items:center;
  }
`


const Label = styled.label`
  color: papayawhip;
  padding: 0.1em;
  margin: 0.1em;
  :hover{
    cursor:pointer
  }
    .optionLabels{
      
      margin-bottom: -20px;
      
    }

`
const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  margin-bottom: -1px;
  color: ${props => props.inputColor || "palevioletred"};
  background: papayawhip;
  border: none;
  border-radius: 3px;
  :hover{
    cursor:pointer
  }
`

const Button = styled.button`
      display: inline-block;
      color: palevioletred;
      font-size: 1em;
      margin: 1em;
      padding: 0.25em 1em;
      border: 2px solid palevioletred;
      border-radius: 3px;
      width: 80px;
      height: auto;
`

export default function FetchOptions(){


return (
  <Div id="fetch-options">
      <div className="changeOptions">
      <Input type ="checkbox"
              id="fetch-data"
              defaultChecked
      />
      <Label className='optionLabels' htmltFor='fetch-data'>Fetch Options</Label>
      </div>

      <div className="changeOptions">
      <Input type='radio' 
              name="fetch" 
              id="onChange" 
              value="onchange" 
              inputColor="rebeccapurple"/>
      <Label className='optionLabels' htmlFor="onChange">Fetch Data on Change</Label>
      </div>

      <div className="changeOptions">
      <Input  type='radio' 
              name="fetch" 
              id="manuel" 
              value="manuel" 
              defaultChecked/>
      <Label className='optionLabels' htmlFor="manuel">Manuel Submit</Label>
      </div>

      <Button>Submit</Button>
  </Div>
)

}