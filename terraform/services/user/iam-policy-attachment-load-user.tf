resource "aws_iam_policy_attachment" "load_user_policy_attachment" {
  name       = "${terraform.workspace}-load-user-attachment"
  roles      = [aws_iam_role.load_user_iam_role.name]
  policy_arn = aws_iam_policy.load_user_policy.arn
}