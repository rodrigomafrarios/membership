/* eslint no-template-curly-in-string: "off" */

import { handlerPath } from '../../libs/handlerResolver'

export default {
  role: '${ssm:${self:custom.stage}-list-memberships-iam-role}',
  environment: {
    DYNAMODB_TABLE_MEMBERSHIPS: '${ssm:${self:custom.stage}-memberships}'
  },
  handler: `${handlerPath(__dirname)}/main.handler`,
  events: [
    {
      http: {
        method: 'get',
        path: 'memberships/list/{organizationId}',
        authorizer: {
          arn: '${ssm:${self:custom.stage}-orguser-authorizer}',
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
