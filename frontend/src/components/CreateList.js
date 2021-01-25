import React, { useState } from 'react'
import axios from 'axios'

// Material imports
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';

import parseError from '../helpers/parseError'

import { useSnackbar } from 'notistack'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CreateList() {
  
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const { enqueueSnackbar } = useSnackbar();

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    setIsLoading(true)
    axios.post(process.env.REACT_APP_API_URL + 'list/create', 
    { name}, 
    { withCredentials: true })
    .then(res => {
      enqueueSnackbar(res.data.msg, {
        variant: 'success'
      })
      setName('')
      handleClose()
      setIsLoading(false)
    })
    .catch(err => {
      enqueueSnackbar(parseError(err), {
        variant: 'error'
      })
      setIsLoading(false)
    })
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create List
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Create a new list</DialogTitle>
        <DialogContent>
          <TextField id="standard-basic" label="List Name" value={name} onChange={handleNameChange}/>
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

export default CreateList
