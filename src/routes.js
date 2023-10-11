import React from 'react'
import { Router, Switch } from 'react-router-dom'
import { Route } from 'react-router'
import history from './services/history.ts'

import Home from './pages/Home/index.tsx'
import Header from './components/Header/index.tsx'
import Footer from './components/Footer/index.tsx'

export default function Routes() {
  return (
    <>
      <Router history={history}>
        {<Header />}
        <Switch>
          <Route 
            path="/"
            isPrivate={false}
            exact
            component={Home}
          />
        </Switch>
        {<Footer />}
      </Router>
    </>
  )
}