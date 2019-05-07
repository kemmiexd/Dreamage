import React from 'react';
import styled from 'styled-components';

import TabStatus from './TabStatus';

const PictureWrapper = styled.div `
  width: calc(100% - 40px);
  margin: 20px;
`
const PictureArea = styled.div `
  column-count: 4;
  gap: 20px;
`

class PictureList extends React.Component {
  render() {
    return (
      <PictureWrapper>
        <TabStatus />
        <PictureArea>
          { this.props.children }
        </PictureArea>
      </PictureWrapper>
    )  
  }
}

export default PictureList;