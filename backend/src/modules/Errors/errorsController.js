//this file contains all the error controllers used in this project

export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.message = 'Error in data validation';
  }
}

//This error controller is used for validate the database connection
export class ConnectionError extends Error {
  constructor(message) {
    super(message);
    this.message = 'Error connecting to database';
  }
}

//This error controller is used for the GET request to the database
export class DataRequestError extends Error {
  constructor(message) {
    super(message);
    this.message = 'Error requesting data';
  }
}

//This error controller is used for the POST, PUT or DELETE request to the database
export class DataMutationError extends Error {
  constructor(message) {
    super(message);
    this.message = 'Error in mutation operation';
  }
}

export class ConnectionServerError extends Error {
  constructor(message) {
    super(message);
    this.message = 'Error connecting to server';
  }
}
