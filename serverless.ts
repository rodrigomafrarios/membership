import type { AWS } from '@serverless/typescript'

import { signUp, listUsers, loadUser } from './src/main/functions'

const serverlessConfiguration: AWS = {
  service: 'membership',
  frameworkVersion: '2',
  custom: {
    dynamodb: {
      stages: ['test'],
      start: {
        port: 8000,
        inMemory: true,
        migrate: true
      }
    },
    stage: "${opt:stage, self:provider.stage}"
  },
  plugins: ['serverless-dynamodb-local', 'serverless-offline', 'serverless-plugin-typescript'],
  package: {
    individually: true,
  },
  provider: {
    profile: 'dev',
    stage: 'dev',
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1'
    },
    lambdaHashingVersion: '20201221'
  },
  functions: { signUp, listUsers, loadUser }
}

module.exports = serverlessConfiguration
