resource "aws_iam_policy" "list_organizations_policy" {
  name = "${terraform.workspace}-list-organizations-policy"
  policy = templatefile("${path.module}/templates/dynamodb-policy.tpl", {
    actions  = jsonencode([for action in var.dynamodb_list_organizations_actions : action]),
    resource = "arn:aws:dynamodb:${var.region}:${var.account_id}:table/${terraform.workspace}-organizations"
  })
}