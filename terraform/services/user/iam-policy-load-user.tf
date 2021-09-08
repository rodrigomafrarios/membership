resource "aws_iam_policy" "load_user_policy" {
  name = "${terraform.workspace}-load-user-policy"
  policy = templatefile("${path.module}/templates/dynamodb-policy.tpl", {
    actions  = jsonencode([for action in var.dynamodb_load_user_actions : action]),
    resource = "arn:aws:dynamodb:${var.region}:${var.account_id}:table/${terraform.workspace}-users"
  })
}