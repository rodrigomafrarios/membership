resource "aws_iam_role" "list_organizations_iam_role" {
  name               = "${terraform.workspace}-list-organizations-iam-role"
  assume_role_policy = templatefile("${path.module}/templates/lambda-base-policy.tpl", {})
}

resource "aws_ssm_parameter" "list_organizations_iam_role" {
  name      = "${terraform.workspace}-list-organizations-iam-role"
  type      = "String"
  value     = aws_iam_role.list_organizations_iam_role.arn
  overwrite = true
}
