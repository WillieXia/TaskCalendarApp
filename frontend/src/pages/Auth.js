import React, { useState } from 'react'

// Material imports
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'

import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'

function Auth(props) {

  const [loginMode, setLoginMode] = useState(true)

  function handleSwitchMode() {
    setLoginMode(!loginMode)
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '80vh' }}>
      <Grid item xs={10}>
        <Card style={{ maxWidth: 1000, minWidth: 500}}>
          <Container>
            <CardContent>
              {loginMode && <LoginForm onAuthenticated={props.onAuthenticated}/>}
              {!loginMode && <SignupForm onAuthenticated={props.onAuthenticated}/>}
            </CardContent>
            <CardActions>
              <Button color="primary" onClick={handleSwitchMode}>
                {loginMode ? 'Switch to sign up' : 'Switch to login'}
              </Button>
            </CardActions>
          </Container>
        </Card>
      </Grid>
    </Grid>
  )

}

export default Auth