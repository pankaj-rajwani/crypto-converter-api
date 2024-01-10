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

## API Endpoints
- `GET /api/v1/crypto-currency/crypto-and-fiat/list?limit=[1-5000]`: Fetches list of latest cryptocurrencies along with their supported fiat currencies
- `GET /api/v1/crypto-currency/currency-converter?amount[0.00000001-1000000000000]&crypto_currency_cmc_id:[eg: 1]&fiat_currency_cmc_id=[eg: 2784]`: Converts a given amount from a source cryptocurrency to a target fiat currency.

## Setup
This project is using [Yarn](https://yarnpkg.com/en/docs/install) as package manager, if you do not have this installed on your machine please start by looking at the [Yarn docuentation and tutorials](https://classic.yarnpkg.com/en/docs).

`Documentation to be continued...`
