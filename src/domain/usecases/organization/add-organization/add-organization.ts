export interface AddOrganizationParams {
  organizationId: string
  name: string
}

export interface AddOrganization {
  add: (addOrganizationParams: AddOrganizationParams) => Promise<boolean>
}
