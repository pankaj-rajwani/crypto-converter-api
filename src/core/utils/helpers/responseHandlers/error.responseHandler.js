import { CommonConstants } from '../../constants/index.js';

/**
 * @description Utility class for creating error responses for API endpoints.
 * @class ErrorResponseHandler
 * @author pankaj-rajwani <rajwanipankaj23@gmail.com>
 */
export class ErrorResponseHandler {
  /**
   * @description Initializes the class with HTTP error code, message, and custom code.
   * @param {number} httpErrorCode - HTTP error status code
   * @param {string} message - API error response message
   * @param {string} customCode - API error response custom code
   */
  constructor(httpErrorCode, message, customCode) {
    this.httpErrorCode = httpErrorCode;
    this.message = message;
    this.customCode = customCode;
  }

  /**
   * @description Sends the error response for an API failure.
   * @param {object} res - Express response object
   */
  sendResponse(res) {
    const resp = {
      status: CommonConstants.ERROR.DEFAULT_ERROR_STATUS,
      message: this.message ?? CommonConstants.ERROR.DEFAULT_ERROR_MESSAGE,
      customCode: this.customCode ?? CommonConstants.ERROR.CUSTOM_CODE_DEFAULT_ERROR_MESSAGE,
    };

    res.status(this.httpErrorCode).json(resp);
  }
}
