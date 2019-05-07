import React from 'react';

class Picture extends React.Component {
  render() {
    const { picture, index } = this.props;
    return (
      <div style={{marginBottom: "20px"}}>
        <img src={picture.link} alt={picture.name} key={index} />
      </div>
    )
  }
}

export default Picture;