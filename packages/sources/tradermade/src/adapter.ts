import { ExecuteWithConfig, Config, ExecuteFactory, AdapterRequest, AxiosResponse } from '@chainlink/types'
import { Requester, Validator, util } from '@chainlink/ea-bootstrap'
import { makeConfig, NAME } from './config'

export const batchablePropertyPath = ['from', 'to']

const customParams = {
  base: ['base', 'from', 'symbol', 'market'],
  to: false,
}

const handleBatchedRequest = (
  jobRunID: string,
  request: AdapterRequest,
  response: AxiosResponse<any>,
  resultPath: string,
) => {
  const payload: [AdapterRequest, number][] = []
  for (const pair of response.data.quotes) {
    const symbol = pair.base_currency
    const to = pair.quote_currency
    payload.push([
      {
        ...request,
        data: { ...request.data, from: symbol.toUpperCase(), to: to.toUpperCase() },
      },
      Requester.validateResultNumber(pair, [resultPath]),
    ])

  }
  return Requester.success(jobRunID, Requester.withResult(response, undefined, payload), true, batchablePropertyPath)
}


export const execute: ExecuteWithConfig<Config> = async (request, _, config) => {
  const validator = new Validator(request, customParams)
  if (validator.error) throw validator.error

  Requester.logConfig(config)

  const jobRunID = validator.validated.id
  const symbol = validator.overrideSymbol(NAME)
  const to = (validator.validated.data.to || '')
  const pairArray = []
  console.log(to)
  for (const fromCurrency of util.formatArray(symbol)) {
    for (const toCurrency of util.formatArray(to)) {
      pairArray.push(`${fromCurrency.toUpperCase() + toCurrency.toUpperCase()}`)
    }
  }
  const currency = pairArray.toString()
  const params = {
    ...config.api.params,
    currency,
  }

  const options = { ...config.api, params }

  const response = await Requester.request(options)
  if (Array.isArray(symbol) || Array.isArray(to)) return handleBatchedRequest(jobRunID, request, response, 'mid')

  response.data.result = Requester.validateResultNumber(response.data, ['quotes', 0, 'mid'])
  return Requester.success(jobRunID, response, config.api.verbose, batchablePropertyPath)
}

export const makeExecute: ExecuteFactory<Config> = (config) => {
  return async (request, context) => execute(request, context, config || makeConfig())
}
