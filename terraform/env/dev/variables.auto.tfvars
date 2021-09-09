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

#load user
dynamodb_load_user_actions = ["dynamodb:Scan"]

#add organization
dynamodb_add_organization_actions = [
  "dynamodb:GetItem",
  "dynamodb:PutItem",
  "dynamodb:UpdateItem",
  "ec2:DescribeInstances",
  "ec2:CreateNetworkInterface",
  "ec2:AttachNetworkInterface",
  "ec2:DescribeNetworkInterfaces",
  "autoscaling:CompleteLifecycleAction"
]

# list organizations
dynamodb_list_organizations_actions = ["dynamodb:Scan"]

# load organization
dynamodb_load_organization_actions = ["dynamodb:Scan"]

# add membership
dynamodb_add_membership_actions = [
  "dynamodb:GetItem",
  "dynamodb:PutItem",
  "dynamodb:Scan",
  "ec2:DescribeInstances",
  "ec2:CreateNetworkInterface",
  "ec2:AttachNetworkInterface",
  "ec2:DescribeNetworkInterfaces",
  "autoscaling:CompleteLifecycleAction"
]