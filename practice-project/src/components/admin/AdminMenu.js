import React from 'react';
import { NavLink } from 'react-router-dom';

import { Menu, Row, Col, Layout } from 'antd';

import './../../assets/css/admin/admin.css';
import logo from '../../assets/images/logo.png';

const menus = [
  {
    name: 'Home',
    to: '/',
    exact: false
  },
  {
    name: 'Picture Manager',
    to: '/admin/picture-list',
    exact: false
  }  
];

class AdminMenu extends React.Component {
  render() {
    return (
      <Layout className="admin-menu">
        <Row>
          <Col span={12} className="logo">
            <img src={logo} alt="logo" />
            <h3>Dreamage</h3>
          </Col>
          <Col span={12} className="main-menu">
            <Menu mode="horizontal">
              { this.showMenus(menus) }
            </Menu>
          </Col>
        </Row>
      </Layout>
    )
  }

  showMenus = (menus) => {
    let result = null;
    if (menus.length > 0) {
      result = menus.map((menu, index) => {
        return (
          <Menu.Item key={index} >
            <NavLink to={menu.to} exact={menu.exact}>
              {menu.name}
            </NavLink>
          </Menu.Item>
        )
      });
    }

    return result;
  }
}

export default AdminMenu;