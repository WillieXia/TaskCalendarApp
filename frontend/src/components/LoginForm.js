import React, { useState } from 'react'

import axios from 'axios'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useSnackbar } from 'notistack';

function LoginForm(props) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { enqueueSnackbar } = useSnackbar();

  function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    axios.post(process.env.REACT_APP_API_URL + 'auth/login', {
      email,
      password
    }, { withCredentials: true })
    .then(res => {
      enqueueSnackbar(res.data.msg, {
        variant: 'success'
      })
      setIsLoading(false)
      props.onAuthenticated(res.data.user)
    })
    .catch(err => {
      let displayError = ''
      if (err.response && err.response.data && err.response.data.error) {
        displayError = err.response.data.error
      } else {
        displayError = 'An unknown error occured'
      }
      enqueueSnackbar(displayError, {
        variant: 'error'
      })
      setIsLoading(false)
    })
  }

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  return (
    <>
      <Typography variant="h4" style={{ textAlign: 'center' }}>
          Login
      </Typography>
      <br />
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" spacing={5}>
          <Grid item xs={12}>
            <TextField id="email" type="email" label="Email" value={email} onChange={handleEmailChange} fullWidth required/>
          </Grid>
          <Grid item xs={12}>
            <TextField id="password" type="password" value={password} onChange={handlePasswordChange} label="Password" fullWidth required/>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" disabled={isLoading}>
              {!isLoading && 'Login'}
              {isLoading && <CircularProgress size={24} />}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default LoginForm