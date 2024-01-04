/**
 * @description Class containing the http status constants required for the API response all over the application.
 * @class HttpStatusConstants
 * @author pankaj-rajwani <rajwanipankaj23@gmail.com>
 */
export class HttpStatusConstants {
  static get SOURCE_OK() {
    return 200;
  }

  static get SOURCE_CREATED() {
    return 201;
  }

  static get SOURCE_ACCEPTED() {
    return 202;
  }

  static get NO_CONTENT() {
    return 204;
  }

  static get BAD_REQUEST() {
    return 400;
  }

  static get UNAUTHORISED() {
    return 401;
  }

  static get FORBIDDEN() {
    return 403;
  }

  static get NOT_FOUND() {
    return 404;
  }

  static get INTERNAL_SERVER() {
    return 500;
  }

  static get SERVICE_UNAVAILABLE() {
    return 503;
  }

  static get PRECONDITION_FAILED() {
    return 412;
  }

  static get METHOD_NOT_ALLOWED() {
    return 405;
  }

  static get LOCKED() {
    return 423;
  }

  static get CONFLICT() {
    return 409;
  }
}
