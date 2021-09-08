data "aws_caller_identity" "current" {}

output "account_id" {
  value = data.aws_caller_identity.current.account_id
}

output "region" {
  value = "us-east-1"
}

output "profile" {
  value = terraform.workspace
}
