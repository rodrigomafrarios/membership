resource "aws_iam_role" "add_membership_iam_role" {
  name               = "${terraform.workspace}-add-membership-iam-role"
  assume_role_policy = templatefile("${path.module}/templates/lambda-base-policy.tpl", {})
}

resource "aws_ssm_parameter" "add_membership_iam_role" {
  name      = "${terraform.workspace}-add-membership-iam-role"
  type      = "String"
  value     = aws_iam_role.add_membership_iam_role.arn
  overwrite = true
}
