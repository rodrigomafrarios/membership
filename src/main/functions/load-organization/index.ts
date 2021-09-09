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
