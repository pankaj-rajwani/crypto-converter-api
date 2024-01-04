import { CoinMarketCapConfig } from '../coinMarketCap.config.js';

/**
 * @description Handles all cryptocurrency services provided by CoinMarketCap.
 * @class CryptoCurrencyService
 * @author pankaj-rajwani <rajwanipankaj23@gmail.com>
 */
export class CryptoCurrencyService {
  /**
   * @description Initializes the class with the CoinMarketCap client to fetch data.
   * @param {object} client - Interface handling API calls
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * @description Fetches the list of latest cryptocurrencies.
   * @param {number} limit - Maximum number of cryptocurrencies to be fetched (default: 100)
   * @return {object} Object containing API response status and currency data
   */
  fetchLatestCryptoCurrencies(limit = 100) {
    const apiUrl = CoinMarketCapConfig.API_URLS.latestCryptoCurrencies;
    const params = { limit };

    return this.client
      .request(apiUrl, 'GET', null, params)
      .then((resp) => {
        if (resp.status.error_code === 0 && resp.status.error_message === null) {
          return resp;
        }
        throw resp.status;
      })
      .catch((err) => {
        console.error('Error at fetchLatestCryptoCurrencies in coinMarketCap.cryptoCurrency.service:', err);
        throw err;
      });
  }
}
