/* eslint no-template-curly-in-string: "off" */

import schema from './schema'
import { handlerPath } from '../../libs/handlerResolver'

export default {
  role: '${ssm:${self:custom.stage}-signup-iam-role}',
  environment: {
    DYNAMODB_TABLE_USERS: '${ssm:${self:custom.stage}-users}',
    JWT_SECRET: '${ssm:${self:custom.stage}-jwt-secret}'
  },
  handler: `${handlerPath(__dirname)}/main.handler`,
  events: [
    {
      http: {
        method: 'post',
        path: 'signup',
        request: {
          schema: {
            'application/json': schema
          }
        }
      }
    }
  ]
}