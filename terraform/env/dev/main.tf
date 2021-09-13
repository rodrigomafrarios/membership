data "aws_caller_identity" "current" {}

module "global_variables" {
  source = "../../global_variables"
}

module "system" {
  source                   = "../../services/system"
  account_id               = module.global_variables.account_id
  read_capacity            = 5
  write_capacity           = 5
  sample_id                = var.sample_id
  sample_email             = var.sample_email
  sample_password          = var.sample_password
  sample_name              = var.sample_name
  sample_organization_id   = var.sample_organization_id
  sample_organization_name = var.sample_organization_name
  sample_jwt_secret        = var.sample_jwt_secret
}

module "user" {
  source                      = "../../services/user"
  account_id                  = module.global_variables.account_id
  dynamodb_add_user_actions   = var.dynamodb_add_user_actions
  dynamodb_login_actions      = var.dynamodb_login_actions
  dynamodb_list_users_actions = var.dynamodb_list_users_actions
  dynamodb_load_user_actions  = var.dynamodb_load_user_actions
  sample_jwt_secret           = var.sample_jwt_secret
}

module "organization" {
  source                              = "../../services/organization"
  account_id                          = module.global_variables.account_id
  dynamodb_add_organization_actions   = var.dynamodb_add_organization_actions
  dynamodb_list_organizations_actions = var.dynamodb_list_organizations_actions
  dynamodb_load_organization_actions  = var.dynamodb_load_organization_actions
}

module "membership" {
  source                             = "../../services/membership"
  account_id                         = module.global_variables.account_id
  dynamodb_list_memberships_actions  = var.dynamodb_list_memberships_actions
}

module "login" {
  source = "../../services/login"
  account_id               = module.global_variables.account_id
  dynamodb_login_actions   = var.dynamodb_login_actions
}