import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import List from './components/list'
import Add from './components/add'
import Invoice from './components/invoice'

import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
      <Switch>
        <Route path='/' exact component={List} />
        <Route path='/add' component={Add} />
        <Route path='/:id' component={Invoice} />
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
