resource "aws_iam_policy_attachment" "list_organizations_policy_attachment" {
  name       = "${terraform.workspace}-list-organizations-attachment"
  roles      = [aws_iam_role.list_organizations_iam_role.name]
  policy_arn = aws_iam_policy.list_organizations_policy.arn
}