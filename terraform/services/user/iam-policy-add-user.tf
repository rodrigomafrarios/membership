resource "aws_iam_policy" "add_user_policy" {
  name = "${terraform.workspace}-add-user-policy"
  policy = templatefile("${path.module}/templates/dynamodb-policy.tpl", {
    actions  = jsonencode([for action in var.dynamodb_add_user_actions : action]),
    resource = "arn:aws:dynamodb:${var.region}:${var.account_id}:table/${terraform.workspace}-users"
  })
}