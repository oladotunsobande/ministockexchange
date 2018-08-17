## Mini Stock Exchange
A Node.js application that allows you to get companies that best match your stock parameters

## Requirements

You need to install Node.js of version 8.9.2 or higher.

## Installation

###  Setting up the node.js application

- Clone the Git repository for the node.js application using the URI below
	https://github.com/oladotunsobande/ministockexchange.git
	
- Change your directory to 'ministockexchange' and install dependencies using the following command:

```bash
npm install
```
	
- Once all dependencies are installed, you can now build the application using the following command:

```bash
npm run build
```
	
Your node.js server is now up and running and awaiting requests.


## Consuming the REST API

The details of the REST API is as follows:

- HTTP Method: `GET`
- URI: `http://127.0.0.1:3000/api/trade`
- PATH: `/api/trade`
- PARAMETERS: `CountryCode, BaseBid and Category`

Example:

```bash
curl "http://127.0.0.1:3000/api/trade?CountryCode=US&BaseBid=10&Category=Finance"
```

Sample response is `{"message": "Response = C2"}`


## Unit and Integration Tests

### Integration Tests

To run the integration tests, type the following URL on the browser:

`http://127.0.0.1:3000/test`


### Component Test

For component tests, run the following command on the terminal/command prompt:

```bash
npm run test
```