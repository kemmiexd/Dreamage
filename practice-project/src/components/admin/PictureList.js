import React from 'react';
import PictureItem from './PictureItem';

class PictureList extends React.Component {
  render() {
    return (
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Code</th>
            <th>Name</th>
            <th>Thumbnail</th>
            <th>Tags</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <PictureItem />
          <PictureItem />
          <PictureItem />
        </tbody>
      </table>
    
    )  
  }
}

export default PictureList;