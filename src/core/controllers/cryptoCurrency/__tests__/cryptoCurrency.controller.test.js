import request from 'supertest';
import app from '../../../../server/index.js';

describe('cryptoCurrency Controller Tests', () => {
  it('should convert currency successfully', async () => {
    const response = await request(app).get('/api/v1/crypto-currency/currency-convertor').query({
      amount: 10,
      crypto_currency_cmc_id: '1',
      fiat_currency_cmc_id: '2784',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('quote');
    expect(response.body.data.quote).toHaveProperty('2784');
    expect(response.body.data.quote['2784']).toHaveProperty('price');
    expect(response.body.data.quote['2784'].price).toBeGreaterThan(0);
  });

  it('should handle invalid source cryptocurrency', async () => {
    const response = await request(app).get('/api/v1/crypto-currency/currency-convertor').query({
      amount: 10,
      crypto_currency_cmc_id: 'INVALID_ID',
      fiat_currency_cmc_id: '2784',
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('status', 'error');
    expect(response.body).toHaveProperty('message', 'Validation errors!');
    expect(response.body).toHaveProperty('customCode', 'REQUEST_VALIDATION_FAILED');
    expect(response.body).toHaveProperty('errors', [
      '"crypto_currency_cmc_id" must be a valid numeric CMC currency id of string type',
    ]);
  });

  it('should handle missing amount', async () => {
    const response = await request(app).get('/api/v1/crypto-currency/currency-convertor').query({
      crypto_currency_cmc_id: '1',
      fiat_currency_cmc_id: '2784',
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('status', 'error');
    expect(response.body).toHaveProperty('message', 'Validation errors!');
    expect(response.body).toHaveProperty('customCode', 'REQUEST_VALIDATION_FAILED');
    expect(response.body).toHaveProperty('errors', [
      '"amount" is required for currency conversion',
      '"Amount" must be a float number between 0.00000001 and 1000000000000',
    ]);
  });
});
