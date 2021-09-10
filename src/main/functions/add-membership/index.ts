/* eslint no-template-curly-in-string: "off" */

import { handlerPath } from '../../libs/handlerResolver'
import schema from './schema'

export default {
  role: '${ssm:${self:custom.stage}-add-membership-iam-role}',
  environment: {
    DYNAMODB_TABLE_MEMBERSHIPS: '${ssm:${self:custom.stage}-memberships}',
    DYNAMODB_TABLE_ORGANIZATIONS: '${ssm:${self:custom.stage}-organizations}',
    DYNAMODB_TABLE_USERS: '${ssm:${self:custom.stage}-users}'
  },
  handler: `${handlerPath(__dirname)}/main.handler`,
  events: [
    {
      http: {
        method: 'post',
        path: 'membership/create',
        authorizer: {
          arn: '${ssm:${self:custom.stage}-sysadmin-authorizer}'
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
