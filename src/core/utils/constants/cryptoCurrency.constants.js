/**
 * @description Class containing all the constants required for the cryptoCurrency controller.
 * @class CryptoCurrencyConstants
 * @author pankaj-rajwani <rajwanipankaj23@gmail.com>
 */
export class CryptoCurrencyConstants {
  static get SUCCESS_MESSAGE() {
    return {
      CRYPTO_AND_FIAT_CURRENCIES_FETCHED_SUCCESSFULLY: 'Crypto and fiat currencies fetched successfully.',
      CRYPTO_CURRENCY_CONVERTED_SUCCESSFULLY: 'Crypto currency converted successfully.',
    };
  }

  static get SUCCESS_CUSTOM_CODE() {
    return {
      CRYPTO_AND_FIAT_CURRENCIES_FETCHED_SUCCESSFULLY: 'CRYPTO_AND_FIAT_CURRENCIES_FETCHED_SUCCESSFULLY',
      CRYPTO_CURRENCY_CONVERTED_SUCCESSFULLY: 'CRYPTO_CURRENCY_CONVERTED_SUCCESSFULLY',
    };
  }

  static get ERROR_CUSTOM_CODE() {
    return {
      CRYPTO_AND_FIAT_CURRENCIES_FETCH_FAILED: 'CRYPTO_AND_FIAT_CURRENCIES_FETCH_FAILED',
      CRYPTO_CURRENCY_CONVERSION_FAILED: 'CRYPTO_CURRENCY_CONVERSION_FAILED',
      CRYPTO_AND_FIAT_CURRENCIES_CACHE_CHECK_FAILED: 'CRYPTO_AND_FIAT_CURRENCIES_CACHE_CHECK_FAILED',
    };
  }
}
