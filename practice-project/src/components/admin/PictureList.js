import React from 'react';


class PictureList extends React.Component {
  render() {
    return (
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Name</th>
            <th>Thumbnail</th>
            <th>Tags</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          { this.props.children }
        </tbody>
      </table>
    )  
  }
}

export default PictureList;