import React from 'react'

import Container from '@material-ui/core/Container';

import CreateList from '../components/CreateList'

function Home(props) {
  return ( 
    <Container>
      <p>welcome home {props.user.name}</p>
      <CreateList />
      {props.lists.map(list => (
        <h2 key={list._id}>{list.name}</h2>
      ))}
    </Container>
  )
}

export default Home