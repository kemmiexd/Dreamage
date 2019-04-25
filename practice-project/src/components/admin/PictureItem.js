import React from 'react';
import { NavLink } from 'react-router-dom';

import { Tag, Button } from 'antd';

class PictureItem extends React.Component {
  onDelete = (id) => {
    this.props.onDelete(id);
  }

  render() {
    const { picture, index } = this.props;
    const statusName = picture.status === true ? "Feature" : "New";
    const statusColor = picture.status === true ? "#f50" : "#108ee9";

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{picture.id}</td>
        <td>{picture.name}</td>
        <td>
          <img src={picture.link} alt={picture.name} />
        </td>
        <td>
          <Tag color="purple">{picture.tags}</Tag>
        </td>
        <td>
          <Tag color={statusColor}>{statusName}</Tag>
        </td>
        <td>
          <Button className="mr-2" type="primary" size="default">
            <NavLink to="/admin/add-picture">
              <i className="mdi mdi-pencil-box-outline" />
              Edit
            </NavLink>
          </Button>
          <Button 
            type="danger" 
            size="default"
            onClick={() => this.onDelete(picture.id)}  
          >
            <i className="mdi mdi-delete" />
            Delete
          </Button>
        </td>
      </tr>
    )
  }
}

export default PictureItem;