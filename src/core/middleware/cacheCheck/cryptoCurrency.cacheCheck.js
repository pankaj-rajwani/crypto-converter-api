import { CryptoCurrencyConstants, HttpStatusConstants } from '../../utils/constants/index.js';
import { CryptoCurrencyCacheManager, SuccessResponseHandler, ErrorResponseHandler } from '../../utils/helpers/index.js';

/**
 * @description Middleware for checking and utilizing cached data for cryptocurrency and fiat currency list
 * @class CryptoCurrencyCacheCheckMiddleware
 * @author pankaj-rajwani <rajwanipankaj23@gmail.com>
 */
export class CryptoCurrencyCacheCheckMiddleware {
  /**
   * @description Check if cached data is available and within validity period; send cached data if conditions are met
   * @static
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next function
   */
  static cryptoAndFiatCurrencyListCacheCheck(req, res, next) {
    try {
      const { limit } = req.query;
      const cacheResults = CryptoCurrencyCacheManager.CURRENCIES_LIST_DATA;

      if (Object.keys(cacheResults).length) {
        const reqTimestamp = new Date();
        const timeDiffInSeconds = (reqTimestamp.getTime() - cacheResults.timestamp.getTime()) / 1000;

        if (timeDiffInSeconds < 300 && limit <= cacheResults.cryptoCurrencies.length) {
          const formattedResp = {
            cryptoCurrencies: cacheResults.cryptoCurrencies,
            fiatCurrencies: cacheResults.fiatCurrencies,
            fromCache: true,
          };

          if (limit < cacheResults.cryptoCurrencies.length) {
            formattedResp.cryptoCurrencies = cacheResults.cryptoCurrencies.slice(0, limit);
          }

          const successResponse = new SuccessResponseHandler(
            HttpStatusConstants.SOURCE_OK,
            CryptoCurrencyConstants.SUCCESS_MESSAGE.CRYPTO_AND_FIAT_CURRENCIES_FETCHED_SUCCESSFULLY,
            formattedResp,
            CryptoCurrencyConstants.SUCCESS_CUSTOM_CODE.CRYPTO_AND_FIAT_CURRENCIES_FETCHED_SUCCESSFULLY
          );

          return successResponse.sendResponse(res);
        } else {
          CryptoCurrencyCacheManager.SET_CURRENCIES_LIST_DATA = {};
          next();
        }
      } else {
        next();
      }
    } catch (error) {
      console.log('Error in cryptoAndFiatCurrencyListCacheCheck at cryptoCurrency.cacheCheck.js ', error);

      const errorResponse = new ErrorResponseHandler(
        HttpStatusConstants.INTERNAL_SERVER,
        null,
        CryptoCurrencyConstants.ERROR_CUSTOM_CODE.CRYPTO_AND_FIAT_CURRENCIES_FETCH_FAILED
      );

      return errorResponse.sendResponse(res);
    }
  }
}
