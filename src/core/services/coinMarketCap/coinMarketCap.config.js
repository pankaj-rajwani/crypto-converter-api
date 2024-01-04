import dotenv from 'dotenv';
dotenv.config();

/**
 * @description Configuration class for Coin Market Cap services.
 * @class CoinMarketCapConfig
 * @author pankaj-rajwani <rajwanipankaj23@gmail.com>
 */
export class CoinMarketCapConfig {
  /**
   * @description Returns the API URLs used by Coin Market Cap services.
   * @static
   * @returns {object} Object containing API URLs
   */
  static get API_URLS() {
    return {
      latestCryptoCurrencies: '/v1/cryptocurrency/listings/latest',
      priceConversion: '/v2/tools/price-conversion',
      fiatCurrencies: '/v1/fiat/map',
    };
  }
}
