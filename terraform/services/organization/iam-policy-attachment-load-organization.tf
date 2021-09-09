resource "aws_iam_policy_attachment" "load_organization_policy_attachment" {
  name       = "${terraform.workspace}-load-organization-attachment"
  roles      = [aws_iam_role.load_organization_iam_role.name]
  policy_arn = aws_iam_policy.load_organization_policy.arn
}