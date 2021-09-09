resource "aws_dynamodb_table" "memberships" {
  name     = "${terraform.workspace}-memberships"
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

resource "aws_dynamodb_table_item" "sample_membership" {
  table_name = aws_dynamodb_table.memberships.name
  hash_key   = aws_dynamodb_table.memberships.hash_key

  item = <<ITEM
  {
    "id": {"S": "${var.sample_id}"},
    "userId": {"S": "${var.sample_id}"},
    "userName": {"S": "${var.sample_name}"},
    "userEmail": {"S": "${var.sample_email}"},
    "userRole": {"S": "sysadmin"},
    "organizationId": {"S": "${var.sample_organization_id}"},
    "organizationName": {"S": "${var.sample_organization_name}"}
  }
  ITEM
}