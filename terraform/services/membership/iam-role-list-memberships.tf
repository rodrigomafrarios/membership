resource "aws_iam_role" "list_memberships_iam_role" {
  name               = "${terraform.workspace}-list-memberships-iam-role"
  assume_role_policy = templatefile("${path.module}/templates/lambda-base-policy.tpl", {})
}

resource "aws_ssm_parameter" "list_memberships_iam_role" {
  name      = "${terraform.workspace}-list-memberships-iam-role"
  type      = "String"
  value     = aws_iam_role.list_memberships_iam_role.arn
  overwrite = true
}
