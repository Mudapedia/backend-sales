class ResponseErr extends Error {
  #status: number = 0;

  constructor(msg: string, status: number) {
    super(msg);
    this.#status = status;
  }

  get getStatusCode() {
    return this.#status;
  }
}

export default ResponseErr;
