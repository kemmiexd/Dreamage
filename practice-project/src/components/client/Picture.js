import React from 'react';

const Picture = props => {
  const { picture, index } = props;
  
  return (
    <div style={{marginBottom: "20px"}}>
      <img src={picture.link} alt={picture.name} key={index} />
    </div>
  )
}

export default Picture;