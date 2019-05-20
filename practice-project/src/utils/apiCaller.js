import reqwest from 'reqwest';

export default async function callApi(endpoint, method = 'GET', data) {
  return (
    await reqwest({
      method: method,
      url: `http://5bb8ef65b6ed2c0014d47508.mockapi.io/Ok/${endpoint}`,
      data: data,
      type: "json"
    }).catch(err => {
      console.log(err);
    })
  )
}