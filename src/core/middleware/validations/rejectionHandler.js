import { validationResult } from 'express-validator';
import { CommonConstants, HttpStatusConstants } from '../../utils/constants/index.js';

/**
 * @description Utility class for handling rejection of invalid requests based on validation results
 * @class RejectionHandler
 * @author pankaj-rajwani <rajwanipankaj23@gmail.com>
 */
export class RejectionHandler {
  /**
   * @description Reject the request if it fails validation, sending an appropriate error response
   * @static
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next function
   */
  static rejectIfInvalid(req, res, next) {
    const err = validationResult(req).array();

    if (err && Array.isArray(err) && err.length > 0) {
      const errorObj = {
        status: CommonConstants.ERROR.DEFAULT_ERROR_STATUS,
        message: CommonConstants.ERROR.REQUEST_VALIDATION_FAILED,
        customCode: CommonConstants.ERROR.CUSTOM_CODE_REQUEST_VALIDATION_FAILED,
      };

      const error = [];
      err.forEach((errElem) => {
        error.push(errElem.msg);
      });

      console.log('Error in pre-condition check ::', error);

      return res.status(HttpStatusConstants.BAD_REQUEST).send({ ...errorObj, errors: error });
    }

    return next();
  }
}
