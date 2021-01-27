import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'

import parseError from '../helpers/parseError'

import { useSnackbar } from 'notistack'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CreateTask(props) {

  const [name, setName] = useState('');
  const [list, setList] = useState('');
  const [numOfCheckpoints, setNumOfCheckpoints] = useState(8);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    setIsLoading(true)
    axios.post(process.env.REACT_APP_API_URL + 'task/create', {
      name,
      listId: list,
      numOfCheckpoints
    }, {
      withCredentials: true
    })
    .then(res => {
      enqueueSnackbar(res.data.msg, {
        variant: 'success'
      })
      setName('')
      setList('')
      setNumOfCheckpoints(8)
      handleClose()
      setIsLoading(false)
    })
    .catch(err => {
      enqueueSnackbar(parseError(err), {
        variant: 'error'
      })
      setIsLoading(false)
    })
  };


  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleListChange = (e) => {
    setList(e.target.value)
  }

  const handleNumOfCheckpointsChange = (e) => {
    setNumOfCheckpoints(e.target.value)
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        New task
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Create a new task</DialogTitle>
        <DialogContent>
          <TextField id="taskName" label="Task Name" value={name} onChange={handleNameChange}/>
          <br/>
          <br/>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">List</InputLabel>
            <Select
              id="list"
              value={list}
              onChange={handleListChange}>
              {props.lists.map(list => (
                <MenuItem key={list._id} value={list._id}>{list.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <br />
          <TextField id="numOfCheckpoints" type="number" label="Number of Checkpoints" value={numOfCheckpoints} onChange={handleNumOfCheckpointsChange}/>
          <br/>
          <br />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Nevermind
          </Button>
          <Button onClick={handleCreate} color="primary" disabled={isLoading}>
            {!isLoading && 'Create'}
            {isLoading && <CircularProgress size={20} />}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateTask