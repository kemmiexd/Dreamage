import * as Types from './../constants/ActionTypes';

const initialState = [];

const findIndex = (pictures, id) => {
  let result = -1;
  pictures.forEach((picture, index) => {
    if (picture.id === id) {
      result = index
    }
  });

  return result;
}

const pictures = (state = initialState, action) => {
  let index = -1;
  let { id, picture } = action;
  let pictures = null;

  switch(action.type) {
    case Types.FETCH_PICTURES:
      action.pictures.sort((pic1, pic2) => {
        return pic2.id - pic1.id
      });
      state = action.pictures;
      return [...state];

    case Types.DELETE_PICTURE:
      index  = findIndex(state, id);
      state.splice(index, 1);
      return [...state];

    case Types.ADD_PICTURE:
      state.push(action.picture);
      return [...state];

    case Types.UPDATE_PICTURE:
      index = findIndex(state, picture.id);
      state[index] = picture;
      return [...state];
      
    case Types.FETCH_NEW_PICTURES:
      pictures = action.pictures;
      state = pictures.filter(pic => {
        return pic.status === "1"
      });
      return [...state];

    case Types.FETCH_FEATURE_PICTURES:
      pictures = action.pictures;
      state = pictures.filter(pic => {
        return pic.status === "2"
      });
      return [...state];
    
    default:
      return [...state];
  }
}

export default pictures;