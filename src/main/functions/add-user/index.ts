/* eslint no-template-curly-in-string: "off" */

import schema from './schema'
import { handlerPath } from '../../libs/handlerResolver'

export default {
  role: '${ssm:${self:custom.stage}-add-user-iam-role}',
  environment: {
    DYNAMODB_TABLE_USERS: '${ssm:${self:custom.stage}-users}',
    JWT_SECRET: '${ssm:${self:custom.stage}-jwt-secret}'
  },
  handler: `${handlerPath(__dirname)}/main.handler`,
  events: [
    {
      http: {
        method: 'post',
        path: 'user/create',
        authorizer: {
          arn: '${ssm:${self:custom.stage}-sysadmin-authorizer}',
          resultTtlInSeconds: 0
        },
        request: {
          schema: {
            'application/json': schema
          }
        }
      }
    }
  ]
}
