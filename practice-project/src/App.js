import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Layout } from 'antd';

import routes from './routes';
import AdminMenu from './components/admin/AdminMenu';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <AdminMenu />
          <Layout style={{width: "1140px", margin: "auto", background: "none", marginTop: "50px"}}>
            { this.showContentMenus(routes) }
          </Layout>
        </div>
      </Router>
    )
  }

  showContentMenus = (routes) => {
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
}

export default App;
