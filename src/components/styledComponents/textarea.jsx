import React from 'react';
import styled, { keyframes, css } from 'styled-components';

// Create the keyframes
const Gradient = keyframes`

  0% {
    background: rgba(81, 184, 203, 0.3);
    
  }

  50% {
    background: rgb(109, 95, 101, 0.5);
  }

  100% {
    background: rgb(81, 184, 203, 0.3);
  }



`;

const styles = css`
  animation: ${Gradient} 2s linear infinite;
`;

const StyledTextArea = styled.textarea`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
  display: flex;
  resize: none;
  background: rgba(81, 184, 203, 0.5);
  wrap: soft;
  color: #333;
  line-height: 1.5;
  boxshadow: -5px 5px 10px 5px gray;
  padding: 15px 10px 10px;
  font-family: 'Roboto', sans-serif;
  margin: auto;
  margin-top: 10px;
  animation: ${Gradient} 5s linear infinite;
  animation-fill-mode: forwards;
`;

// Reusable Text Area Styled Component
// props >> (id:string),(value:string),(readOnly:boolean)
export default function TextArea(props) {
  const { readOnly, id, value } = props;

  return (
    <StyledTextArea id={id} value={value} readonly={readOnly}></StyledTextArea>
  );
}
