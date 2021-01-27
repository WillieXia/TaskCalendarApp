import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import axios from 'axios'

import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { useSnackbar } from 'notistack';

import BaseRoute from './components/BaseRoute'
import List from './pages/List'
import Task from './pages/Task'
import Navbar from './components/Navbar'

import parseError from './helpers/parseError'

import { light, dark } from './themes'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authCheckFinished, setAuthCheckFinished] = useState(false)
  const [user, setUser] = useState({})
  const [lists, setLists] = useState([])
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true')

  const { enqueueSnackbar } = useSnackbar();

  const appliedTheme = createMuiTheme(darkMode ? dark : light)

  const setToLoggedIn = (user) => {
    setIsLoggedIn(true)
    setUser(user)
    fetchLists()
  }

  const setToLoggedOut = () => {
    setIsLoggedIn(false)
    setUser({})
    setLists([])
  }

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
      enqueueSnackbar(parseError(err), {
        variant: 'error'
      })
      setToLoggedOut()
      setAuthCheckFinished(true)
    })
  }, [enqueueSnackbar])

  const fetchLists = () => {
    axios.get(process.env.REACT_APP_API_URL + 'list', {
      withCredentials: true
    })
    .then(res => {
      setLists(res.data.lists)
    })
    .catch(err => {
      enqueueSnackbar(parseError(err), {
        variant: 'error'
      })
    })
  }

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <Router>
        {isLoggedIn && 
          <Navbar 
            onLogout={setToLoggedOut} 
            darkMode={darkMode} 
            setDarkMode={setDarkMode}
            lists={lists}
          />
        }
        <Switch>
          <>
            <BaseRoute 
              authCheckFinished={authCheckFinished} 
              isLoggedIn={isLoggedIn}
              onAuthenticated={setToLoggedIn}
              user={user}
              lists={lists}
            />
            <Route 
              path="/list/:listId" 
              render={() => 
                <List lists={lists}/>
              }
            />
          </>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
