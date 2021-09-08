resource "aws_ssm_parameter" "dynamodb-organizations-table" {
  name  = "${terraform.workspace}-organizations"
  type  = "String"
  value = aws_dynamodb_table.organizations.name
}
