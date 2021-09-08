resource "aws_iam_role" "add_organization_iam_role" {
  name               = "${terraform.workspace}-add-organization-iam-role"
  assume_role_policy = templatefile("${path.module}/templates/lambda-base-policy.tpl", {})
}

resource "aws_ssm_parameter" "add_organization_iam_role" {
  name      = "${terraform.workspace}-add-organization-iam-role"
  type      = "String"
  value     = aws_iam_role.add_organization_iam_role.arn
  overwrite = true
}
