resource "aws_iam_policy_attachment" "add_membership_policy_attachment" {
  name       = "${terraform.workspace}-add-membership-attachment"
  roles      = [aws_iam_role.add_membership_iam_role.name]
  policy_arn = aws_iam_policy.add_membership_policy.arn
}