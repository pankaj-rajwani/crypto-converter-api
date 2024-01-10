# crypto-converter-api

This Node.js application serves as a backend for a Crypto Currency Converter application, utilizing the CoinMarketCap free API. It provides a robust foundation for handling currency conversion logic, enabling users to convert amounts between various cryptocurrencies and fiat currencies such as USD, EUR, and more.

## Features

- `Cryptocurrencies`: Fetches list of trending and latest cryptocurrencies.
- `Supported Fiat Currencies`: Provides a list of supported fiat currencies for seamless conversion.
- `Currency Conversion`: Implements the necessary logic to convert amounts between cryptocurrencies and selected fiat currencies.
- `Error Handling`: Ensures basic error handling and validation of user inputs for a reliable user experience.
- `API Testing`: Equips unit and functional test cases for testing key functionalities.

## Technologies Used

- `Node.js & Express.js`: For building a scalable and efficient backend server.
- `Axios`: For making HTTP requests.
- `Jest`: For writing efficient test cases.
- `Babel`: For writing code in the latest ECMAScript syntax
- `CoinMarketCap API`: For providing cryptocurrencies data along with their supported fiat currencies and the ability to have price conversion.

## Code Quality and Structure

- `Clean Code`: Well-organized and documented code for maintainability.
- `Modular Structure`: Demonstrates a clear understanding of software architecture with proper folder structuring.

## Setup

This project is using [Yarn](https://yarnpkg.com/en/docs/install) as package manager, if you do not have this installed on your machine, please install by looking at the [Yarn docuentation and tutorials](https://classic.yarnpkg.com/en/docs).

### Installing dependencies

    yarn add

### Starting the server in development mode

    yarn dev

- `Note`: Before starting the server, create a .env file and add the environment variables listed in the .env.development file.

### Starting the server in production mode

    yarn start

- `Note`: Before starting the server, create a .env file and add the environment variables listed in the .env.production file.

### Running test cases in silent mode

    yarn test

### Running test cases in coverage mode

    yarn test:coverage

## API Endpoints

This section provides documentation for various endpoints exposed by the application's API.Below is the detailed list of available endpoints along with their corresponding methods, parameters, and expected responses. Developers can use this information to integrate and interact with the system programmatically.

### Fetch list of latest cryptocurrencies along with their supported fiat currencies

#### Request

`GET /api/v1/crypto-currency/crypto-and-fiat/list?limit=[1-5000]`

    curl -i -H 'Accept: application/json' https://crypto-converter-api.onrender.com/api/v1/crypto-currency/crypto-and-fiat/list?limit=100

#### Response

    {
    "status": "success",
    "message": "Crypto and fiat currencies fetched successfully.",
    "customCode": "CRYPTO_AND_FIAT_CURRENCIES_FETCHED_SUCCESSFULLY",
    "data": {
        "cryptoCurrencies": [
            {
                "id": 1,
                "name": "Bitcoin",
                "symbol": "BTC"
            },
            {
                "id": 1027,
                "name": "Ethereum",
                "symbol": "ETH"
            },
            .....rest 98 crypto currencies
        ],
        "fiatCurrencies": [
            {
                "id": 2781,
                "name": "United States Dollar",
                "sign": "$",
                "symbol": "USD"
            },
            {
                "id": 2782,
                "name": "Australian Dollar",
                "sign": "$",
                "symbol": "AUD"
            },
            .....rest supported fiat currencies
        ],
        "fromCache": false
        }

    }

### Convert an amount from crypto currency to fiat currency

#### Request

`GET /api/v1/crypto-currency/currency-converter?amount[0.00000001-1000000000000]&crypto_currency_cmc_id=[valid CoinMarketCap id]&fiat_currency_cmc_id=[valid CoinMarketCap id]`

    curl -i -H 'Accept: application/json' https://crypto-converter-api.onrender.com/api/v1/crypto-currency/currency-converter?amount=100&crypto_currency_cmc_id=1&fiat_currency_cmc_id=2781

#### Response

    {
    "status": "success",
    "message": "Crypto currency converted successfully.",
    "customCode": "CRYPTO_CURRENCY_CONVERTED_SUCCESSFULLY",
    "data": {
        "id": 1,
        "symbol": "BTC",
        "name": "Bitcoin",
        "amount": 100,
        "last_updated": "2024-01-10T13:14:00.000Z",
        "quote": {
            "2781": {
                "price": 4512082.070691252,
                "last_updated": "2024-01-10T13:13:54.000Z"
                }
            }
        }
    }
