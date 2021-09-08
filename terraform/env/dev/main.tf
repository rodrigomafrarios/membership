data "aws_caller_identity" "current" {}

module "global_variables" {
  source = "../../global_variables"
}

module "system" {
  source            = "../../services/system"
  account_id        = module.global_variables.account_id
  read_capacity     = 5
  write_capacity    = 5
  sample_id         = var.sample_id
  sample_email      = var.sample_email
  sample_password   = var.sample_password
  sample_name       = var.sample_name
  sample_jwt_secret = var.sample_jwt_secret
}

module "user" {
  source                       = "../../services/user"
  account_id                   = module.global_variables.account_id
  dynamodb_table_users_name    = module.system.dynamodb_table_users_name
  dynamodb_signup_actions      = var.dynamodb_signup_actions
  dynamodb_login_actions       = var.dynamodb_login_actions
  dynamodb_list_users_actions  = var.dynamodb_list_users_actions
  dynamodb_load_user_actions   = var.dynamodb_load_user_actions
  sample_jwt_secret            = var.sample_jwt_secret
}