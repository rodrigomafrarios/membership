resource "aws_iam_policy" "list_users_policy" {
  name = "${terraform.workspace}-list-users-policy"
  policy = templatefile("${path.module}/templates/dynamodb-policy.tpl", {
    actions  = jsonencode([for action in var.dynamodb_list_users_actions : action]),
    resource = "arn:aws:dynamodb:${var.region}:${var.account_id}:table/${terraform.workspace}-users"
  })
}