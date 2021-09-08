#signup
dynamodb_signup_actions = [
  "dynamodb:GetItem",
  "dynamodb:PutItem",
  "dynamodb:UpdateItem",
  "ec2:DescribeInstances",
  "ec2:CreateNetworkInterface",
  "ec2:AttachNetworkInterface",
  "ec2:DescribeNetworkInterfaces",
  "autoscaling:CompleteLifecycleAction"
]

#login
dynamodb_login_actions = ["dynamodb:UpdateItem", "dynamodb:GetItem"]

#list users
dynamodb_list_users_actions = ["dynamodb:Scan"]