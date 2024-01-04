import { CoinMarketCapService } from '../../services/index.js';
import { CryptoCurrencyConstants, HttpStatusConstants } from '../../utils/constants/index.js';
import { CryptoCurrencyCacheManager, SuccessResponseHandler, ErrorResponseHandler } from '../../utils/helpers/index.js';

/**
 * @description Controller handling crypto-currency related operations based on application logic.
 * @class CryptoCurrencyController
 * @author pankaj-rajwani <rajwanipankaj23@gmail.com>
 */
export class CryptoCurrencyController {
  /**
   * @description Fetches the latest crypto and fiat currencies from CoinMarketCap.
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @return {object} - API success/error response
   * @async
   */
  async getCryptoAndFiatCurrencies(req, res) {
    try {
      const { limit } = req.query;

      // Fetch latest crypto and fiat currencies from CoinMarketCap service
      const cryptoCurrencies = await CoinMarketCapService.CryptoCurrency.fetchLatestCryptoCurrencies(limit);
      const fiatCurrencies = await CoinMarketCapService.FiatCurrency.fetchSupportedFiatCurrencies();

      // Format crypto data for response
      const formattedCryptoData = cryptoCurrencies.data.map(({ id, name, symbol }) => ({
        id,
        name,
        symbol,
      }));

      // Combine crypto and fiat data
      const combinedData = {
        cryptoCurrencies: formattedCryptoData,
        fiatCurrencies: fiatCurrencies.data,
      };

      // Cache the combined data with timestamp and refresh interval
      CryptoCurrencyCacheManager.SET_CURRENCIES_LIST_DATA = {
        ...combinedData,
        timestamp: new Date(),
        refreshInterval: 300,
      };

      combinedData.fromCache = false;

      // Send success response with combined data
      const successResponse = new SuccessResponseHandler(
        HttpStatusConstants.SOURCE_OK,
        CryptoCurrencyConstants.SUCCESS_MESSAGE.CRYPTO_AND_FIAT_CURRENCIES_FETCHED_SUCCESSFULLY,
        combinedData,
        CryptoCurrencyConstants.SUCCESS_CUSTOM_CODE.CRYPTO_AND_FIAT_CURRENCIES_FETCHED_SUCCESSFULLY
      );

      return successResponse.sendResponse(res);
    } catch (err) {
      // Handle errors and send appropriate error response
      const errorCode = typeof err === 'object' ? err.error_code : HttpStatusConstants.INTERNAL_SERVER;
      const errorMessage = typeof err === 'object' ? err.error_message : null;

      const errorResponse = new ErrorResponseHandler(
        errorCode,
        errorMessage,
        CryptoCurrencyConstants.ERROR_CUSTOM_CODE.CRYPTO_AND_FIAT_CURRENCIES_FETCH_FAILED
      );

      return errorResponse.sendResponse(res);
    }
  }

  /**
   * @description Converts an amount of one cryptocurrency into another currency.
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @return {object} - API success/error response
   * @async
   */
  async convertCryptoCurrencyIntoAnotherCurrency(req, res) {
    try {
      const { amount, crypto_currency_cmc_id, fiat_currency_cmc_id } = req.query;

      // Convert cryptocurrency using CoinMarketCap service
      const { data } = await CoinMarketCapService.Tools.convertCryptoCurrency(
        amount,
        crypto_currency_cmc_id,
        fiat_currency_cmc_id
      );

      // Send success response with conversion data
      const successResponse = new SuccessResponseHandler(
        HttpStatusConstants.SOURCE_OK,
        CryptoCurrencyConstants.SUCCESS_MESSAGE.CRYPTO_CURRENCY_CONVERTED_SUCCESSFULLY,
        data,
        CryptoCurrencyConstants.SUCCESS_CUSTOM_CODE.CRYPTO_CURRENCY_CONVERTED_SUCCESSFULLY
      );

      return successResponse.sendResponse(res);
    } catch (err) {
      console.log(err);
      // Handle errors and send appropriate error response
      const errorCode = typeof err === 'object' ? err.error_code : HttpStatusConstants.INTERNAL_SERVER;
      const errorMessage = typeof err === 'object' ? err.error_message : null;

      const errorResponse = new ErrorResponseHandler(
        errorCode,
        errorMessage,
        CryptoCurrencyConstants.ERROR_CUSTOM_CODE.CRYPTO_CURRENCY_CONVERSION_FAILED
      );

      return errorResponse.sendResponse(res);
    }
  }
}
