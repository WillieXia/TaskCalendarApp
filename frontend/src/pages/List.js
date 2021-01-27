import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { useSnackbar } from 'notistack'

import Container from '@material-ui/core/Container';

import CreateTask from '../components/CreateTask'

import parseError from '../helpers/parseError'

function List(props) {

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
      <p>Hello, {list.name}</p>
      <CreateTask lists={props.lists}/>
      {tasks.map(task => (
        <h2 key={task._id}>{task.name}</h2>
      ))}
    </Container>
  )

}

export default List