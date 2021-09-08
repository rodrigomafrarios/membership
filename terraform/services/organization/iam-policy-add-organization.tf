resource "aws_iam_policy" "add_organization_policy" {
  name = "${terraform.workspace}-add-organization-policy"
  policy = templatefile("${path.module}/templates/dynamodb-policy.tpl", {
    actions  = jsonencode([for action in var.dynamodb_add_organization_actions : action]),
    resource = "arn:aws:dynamodb:${var.region}:${var.account_id}:table/${terraform.workspace}-organizations"
  })
}