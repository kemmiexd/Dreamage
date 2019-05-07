import React from 'react';
import { NavLink } from 'react-router-dom';

import { Tag, Button, Popconfirm, message } from 'antd';

class PictureItem extends React.Component {
  onDelete = (id) => {
    this.props.onDelete(id);
    message.success(`Deleted picture with id is ${id}`);
  }

  render() {
    const { picture, index } = this.props;
    const statusName = picture.status === "0" ? "Private" : picture.status === "1" ? "New" : "Feature";
    const statusColor = picture.status === "0" ? "#f00" : picture.status === "1" ? "#f50" : "#108ee9";
    const tags = picture.tags;

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{picture.id}</td>
        <td>{picture.name}</td>
        <td>
          <img src={picture.link} alt={picture.name} />
        </td>
        <td>
          {this.showTags(tags)}
        </td>
        <td>
          <Tag color={statusColor}>{statusName}</Tag>
        </td>
        <td>
          <Button className="mr-2" type="primary" size="default">
            <NavLink to={`/admin/edit/${picture.id}`}>
              <i className="mdi mdi-pencil-box-outline" />
              Edit
            </NavLink>
          </Button>
          <Popconfirm title="Are you sure delete this picture?" onConfirm={() => this.onDelete(picture.id)} okText="Yes" cancelText="No">
          <Button 
            type="danger" 
            size="default"
          >
            <i className="mdi mdi-delete" />
            Delete
          </Button>
          </Popconfirm>
        </td>
      </tr>
    )
  }

  showTags = tags => {
    let result = [];
    if (tags.length > 0) {
      result = tags.map((tag, index) => {
        return <Tag color="purple" key={index} >
          {tag}
        </Tag>
      });
    }

    return result;
  }
}

export default PictureItem;