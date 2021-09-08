resource "aws_dynamodb_table" "organizations" {
  name     = "${terraform.workspace}-organizations"
  hash_key = "organizationId"
  attribute {
    name = "organizationId"
    type = "S"
  }
  write_capacity   = var.write_capacity
  read_capacity    = var.read_capacity
  stream_enabled   = true
  stream_view_type = "NEW_IMAGE"
}

resource "aws_dynamodb_table_item" "sample_organization" {
  table_name = aws_dynamodb_table.organizations.name
  hash_key   = aws_dynamodb_table.organizations.hash_key

  item = <<ITEM
  {
    "id": {"S": "${var.sample_id}"},
    "organizationId": {"S": "${var.sample_organization_id}"},
    "name": {"S": "${var.sample_organization_name}"}
  }
  ITEM
}