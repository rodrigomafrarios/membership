/* eslint no-template-curly-in-string: "off" */

import { handlerPath } from '../../libs/handlerResolver'

export default {
  role: '${ssm:${self:custom.stage}-list-organizations-iam-role}',
  environment: {
    DYNAMODB_TABLE_ORGANIZATIONS: '${ssm:${self:custom.stage}-organizations}'
  },
  handler: `${handlerPath(__dirname)}/main.handler`,
  events: [
    {
      http: {
        method: 'get',
        path: 'organization/{organizationId}',
        authorizer: {
          arn: '${ssm:${self:custom.stage}-user-authorizer}',
          resultTtlInSeconds: 0
        },
        request: {
          parameters: {
            paths: {
              organizationId: true
            }
          }
        }
      }
    }
  ]
}
