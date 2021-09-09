resource "aws_iam_policy_attachment" "add_user_policy_attachment" {
  name       = "${terraform.workspace}-add-user-attachment"
  roles      = [aws_iam_role.add_user_iam_role.name]
  policy_arn = aws_iam_policy.add_user_policy.arn
}