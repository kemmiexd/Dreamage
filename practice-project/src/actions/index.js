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

export const actGetPictureRequest = id => {
  return dispatch => {
    return callApi(`pictures/${id}`, 'GET', null).then(res => {
      dispatch(actGetPicture(res.data));
    });
  }
}

export const actGetPicture = picture => {
  return {
    type: Types.GET_PICTURE,
    picture
  }
}

export const actUpdatePictureRequest = picture => {
  return dispatch => {
    return callApi(`pictures/${picture.id}`, 'PUT', picture).then(res => {
      dispatch(actUpdatePicture(res.data));
    })
  }
}

export const actUpdatePicture = picture => {
  return {
    type: Types.UPDATE_PICTURE,
    picture
  }
}