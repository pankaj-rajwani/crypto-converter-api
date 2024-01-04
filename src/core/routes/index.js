import { CryptoCurrencyRoutes } from './cryptoCurrency.route.js';

/**
 * @description Class for setting up and managing application routes
 * @class Router
 * @author pankaj-rajwani <rajwanipankaj23@gmail.com>
 */
export class Router {
  /**
   * @description Configures application routes using the provided Express app instance
   * @static
   * @param {object} app - Express app instance
   * @param {string} apiVersion - API version
   */
  static APP_ROUTER(app, apiVersion) {
    app.use(`/api/${apiVersion}/crypto-currency`, CryptoCurrencyRoutes.ROUTES);
  }
}
