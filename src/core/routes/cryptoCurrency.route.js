import { Router } from 'express';
import { CryptoCurrencyController } from '../controllers/index.js';
import { CryptoCurrencyValidations } from '../middleware/validations/index.js';
import { CryptoCurrencyCacheCheckMiddleware } from '../middleware/cacheCheck/index.js';

/**
 * @description Class defining routes for the crypto currency module.
 * @class CryptoCurrencyRoutes
 * @author pankaj-rajwani <rajwanipankaj23@gmail.com>
 */
export class CryptoCurrencyRoutes {
  /**
   * @description Static method handling route definitions for the crypto currency module.
   * @returns {function} - Instance of router with defined routes.
   */
  static get ROUTES() {
    const CryptoCurrencyRouter = Router();
    const cryptoController = new CryptoCurrencyController();
    const validations = new CryptoCurrencyValidations();

    // Route to fetch the latest crypto and fiat currencies
    CryptoCurrencyRouter.get(
      '/crypto-and-fiat/list',
      validations.cryptoAndFiatCurrencyListValidationCheck,
      CryptoCurrencyCacheCheckMiddleware.cryptoAndFiatCurrencyListCacheCheck,
      cryptoController.getCryptoAndFiatCurrencies
    );

    // Route to convert one cryptocurrency into another currency
    CryptoCurrencyRouter.get(
      '/currency-converter',
      validations.currencyConversionValidationCheck,
      cryptoController.convertCryptoCurrencyIntoAnotherCurrency
    );

    return CryptoCurrencyRouter;
  }
}
