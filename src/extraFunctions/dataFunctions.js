import React, { useState} from 'react';
import { round, random }  from 'mathjs'


export const convertArrayToObject = (array, key, index) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj[index],
      [item[key]]: item,
    };
  }, initialValue);
};

export function TextMinimize(props){
  const[readMore,setReadMore]=useState([]);
  props.setEmpty()
  const text = props.text
  const key = props.key

  if(text==null)return text
  let len = text.length;
  let maxlen = 30;
  if(len>maxlen){
    
    let spaceIndex = text.indexOf(' ',maxlen)
    
    let dotIndex = text.indexOf('.',maxlen)
    let commaIndex = text.indexOf(',',maxlen)
    let commawithSpaceIndex = text.indexOf('，',maxlen)
    let chineseComma = text.indexOf('、',maxlen)
    let splitIndex = maxlen

    if(spaceIndex<0){
      
      let strSplit = text.split(' ')
      let lastWord = strSplit[strSplit.length-1]
      //console.log(lastWord)
      if(lastWord===text && commawithSpaceIndex!==-1){ //chinese with special char '，'
      splitIndex = commawithSpaceIndex
      //console.log(dotIndex,commaIndex,commawithSpaceIndex,splitIndex)
      } else if (lastWord===text && chineseComma!==-1) {
        splitIndex = chineseComma
      }
        else if (lastWord!==text){
        //console.log('break and return text')
        return text
      } else if (dotIndex<0 && commaIndex>0 ) {
      splitIndex = commaIndex
      } else if(dotIndex<0 && commaIndex<0 && commawithSpaceIndex<0){
      splitIndex = maxlen
      } else {
        splitIndex = maxlen

      }

    } else {
      splitIndex = spaceIndex
    }
    let subtractedtext = text.substr(0,splitIndex)

    const extraContent =
          <div>
            <p className="extra-content">
              {text}
            </p>
          </div>

    
const handleClick = (key) => {
  const selectedIndex = readMore.indexOf(key)
  let newSelected = []

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(readMore, key)
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(readMore.slice(1))
  } else if (selectedIndex === readMore.length - 1) {
    newSelected = newSelected.concat(readMore.slice(0, -1))
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      readMore.slice(0, selectedIndex),
      readMore.slice(selectedIndex + 1)
    )
  }

  setReadMore(newSelected)
}

    //console.log('key',key,spaceIndex,text)

    let more = readMore.indexOf(key) !== -1

    const linkName = more?' ...Read Less << ':' ...Read More >> '


    return (
      <div id='more-text'>

        {!more && subtractedtext}
        {more && extraContent}
        <a id='more-text-link'
        
        onClick={()=>{handleClick(key)}}>
        
        {linkName}
        
        </a>
        
        
      </div>
    )

  }else{
    return text
  }


}





export const keyIndex = (function () {
  let counter = round(random(100, 1000))
  return function () {counter += 1; return counter}
})();//closure with self invoked function:)

