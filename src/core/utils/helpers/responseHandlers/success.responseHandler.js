import { CommonConstants } from '../../constants/index.js';

/**
 * @description Utility class for creating success responses for API endpoints.
 * @class SuccessResponseHandler
 * @author pankaj-rajwani <rajwanipankaj23@gmail.com>
 */
export class SuccessResponseHandler {
  /**
   * @description Initializes the class with HTTP success code, message, data, and custom code.
   * @param {number} httpSuccessCode - HTTP success status code
   * @param {string} message - API success response message
   * @param {any} data - Data to be sent as a response
   * @param {string} customCode - API success response custom code
   */
  constructor(httpSuccessCode, message, data, customCode) {
    this.httpSuccessCode = httpSuccessCode;
    this.message = message;
    this.data = data;
    this.customCode = customCode;
  }

  /**
   * @description Sends the success response for an API success.
   * @param {object} res - Express response object
   */
  sendResponse(res) {
    const resp = {
      status: CommonConstants.SUCCESS.DEFAULT_SUCCESS_STATUS,
      message: this.message ?? CommonConstants.SUCCESS.DEFAULT_SUCCESS_MESSAGE,
      customCode: this.customCode ?? CommonConstants.SUCCESS.CUSTOM_CODE_DEFAULT_SUCCESS_MESSAGE,
    };

    if (this.data) {
      resp.data = this.data;
    }

    res.status(this.httpSuccessCode).json(resp);
  }
}
