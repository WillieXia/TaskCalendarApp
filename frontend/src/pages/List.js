import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { useSnackbar } from 'notistack'

import Container from '@material-ui/core/Container';

import parseError from '../helpers/parseError'

function List() {

  const { listId } = useParams()

  const [list, setList] = useState({})
  const [tasks, setTasks] = useState([])

  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    const fetchList = () => {
      axios.get(process.env.REACT_APP_API_URL + `list/${listId}`, {
      withCredentials: true
      })
      .then(res => {
        setList(res.data.list)
        setTasks(res.data.tasks)
      })
      .catch(err => {
        enqueueSnackbar(parseError(err), {
          variant: 'error'
        })
      })
    }
    fetchList()
  }, [listId])

  return (
    <Container>
      Hello, {list.name}
    </Container>
  )

}

export default List