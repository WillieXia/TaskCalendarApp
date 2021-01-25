import React from 'react'
import { useParams } from 'react-router-dom'

import Container from '@material-ui/core/Container';

function List(props) {

  const { listId } = useParams()

  return (
    <Container>list page for {listId}</Container>
  )
}

export default List