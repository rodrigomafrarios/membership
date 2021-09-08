resource "aws_iam_role" "signup_iam_role" {
  name               = "${terraform.workspace}-signup-iam-role"
  assume_role_policy = templatefile("${path.module}/templates/lambda-base-policy.tpl", {})
}

resource "aws_ssm_parameter" "signup_iam_role" {
  name      = "${terraform.workspace}-signup-iam-role"
  type      = "String"
  value     = aws_iam_role.signup_iam_role.arn
  overwrite = true
}
