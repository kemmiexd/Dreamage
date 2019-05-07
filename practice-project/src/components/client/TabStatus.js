import React from 'react';
import { NavLink } from 'react-router-dom';

import { Menu } from 'antd';

const tabStatus = [
  {
    name: 'Feature',
    to: '/',
    exact: false
  },
  {
    name: 'New',
    to: '/new',
    exact: false
  }  
];

class TabStatus extends React.Component {
  render() {
    return (
      <Menu mode="horizontal" style={{marginBottom: "30px", background: "none"}}>
        { this.showTabs(tabStatus) }
      </Menu>
    )
  }

  showTabs = (tabStatus) => {
    let result = null;
    if (tabStatus.length > 0) {
      result = tabStatus.map((tab, index) => {
        return (
          <Menu.Item key={index}>
            <NavLink to={tab.to} exact={tab.exact}>
              {tab.name}
            </NavLink>
          </Menu.Item>
        )
      });
    }

    return result;
  }
}

export default TabStatus;