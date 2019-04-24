import axios from 'axios';

import * as Config from './../utils/Config';

export default function callApi(endpoint, method = 'GET', data) {
  return (
    exios({
      method: method,
      url: `${Config.API_URL}/${endpoint}`,
      data: data
    }).catch(err => {
      console.log(err);
    })
  )
}