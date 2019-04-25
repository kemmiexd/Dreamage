import * as Types from './../constants/ActionTypes';
import callApi from './../utils/apiCaller';

export const actFetchPicturesRequest = () => {
  return dispatch => {
    return callApi('pictures', 'GET', null).then(res => {
      dispatch(actFetchPictures(res.data));
    })
  }
}

export const actFetchPictures = pictures => {
  return {
    type: Types.FETCH_PICTURES,
    pictures,
  }
}

export const actDeletePictureRequest = id => {
  return dispatch => {
    return callApi(`pictures/${id}`, 'DELETE', null).then(res => {
      dispatch(actDeletePicture(id));
    })
  }
}

export const actDeletePicture = id => {
  return {
    type: Types.DELETE_PICTURE,
    id
  }
}

export const actAddPictureRequest = picture => {
  return dispatch => {
    return callApi('pictures', 'POST', picture).then(res => {
      dispatch(actAddPicture(res.data));
    });
  }
}

export const actAddPicture = picture => {
  return {
    type: Types.ADD_PICTURE,
    picture
  }
}