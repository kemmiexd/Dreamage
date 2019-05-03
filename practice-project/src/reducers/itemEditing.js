import * as Types from './../constants/ActionTypes';

var initialState = {};

const itemEditing = (state = initialState, action) => {
  switch(action.type) {
    case Types.GET_PICTURE:
      return action.picture;
    default: 
      return state;
  }
}

export default itemEditing;