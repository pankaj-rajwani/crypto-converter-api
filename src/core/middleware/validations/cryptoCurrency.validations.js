import { checkSchema } from 'express-validator';
import { RejectionHandler } from './rejectionHandler.js';

/**
 * @description Utility class for handling validations related to cryptocurrency operations
 * @class CryptoCurrencyValidations
 * @author pankaj-rajwani <rajwanipankaj23@gmail.com>
 */
export class CryptoCurrencyValidations {
  /**
   * @description Check if the provided value is a valid fiat currency id
   * @static
   * @param {string} value - The value to check
   * @return {boolean} - True if the value is a valid fiat currency id, false otherwise
   */
  static checkFiatCurrencyIdValidity(value) {
    return typeof value === 'string' && value.length === 4 && !isNaN(Number(value));
  }

  /**
   * @description Check if the provided value is a valid cryptocurrency id
   * @static
   * @param {string} value - The value to check
   * @return {boolean} - True if the value is a valid cryptocurrency id, false otherwise
   */
  static checkCryptoCurrencyIdValidity(value) {
    return typeof value === 'string' && !isNaN(Number(value));
  }

  /**
   * @description Middleware for validating parameters related to fetching cryptocurrency and fiat currency list
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next function
   * @async
   */
  async cryptoAndFiatCurrencyListValidationCheck(req, res, next) {
    await checkSchema(
      {
        limit: {
          optional: true,
          isInt: {
            bail: true,
            options: {
              min: 1,
              max: 5000,
            },
            errorMessage: '"limit" must be a positive integer between 1 and 5000',
          },
          trim: true,
          toInt: true,
        },
      },
      ['query']
    ).run(req);

    RejectionHandler.rejectIfInvalid(req, res, next);
  }

  /**
   * @description Middleware for validating parameters related to currency conversion
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next function
   * @async
   */
  async currencyConversionValidationCheck(req, res, next) {
    await checkSchema(
      {
        amount: {
          notEmpty: true,
          errorMessage: '"amount" is required for currency conversion',
          isFloat: {
            bail: true,
            options: {
              min: 0.00000001,
              max: 1000000000000,
            },
            errorMessage: '"Amount" must be a float number between 0.00000001 and 1000000000000',
          },
          trim: true,
          toFloat: true,
        },
        crypto_currency_cmc_id: {
          notEmpty: true,
          errorMessage: '"crypto_currency_cmc_id" is required for currency conversion',
          isString: {
            bail: true,
            errorMessage: '"crypto_currency_cmc_id" must be of string type',
          },
          custom: {
            options: CryptoCurrencyValidations.checkCryptoCurrencyIdValidity,
            errorMessage: '"crypto_currency_cmc_id" must be a valid numeric CMC currency id of string type',
          },
          trim: true,
        },
        fiat_currency_cmc_id: {
          notEmpty: true,
          errorMessage: '"fiat_currency_cmc_id" is required for currency conversion',
          isString: {
            bail: true,
            errorMessage: '"fiat_currency_cmc_id" must be of string type',
          },
          custom: {
            options: CryptoCurrencyValidations.checkFiatCurrencyIdValidity,
            errorMessage: '"fiat_currency_cmc_id" must be a valid 4 digit numeric CMC currency id of string type',
          },
          trim: true,
        },
      },
      ['query']
    ).run(req);

    RejectionHandler.rejectIfInvalid(req, res, next);
  }
}
