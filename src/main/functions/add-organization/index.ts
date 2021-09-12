/* eslint no-template-curly-in-string: "off" */

import { handlerPath } from '../../libs/handlerResolver'
import schema from './schema'

export default {
  role: '${ssm:${self:custom.stage}-add-organization-iam-role}',
  environment: {
    DYNAMODB_TABLE_ORGANIZATIONS: '${ssm:${self:custom.stage}-organizations}'
  },
  handler: `${handlerPath(__dirname)}/main.handler`,
  events: [
    {
      http: {
        method: 'post',
        path: 'organization',
        authorizer: {
          arn: '${ssm:${self:custom.stage}-orgadmin-authorizer}'
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
