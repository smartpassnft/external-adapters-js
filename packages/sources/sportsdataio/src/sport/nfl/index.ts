import { AdapterError, Validator } from '@chainlink/ea-bootstrap'
import { Config, ExecuteFactory, ExecuteWithConfig } from '@chainlink/types'
import { makeConfig } from '../../config'
import { currentSeason, schedule, scores, teams } from './endpoint'

export const NAME = 'nfl'

const inputParams = {
  endpoint: true,
}

export const execute: ExecuteWithConfig<Config> = async (request, context, config) => {
  const validator = new Validator(request, inputParams)
  if (validator.error) throw validator.error

  const jobRunID = validator.validated.id
  const endpoint = validator.validated.data.endpoint

  switch (endpoint.toLowerCase()) {
    case currentSeason.NAME: {
      return await currentSeason.execute(request, context, config)
    }
    case schedule.NAME: {
      return await schedule.execute(request, context, config)
    }
    case scores.NAME: {
      return await scores.execute(request, context, config)
    }
    case teams.NAME: {
      return await teams.execute(request, context, config)
    }
    default: {
      throw new AdapterError({
        jobRunID,
        message: `Endpoint ${endpoint} not supported.`,
        statusCode: 400,
      })
    }
  }
}

export const makeExecute: ExecuteFactory<Config> = (config) => {
  return async (request, context) => execute(request, context, config || makeConfig())
}
