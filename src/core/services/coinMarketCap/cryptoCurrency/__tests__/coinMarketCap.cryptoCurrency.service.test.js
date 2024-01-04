// coinMarketCap.client.test.js
import CoinMarketCapClient from '../../coinMarketCap.client.js';
import { CryptoCurrencyService } from '../coinMarketCap.cryptoCurrency.service.js';

jest.mock('../../coinMarketCap.client.js');

describe('CryptoCurrencyService Test Cases', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  //Test case for success scenario
  it('should make a successful API request for fetching list of latest cryptocurrencies', async () => {
    const mockApiResponse = {
      status: {
        error_code: 0,
        error_message: null,
      },
      data: [
        { name: 'Bitcoin', symbol: 'BTC' },
        { name: 'Ethereum', symbol: 'ETH' },
      ],
    };

    CoinMarketCapClient.request.mockResolvedValue(mockApiResponse);

    const cryptoCurrencyService = new CryptoCurrencyService(CoinMarketCapClient);

    const result = await cryptoCurrencyService.fetchLatestCryptoCurrencies();

    expect(CoinMarketCapClient.request).toHaveBeenCalledWith(expect.any(String), 'GET', null, { limit: 100 });

    expect(result).toEqual(mockApiResponse);
  });

  //Test case for failure scenario
  it('should handle API request failure for fetching latest crypto currencies', async () => {
    const mockApiError = {
      status: {
        timestamp: '2018-06-02T22:51:28.209Z',
        error_code: 500,
        error_message: 'An internal server error occurred',
        elapsed: 10,
        credit_count: 0,
      },
    };

    CoinMarketCapClient.request.mockRejectedValue(mockApiError);

    const cryptoCurrencyService = new CryptoCurrencyService(CoinMarketCapClient);

    await expect(cryptoCurrencyService.fetchLatestCryptoCurrencies()).rejects.toMatchObject({
      status: {
        timestamp: '2018-06-02T22:51:28.209Z',
        error_code: 500,
        error_message: 'An internal server error occurred',
        elapsed: 10,
        credit_count: 0,
      },
    });

    expect(CoinMarketCapClient.request).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String), // Expecting any method (GET, POST, etc.)
      null,
      expect.objectContaining({ limit: 100 })
    );
  });
});
