/* eslint no-template-curly-in-string: "off" */

import { handlerPath } from '../../libs/handlerResolver'

export default {
  role: '${ssm:${self:custom.stage}-load-user-iam-role}',
  environment: {
    DYNAMODB_TABLE_USERS: '${ssm:${self:custom.stage}-users}'
  },
  handler: `${handlerPath(__dirname)}/main.handler`,
  events: [
    {
      http: {
        method: 'get',
        path: 'user/{userId}',
        request: {
          parameters: {
            paths: {
              userId: true
            }
          }
        }
      }
    }
  ]
}
