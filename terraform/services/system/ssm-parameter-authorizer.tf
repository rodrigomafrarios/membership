resource "aws_ssm_parameter" "sysadmin-authorizer" {
  name      = "${terraform.workspace}-sysadmin-authorizer"
  type      = "String"
  value     = "arn:aws:lambda:${var.region}:${var.account_id}:function:${var.project}-${terraform.workspace}-sysAdminAuth"
  overwrite = true
}

resource "aws_ssm_parameter" "orgadmin-authorizer" {
  name      = "${terraform.workspace}-orgadmin-authorizer"
  type      = "String"
  value     = "arn:aws:lambda:${var.region}:${var.account_id}:function:${var.project}-${terraform.workspace}-orgAdminAuth"
  overwrite = true
}

resource "aws_ssm_parameter" "orguser-authorizer" {
  name      = "${terraform.workspace}-orguser-authorizer"
  type      = "String"
  value     = "arn:aws:lambda:${var.region}:${var.account_id}:function:${var.project}-${terraform.workspace}-orgUserAuth"
  overwrite = true
}

resource "aws_ssm_parameter" "user-authorizer" {
  name      = "${terraform.workspace}-user-authorizer"
  type      = "String"
  value     = "arn:aws:lambda:${var.region}:${var.account_id}:function:${var.project}-${terraform.workspace}-userAuth"
  overwrite = true
}
