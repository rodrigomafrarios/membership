resource "aws_iam_role" "load_user_iam_role" {
  name               = "${terraform.workspace}-load-user-iam-role"
  assume_role_policy = templatefile("${path.module}/templates/lambda-base-policy.tpl", {})
}

resource "aws_ssm_parameter" "load_user_iam_role" {
  name      = "${terraform.workspace}-load-user-iam-role"
  type      = "String"
  value     = aws_iam_role.load_user_iam_role.arn
  overwrite = true
}
