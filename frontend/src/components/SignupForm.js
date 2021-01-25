import React, { useState } from 'react'
import axios from 'axios'

// Material imports
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { useSnackbar } from 'notistack';

function SignupForm(props) {
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const { enqueueSnackbar } = useSnackbar();
  
  function handleSubmit(e) {
    e.preventDefault()
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
            <Button variant="contained" color="primary" type="submit">Signup</Button>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default SignupForm