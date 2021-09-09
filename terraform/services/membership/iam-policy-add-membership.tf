resource "aws_iam_policy" "add_membership_policy" {
  name = "${terraform.workspace}-add-membership-policy"
  policy = jsonencode({
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AddMembership",
      "Effect": "Allow",
      "Action": [
        "dynamodb:PutItem",
        "ec2:DescribeInstances",
        "ec2:CreateNetworkInterface",
        "ec2:AttachNetworkInterface",
        "ec2:DescribeNetworkInterfaces",
        "autoscaling:CompleteLifecycleAction"
      ],
      "Resource": [
        "arn:aws:dynamodb:${var.region}:${var.account_id}:table/${terraform.workspace}-memberships"
      ]
    },
    {
      "Sid": "LoadOrganization",
      "Effect": "Allow",
      "Action": [
        "dynamodb:Scan"
      ],
      "Resource": [
        "arn:aws:dynamodb:${var.region}:${var.account_id}:table/${terraform.workspace}-organizations"
      ]
    },
    {
      "Sid": "LoadUser",
      "Effect": "Allow",
      "Action": [
        "dynamodb:Scan"
      ],
      "Resource": [
        "arn:aws:dynamodb:${var.region}:${var.account_id}:table/${terraform.workspace}-users"
      ]
    },
    {
      "Sid": "Logs",
      "Effect": "Allow",
      "Action": [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
      ],
      "Resource": "*"
    }
  ]
})
}
