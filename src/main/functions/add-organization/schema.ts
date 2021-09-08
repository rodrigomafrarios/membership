export default {
  type: 'object',
  properties: {
    organizationId: { type: 'string' },
    name: { type: 'string' }
  },
  required: ['organizationId', 'name']
} as const
