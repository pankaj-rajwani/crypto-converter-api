import axios from 'axios';
import dotenv from 'dotenv';

import { ToolsService } from './tools/index.js';
import { FiatCurrencyService } from './fiatCurrency/index.js';
import { CryptoCurrencyService } from './cryptoCurrency/index.js';

dotenv.config();

/**
 * @description Interface for communicating with CoinMarketCap services.
 * @class CoinMarketCapClient
 * @author pankaj-rajwani <rajwanipankaj23@gmail.com>
 */
class CoinMarketCapClient {
  /**
   * @description Constructor initializing different services for simplified usage.
   */
  constructor() {
    this.Tools = new ToolsService(this);
    this.FiatCurrency = new FiatCurrencyService(this);
    this.CryptoCurrency = new CryptoCurrencyService(this);
  }

  /**
   * @description Main function for communicating with the API, takes care of formatting the request and appending the auth header.
   * @param {string} apiUrl - The URL for the API endpoint
   * @param {string} method - The API call method (GET, POST, PUT, etc)
   * @param {object} body - The data to be passed to the endpoint (optional)
   * @param {object} params - Query parameters for the API endpoint (optional)
   * @return {object} Response assumed in JSON format
   */
  request(apiUrl, method, body, params) {
    const baseUrl = process.env.COINMARKETCAP_API_BASE_URL || '';
    const apiKey = process.env.COINMARKETCAP_API_KEY || '';

    const reqConfig = { url: baseUrl + apiUrl, method: method, params: { CMC_PRO_API_KEY: apiKey } };

    if (body) {
      reqConfig.data = body;
    }

    if (params) {
      reqConfig.params = { ...reqConfig.params, ...params };
    }

    return axios
      .request(reqConfig)
      .then((resp) => resp.data)
      .catch((err) => {
        if (err.response) {
          throw err.response.data.status;
        }
        throw err.message;
      });
  }
}

export default new CoinMarketCapClient();
