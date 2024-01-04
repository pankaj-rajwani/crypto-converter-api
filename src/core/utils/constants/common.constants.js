/**
 * @description Class containing common constants that can be required all over the application.
 * @class CommonConstants
 * @author pankaj-rajwani <rajwanipankaj23@gmail.com>
 */
export class CommonConstants {
  static get SUCCESS() {
    return {
      DEFAULT_SUCCESS_STATUS: 'success',
      DEFAULT_SUCCESS_MESSAGE: 'Request successful',
      CUSTOM_CODE_DEFAULT_SUCCESS_MESSAGE: 'DEFAULT_SUCCESS_MESSAGE',
    };
  }

  static get ERROR() {
    return {
      DEFAULT_ERROR_STATUS: 'error',
      DEFAULT_ERROR_MESSAGE: 'Something went wrong',
      CUSTOM_CODE_DEFAULT_ERROR_MESSAGE: 'DEFAULT_ERROR_MESSAGE',
      REQUEST_VALIDATION_FAILED: 'Validation errors!',
      CUSTOM_CODE_REQUEST_VALIDATION_FAILED: 'REQUEST_VALIDATION_FAILED',
    };
  }
}
