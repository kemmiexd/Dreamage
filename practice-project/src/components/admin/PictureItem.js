import React from 'react';
import { NavLink } from 'react-router-dom';

import { Tag } from 'antd';

class PictureItem extends React.Component {
  render() {
    return (
      <tr>
        <td>1</td>
        <td>1</td>
        <td>Football</td>
        <td>
          <img src="https://images.pexels.com/photos/2100183/pexels-photo-2100183.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="1" />
        </td>
        <td>
          <Tag color="purple">Football</Tag>
          <Tag color="purple">Sport</Tag>
          <Tag color="purple">Life</Tag>
        </td>
        <td>
          <Tag color="#108ee9">Feature</Tag>
        </td>
        <td>
          <NavLink className="btn btn-warning mr-2" to="">
            <i className="mdi mdi-pencil-box-outline" />
            Edit
          </NavLink>
          <button className="btn btn-danger">
            <i className="mdi mdi-delete" />
            Delete
          </button>
        </td>
      </tr>
    )
  }
}

export default PictureItem;