/**
 * @description Internal cache manager for the CryptoCurrency module.
 * @class CryptoCurrencyCacheManager
 * @author pankaj-rajwani <rajwanipankaj23@gmail.com>
 */
export class CryptoCurrencyCacheManager {
  static currenciesList = {};

  /**
   * @description Setter method for populating the currencies list variable.
   * @static
   * @param {object} data - Crypto+Fiat currencies list data
   */
  static set SET_CURRENCIES_LIST_DATA(data) {
    this.currenciesList = data;
  }

  /**
   * @description Getter method for getting currencies list data.
   * @static
   * @returns {object} Crypto+Fiat currencies list data
   */
  static get CURRENCIES_LIST_DATA() {
    return this.currenciesList;
  }
}
