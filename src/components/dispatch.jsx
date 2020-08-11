

const dispatch = (key,value) =>{
  return(
  <AppConsumer>
      { context =>
      <>
          {context.setFilter(key,value)}   
      </>
      }
  </AppConsumer>
  )
}

{dispatch('url',url)}