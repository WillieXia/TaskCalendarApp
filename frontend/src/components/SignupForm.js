import React, { useState } from 'react'
import axios from 'axios'

// Material imports
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useSnackbar } from 'notistack';

import parseError from '../helpers/parseError'

function SignupForm(props) {
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { enqueueSnackbar } = useSnackbar();
  
  function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    axios.post(process.env.REACT_APP_API_URL + 'auth/signup',
    {
      name,
      email,
      password,
      confirmPassword
    }, {
      withCredentials: true
    })
    .then(res => {
      console.log(res)
      setIsLoading(false)
      props.onAuthenticated(res.data.user)
    })
    .catch(err => {
      enqueueSnackbar(parseError(err), {
        variant: 'error'
      })
      setIsLoading(false)
    })
  }
  
  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  function handleConfirmPasswordChange(e) {
    setConfirmPassword(e.target.value)
  }

  return (
    <>
      <Typography variant="h4" style={{ textAlign: 'center' }}>
          Signup
      </Typography>
      <br />
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" spacing={5}>
          <Grid item xs={12}>
          < TextField id="name" label="Name" onChange={handleNameChange} fullWidth required/>
          </Grid>
          <Grid item xs={12}>
          < TextField id="email" type="email" label="Email" onChange={handleEmailChange} fullWidth required/>
          </Grid>
          <Grid item xs={12}>
            <TextField id="password" type="password" label="Password" onChange={handlePasswordChange} fullWidth required/>
          </Grid>
          <Grid item xs={12}>
            <TextField id="confirmPassword" type="password" label="Confirm Password" onChange={handleConfirmPasswordChange} fullWidth required/>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" disabled={isLoading}>
              {!isLoading && 'Signup'}
              {isLoading && <CircularProgress size={24} />}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default SignupForm