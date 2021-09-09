resource "aws_iam_policy_attachment" "list_memberships_policy_attachment" {
  name       = "${terraform.workspace}-list-memberships-attachment"
  roles      = [aws_iam_role.list_memberships_iam_role.name]
  policy_arn = aws_iam_policy.list_memberships_policy.arn
}