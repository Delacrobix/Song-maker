/**
 * this file contains all the error controllers used in this project
 */

//This error controller is used for validate the openAI connection
export class ConnectionError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
  }
}

//This error controller is used for the GET request to the database
export class DataRequestError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
  }
}

//This error controller is used for the POST, PUT or DELETE request to the database
export class SavingError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
  }
}
