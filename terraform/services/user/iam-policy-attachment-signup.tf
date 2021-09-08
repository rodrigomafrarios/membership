resource "aws_iam_policy_attachment" "signup_policy_attachment" {
  name       = "${terraform.workspace}-signup-attachment"
  roles      = [aws_iam_role.signup_iam_role.name]
  policy_arn = aws_iam_policy.signup_policy.arn
}