import AWS from 'aws-sdk'

export const DynamoDBClientFactory = (options: any): AWS.DynamoDB.DocumentClient => {
  if (options.region) {
    options.accessKeyId = '[ACCESS_KEY_ID]'
    options.secretAccessKey = '[SECRET_ACCESS_KEY]'
  }
  options.region = options.region ? options.region : process.env.AWS_REGION
  AWS.config.update(options)
  return new AWS.DynamoDB.DocumentClient(options)
}
