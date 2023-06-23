const AUTH_MODULE = process.env.REACT_APP_AUTH_MODULE;

export async function getAuth(credentials) {
  var response = null;
  console.log('Credentials: ', credentials);

  await fetch(`${AUTH_MODULE}/user/validate`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then((res) => res.json)
    .then((data) => {
      response = data;
      // console.log(data);
      // alert('Funca');
    })
    .catch((err) => console.log(err));

  return response;
}

export async function createUser(ua) {
  console.log('UserAccount: ', ua);
  var response = null;

  await fetch(`${AUTH_MODULE}/user/create`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(ua),
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      response = data;
      // alert('Funca');
    })
    .catch((err) => console.error(err));

  return response;
}
