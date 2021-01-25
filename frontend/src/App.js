import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import axios from 'axios'

import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { useSnackbar } from 'notistack';

import BaseRoute from './components/BaseRoute'
import List from './pages/List'
import Task from './pages/Task'

import Navbar from './components/Navbar'

import { light, dark } from './themes'

function App(props) {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authCheckFinished, setAuthCheckFinished] = useState(false)
  const [user, setUser] = useState({})
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true')

  const { enqueueSnackbar } = useSnackbar();

  const appliedTheme = createMuiTheme(darkMode ? dark : light)

  // Check authentication status
  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + 'auth/status', {
      withCredentials: true
    })
    .then(res => {
      if (res.data.signedIn) {
        enqueueSnackbar(res.data.msg, {
          variant: 'success'
        })
        setToLoggedIn(res.data.user)
      } else {
        setToLoggedOut()
      }
      setAuthCheckFinished(true)
    })
    .catch(err => {
      enqueueSnackbar('An error occured', {
        variant: 'error'
      })
      setToLoggedOut()
      setAuthCheckFinished(true)
    })
  }, [enqueueSnackbar])

  const setToLoggedIn = (user) => {
    setIsLoggedIn(true)
    setUser(user)
  }

  const setToLoggedOut = () => {
    setIsLoggedIn(false)
    setUser({})
  }

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      {isLoggedIn && <Navbar onLogout={setToLoggedOut} darkMode={darkMode} setDarkMode={setDarkMode}/>}
      <Container>
        <Router>
          <Switch>
            <BaseRoute 
              authCheckFinished={authCheckFinished} 
              isLoggedIn={isLoggedIn}
              onAuthenticated={setToLoggedIn}
              user={user}/>
            <Route path="/list/:listId" component={List}></Route>
            <Route path="/task/:taskId" component={Task}></Route>
          </Switch>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
