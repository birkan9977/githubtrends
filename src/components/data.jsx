import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  resultCount,
  filteredUrl,
  loadingFunc,
  selectLanguage,
  selectStars,
  selectKeyword,
  selectCount,


} from '../app/filterslice'

export default function DataLoader (){
  const globCount = useSelector(selectCount);
  const globStars = useSelector(selectStars);
  const globLanguage = useSelector(selectLanguage);
  const globkeyword = useSelector(selectKeyword);

  const[data,setData] = useState([]);
  const[loading,setLoading] = useState(true)
  const[error,setError] = useState(null)
  const[readMore,setReadMore]=useState([]);

  const dispatch = useDispatch()

  //console.log('Data/filterLanguage: ',globLanguage)
  //console.log('Data/filterStars>: ',globStars)
  //console.log('Data/filterKeyword>: ',reduxloading)

  let filterLanguage = ''
  if(globLanguage==='c++'){
    filterLanguage = 'language:c%2B%2B'
  }else if (globLanguage===''){
    filterLanguage = ''
  } else {
    filterLanguage = `language:${globLanguage}`

  }

  let url = `https://api.github.com/search/repositories?q=${globkeyword} stars:>=${globStars} ${filterLanguage} sort:stars`

  
  const itemsCount = ((len) => dispatch(resultCount(len)))
  const isLoading = ((val) => dispatch(loadingFunc(val)))
  const isfilteredUrl = ((val) => dispatch(filteredUrl(val)))


  useEffect(() => {
    setLoading(true)
    isLoading(true)

    setReadMore([])
    setError(null)

      fetch(url, {
        headers: {
          'user-agent': 'GitHub Trending Repositories via React Js -by birkan9977-',
          'Accept': 'application/json'
        }
      })
          .then(response => response.json())
          .then(data => {
            setData(data.items)
            setLoading(false)
        
            itemsCount(data.items.length)
           
          })
          .catch((err) => {
            setError(err);
            console.log('error',err)
          })

          isfilteredUrl(url)
          isLoading(loading)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[url]); 
  
  
 
  
  
  let noItemIncrement = (function () {
    let noItem = 0
    return function () {noItem ++;return noItem}
    
  })();//closure with immidiately invoked (self) function

  

  function language(codeLanguage){
  if (codeLanguage!=null){
     return (
        <>
        {/*<span>Language</span>*/}
        <p>{codeLanguage}</p>
        </>
       )
  } 
}

let keyIndex = (function () {
  let counter = 0
  return function () {counter += 1; return counter}
})();//closure with self invoked function:)


function textminimize(text,key){

  if(text==null)return text
  let len = text.length;
  let maxlen = 30;
  if(len>maxlen){
    
    let spaceIndex = text.indexOf(' ',maxlen)
    if(spaceIndex<0){
      
      
    }
    let dotIndex = text.indexOf('.',maxlen)
    let commaIndex = text.indexOf(',',maxlen)
    let commawithSpaceIndex = text.indexOf('，',maxlen)
    let splitIndex = maxlen
    if(spaceIndex<0){
      
      let strSplit = text.split(' ')
      let lastWord = strSplit[strSplit.length-1]
      //console.log(lastWord)
      if(lastWord===text){ //chinese with special char '，'
      splitIndex = commawithSpaceIndex
      //console.log(dotIndex,commaIndex,commawithSpaceIndex,splitIndex)
      } else if (lastWord!==text){
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


function displayresults(){
  let displaytext=''

    if(loading){
      displaytext = 'Loading Data Please Wait...'
    }else{
      if(globCount>0){
        displaytext =  `Displaying ${globCount} results.`
      } else {
        displaytext = 'Change Search Criteria'
      }
    }
    return displaytext
}

//console.log(readMore)

  return (
      <div>
        <p>{displayresults()}</p>
        <p>{error?`Error: ${error}`:null}</p>
          <ul>
            {data?data.map((item,index) =>
            <>
            <div id='repo-items'>
              <div id='repo-list-items'>
                <div id='order-number'>
                {noItemIncrement()}
                </div>

                <li id='repo-list-items-name' 
                key = {keyIndex()+'id'+item.id}>{item.name}</li>
                
                <li id='repo-list-items-description' 
                key = {keyIndex()+'des' + item.id}>{textminimize(item.description,(index+1))}</li>
                
                
                <li id='repo-list-items-url' 
                key = {keyIndex()+'url' + item.id}><a href={item.html_url} target='_blank' rel="noopener">GitHub Link</a></li>
                
                
                <li id='repo-list-items-stars' 
                key = {keyIndex()+'star' + item.id}>{item.stargazers_count} Stars</li>
                
              </div>
                
            <div id= 'repo-user-items'>
              <div id = 'repo-list-items-img'>
                <li id='repo-list-items-img-list' 
                key = {keyIndex()+'lan' + item.id}>
                {language(item.language)}
                
                
                </li>

                <figure id='repo-img-figure'><img src={item.owner.avatar_url} alt={item.login}></img>
                <figcaption id= 'repo-img-caption'>{item.owner.login}</figcaption>
                </figure>
              </div>
            </div>
                
            </div>
            </>
            ):<p>{console.log('no data')}Search Filters returned no results. Try changing search filters.</p>}
          </ul>
      </div>

  )
}
