export default {
  type: 'object',
  properties: {
    organizationId: { type: 'string' },
    userId: { type: 'string' }
  },
  required: ['organizationId', 'userId']
} as const
