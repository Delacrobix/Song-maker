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

export async function getUserNames() {
  try {
    const response = await window.fetch(`${AUTH_MODULE}/user/list-usernames`);

    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
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

export async function sendBugReport(formData) {
  try {
    const response = await window.fetch(`${AUTH_MODULE}/Email/bug`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ jsonEmailData: JSON.stringify(formData) }),
    });

    const statusCode = response.status;
    const data = await response.json();

    return {
      statusCode,
      data,
    };
  } catch (err) {
    throw new Error(`Error while sending bug report ${err}`);
  }
}

export async function sendSuggestions(formData) {
  try {
    const response = await window.fetch(`${AUTH_MODULE}/Email/suggestions`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ jsonEmailData: JSON.stringify(formData) }),
    });

    const statusCode = response.status;
    const data = await response.json();

    return {
      statusCode,
      data,
    };
  } catch (err) {
    throw new Error(`Error while sending suggestions ${err}`);
  }
}
