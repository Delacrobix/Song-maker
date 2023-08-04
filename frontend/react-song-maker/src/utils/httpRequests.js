const AUTH_MODULE = process.env.REACT_APP_AUTH_MODULE;

export async function getAuth(credentials) {
  try {
    const response = await window.fetch(`${AUTH_MODULE}/user/validate`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);

    return null;
  }
}

export async function createUser(ua) {
  try {
    const response = await window.fetch(`${AUTH_MODULE}/user/create`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(ua),
    });

    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);

    return null;
  }
}

export async function updateEmail(ua) {
  try {
    const response = await window.fetch(
      `${AUTH_MODULE}/user/edit/email/${ua.id}/${ua.email}`,
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
      }
    );

    const statusCode = response.status;
    const data = await response.json();

    return {
      data,
      statusCode,
    };
  } catch (err) {
    console.error(err);

    return null;
  }
}

export async function updatePassword(ua) {
  console.log('ua: ', ua);
  try {
    const response = await window.fetch(
      `${AUTH_MODULE}/user/edit/password/${ua.id}/${ua.pass}/${ua.dupPass}`,
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
      }
    );
    const statusCode = response.status;

    console.log('statusCode: ', statusCode);
    if (statusCode === 204) {
      return { statusCode: 0 };
    }

    const data = await response.json();

    return {
      data,
      statusCode,
    };
  } catch (err) {
    console.error(err);

    return null;
  }
}
