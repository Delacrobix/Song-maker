const AUTH_MODULE = process.env.REACT_APP_AUTH_MODULE;

export async function getAuth(credentials) {
  let response;

  await window
    .fetch(`${AUTH_MODULE}/user/validate`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
    .then((res) => res.json())
    .then((data) => {
      response = data;
    })
    .catch((err) => console.error(err));

  return response;
}

export async function createUser(ua) {
  let response;

  await window
    .fetch(`${AUTH_MODULE}/user/create`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(ua),
    })
    .then((res) => res.json())
    .then((data) => {
      response = data;
    })
    .catch((err) => console.error(err));

  return response;
}

export async function updateEmail(ua) {
  let response;

  await window
    .fetch(`${AUTH_MODULE}/edit/email/${ua.id}/${ua.email}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
    })
    .then((res) => res.json())
    .then((data) => {
      response = data;
    })
    .catch((err) => console.error(err));

  return response;
}

export async function updatePassword(ua) {
  let response;

  await window
    .fetch(`${AUTH_MODULE}/edit/password/${ua.id}/${ua.pass}/${ua.dupPass}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
    })
    .then((res) => res.json())
    .then((data) => {
      response = data;
    })
    .catch((err) => console.error(err));

  return response;
}
