resource "aws_iam_policy" "login_policy" {
  name = "${terraform.workspace}-login-policy"
  policy = templatefile("${path.module}/templates/dynamodb-policy.tpl", {
    actions  = jsonencode([for action in var.dynamodb_login_actions : action]),
    resource = "arn:aws:dynamodb:${var.region}:${var.account_id}:table/${terraform.workspace}-users"
  })
}