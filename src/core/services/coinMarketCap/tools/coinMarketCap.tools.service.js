import { CoinMarketCapConfig } from '../coinMarketCap.config.js';

/**
 * @description Handles all tools services (currency conversion) provided by CoinMarketCap.
 * @class ToolsService
 * @author pankaj-rajwani <rajwanipankaj23@gmail.com>
 */
export class ToolsService {
  /**
   * @description Initializes the class with the CoinMarketCap client to fetch data.
   * @param {object} client - Interface handling API calls
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * @description Converts an amount of one cryptocurrency into another currency utilizing the latest market rate for each currency.
   * @param {number} amount - The amount to convert
   * @param {string} sourceCurrencyId - CMC Id of the source crypto currency
   * @param {string} targetCurrencyId - CMC Id of the target fiat currency
   * @return {object} Object containing API response status and conversion data
   */
  convertCryptoCurrency(amount, sourceCurrencyId, targetCurrencyId) {
    const apiUrl = CoinMarketCapConfig.API_URLS.priceConversion;
    const reqParams = { amount, id: sourceCurrencyId, convert_id: targetCurrencyId };

    return this.client
      .request(apiUrl, 'GET', null, reqParams)
      .then((resp) => {
        if (resp.status.error_code === 0 && resp.status.error_message === null) {
          return resp;
        }
        throw resp.data.status;
      })
      .catch((err) => {
        console.error('Error at convertCryptoCurrency in coinMarketCap.tools.service:', err);
        throw err;
      });
  }
}
