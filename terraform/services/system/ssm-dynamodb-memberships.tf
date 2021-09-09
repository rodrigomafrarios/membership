resource "aws_ssm_parameter" "dynamodb-memberships-table" {
  name  = "${terraform.workspace}-memberships"
  type  = "String"
  value = aws_dynamodb_table.memberships.name
}
