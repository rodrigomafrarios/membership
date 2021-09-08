resource "aws_iam_policy_attachment" "add_organization_policy_attachment" {
  name       = "${terraform.workspace}-add-organization-attachment"
  roles      = [aws_iam_role.add_organization_iam_role.name]
  policy_arn = aws_iam_policy.add_organization_policy.arn
}