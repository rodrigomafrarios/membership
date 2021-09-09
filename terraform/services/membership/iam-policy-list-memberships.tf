resource "aws_iam_policy" "list_memberships_policy" {
  name = "${terraform.workspace}-list-memberships-policy"
  policy = templatefile("${path.module}/templates/dynamodb-policy.tpl", {
    actions  = jsonencode([for action in var.dynamodb_list_memberships_actions : action]),
    resource = "arn:aws:dynamodb:${var.region}:${var.account_id}:table/${terraform.workspace}-memberships"
  })
}
