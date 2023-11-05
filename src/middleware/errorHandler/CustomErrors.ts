export class FileExtensionNotAllowedError extends Error {
  constructor(private status: number = 400) {
    super();
    this.message = "File extension not allowed!";
    this.status;
  }
}

export class FileNotSentError extends Error {
  constructor(private status: number = 400) {
    super();
    this.message = "No file was sent!";
    this.status;
  }
}

export class NotFoundError extends Error {
  constructor(private status: number = 404) {
    super();
    this.message = "Data not found";
    this.status;
  }
}
