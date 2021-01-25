import React from 'react'

import CreateList from '../components/CreateList'

function Home(props) {
  return ( 
    <div>
      <p>welcome home {props.user.name}</p>
      <CreateList />
    </div>
  )
}

export default Home