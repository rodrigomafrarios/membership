resource "aws_ssm_parameter" "dynamodb-users-table" {
  name  = "${terraform.workspace}-users"
  type  = "String"
  value = aws_dynamodb_table.users.name
}
