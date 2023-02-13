# COINAPI

![1.0.0](https://img.shields.io/github/package-json/v/smartcontractkit/external-adapters-js?filename=packages/sources/coinapi-test/package.json) ![v3](https://img.shields.io/badge/framework%20version-v3-blueviolet)

This document was generated automatically. Please see [README Generator](../../scripts#readme-generator) for more info.

## Environment Variables

| Required? |      Name       |                                 Description                                 |  Type   | Options |            Default            |
| :-------: | :-------------: | :-------------------------------------------------------------------------: | :-----: | :-----: | :---------------------------: |
|    ✅     |     API_KEY     | An API key that can be obtained from [here](https://www.coinapi.io/pricing) | string  |         |                               |
|           | WS_API_ENDPOINT |                        The websocket url for coinapi                        | string  |         |   `wss://ws.coinapi.io/v1/`   |
|           |   WS_ENABLED    |            Whether data should be returned from websocket or not            | boolean |         |            `false`            |
|           |  API_ENDPOINT   |                           The API url for coinapi                           | string  |         | `https://rest.coinapi.io/v1/` |

---

## Input Parameters

Every EA supports base input parameters from [this list](https://github.com/smartcontractkit/ea-framework-js/blob/main/src/config/index.ts)

| Required? |   Name   |     Description     |  Type  |                                      Options                                      | Default  |
| :-------: | :------: | :-----------------: | :----: | :-------------------------------------------------------------------------------: | :------: |
|           | endpoint | The endpoint to use | string | [assets](#assets-endpoint), [crypto](#crypto-endpoint), [price](#crypto-endpoint) | `crypto` |

## Crypto Endpoint

Supported names for this endpoint are: `crypto`, `price`.

### Input Params

| Required? | Name  |    Aliases     |                  Description                   |  Type  | Options | Default | Depends On | Not Valid With |
| :-------: | :---: | :------------: | :--------------------------------------------: | :----: | :-----: | :-----: | :--------: | :------------: |
|    ✅     | base  | `coin`, `from` | The symbol of symbols of the currency to query | string |         |         |            |                |
|    ✅     | quote | `market`, `to` |    The symbol of the currency to convert to    | string |         |         |            |                |

### Example

There are no examples for this endpoint.

---

## Assets Endpoint

`assets` is the only supported name for this endpoint.

### Input Params

| Required? | Name |    Aliases     |             Description             |  Type  | Options | Default | Depends On | Not Valid With |
| :-------: | :--: | :------------: | :---------------------------------: | :----: | :-----: | :-----: | :--------: | :------------: |
|    ✅     | base | `coin`, `from` | The symbol of the currency to query | string |         |         |            |                |

### Example

There are no examples for this endpoint.

---

MIT License