import React from 'react';
import styled from 'styled-components';

import bgSearch from './../../assets/images/bg-search.png';

const SearchWrapper = styled.div `
  position: relative;
  height: 400px;
  background-attachment: fixed;

`
const SearchForm = styled.div `
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: 800px;
  text-align: center;
`
const SearchFormInput = styled.input `
  height: 60px;
  border: 0;

  &::placeholder {
    color: #999;
  }

  &:focus {
    border: 0;
    box-shadow: none;

    &::placeholder {
      color: #555;
    }
  }
`
const Button = styled.button `
  position: absolute;
  top: 13px;
  right: 15px;
  background: none;
  border: 0;
  font-size: 24px;
  color: #555;

  &:hover {
    color: #007bff;
  }
`

const PictureList = () => {
  return (
    <SearchWrapper style={{backgroundImage: `url(${bgSearch})`}}>
      <SearchForm>
        <h2 className="mb-4" style={{color: "white"}}>Welcome to Dreamage. Find your favorite picture now.</h2>
        <form style={{position: "relative"}}>
          <SearchFormInput type="text" placeholder="Enter keyword . . ." className="form-control" />
          <Button type="submit">
            <i className="mdi mdi-magnify" />
          </Button>
        </form>
      </SearchForm>
    </SearchWrapper>
  )  
}

export default PictureList;