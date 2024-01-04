import { CoinMarketCapConfig } from '../coinMarketCap.config.js';

/**
 * @description Handles all fiat-currency services provided by CoinMarketCap.
 * @class FiatCurrencyService
 * @author pankaj-rajwani <rajwanipankaj23@gmail.com>
 */
export class FiatCurrencyService {
  /**
   * @description Initializes the class with the CoinMarketCap client to fetch data.
   * @param {object} client - Interface handling API calls
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * @description Fetches the list of supported fiat currencies.
   * @return {object} Object containing API response status and fiat currency data
   */
  fetchSupportedFiatCurrencies() {
    const apiUrl = CoinMarketCapConfig.API_URLS.fiatCurrencies;

    return this.client
      .request(apiUrl, 'GET')
      .then((resp) => {
        if (resp.status.error_code === 0 && resp.status.error_message === null) {
          return resp;
        }
        throw resp.status;
      })
      .catch((err) => {
        console.error('Error at fetchSupportedFiatCurrencies in coinMarketCap.fiatCurrency.service:', err);
        throw err;
      });
  }
}
