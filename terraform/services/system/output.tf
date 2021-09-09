output "dynamodb_table_users_name" {
  value = aws_dynamodb_table.users.name
}

output "dynamodb_table_organizations_name" {
  value = aws_dynamodb_table.organizations.name
}

output "dynamodb_table_memberships_name" {
  value = aws_dynamodb_table.memberships.name
}