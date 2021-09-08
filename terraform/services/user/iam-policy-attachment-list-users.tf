resource "aws_iam_policy_attachment" "list_users_policy_attachment" {
  name       = "${terraform.workspace}-list-users-attachment"
  roles      = [aws_iam_role.list_users_iam_role.name]
  policy_arn = aws_iam_policy.list_users_policy.arn
}