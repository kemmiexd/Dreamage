import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import routes from './routes';
import AdminMenu from './components/admin/AdminMenu';

const Article = styled.article `
  padding-top: 80px;
`

const App = () => {
  const showContentMenus = (routes) => {
    let result = null;
  
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return <Route 
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.main}
        />
      })
    }
  
    return <Switch>{result}</Switch>
  }
  
  return (
    <Router>
      <div>
        <AdminMenu />
        <Article>
          { showContentMenus(routes) }
        </Article>
      </div>
    </Router>
  )
}

export default App;
