<h1>Membership Service</h1>
Example of membership.

<b><h2>Endpoints</h2></b>
- Login

- Create user
- List users
- Load user by id

- Create an organization
- List organizations
- Load organization by id

- Create membership
- Load membership by organization id


<b><h2>Roles</h2></b>
- SYSADMIN
  - Do everything
- ORGADMIN
  - Allowed to create members and organizations
  - Allowed to do everything that ORGUSER do
- ORGUSER
  - Allowed to list members and load a member by id
  - Allowed to do everything that USER do
- USER
  - Allowed to list organizations and load an organization by id

---

<b><h2>Documentation</h2></b>

[Swagger](swagger.json)

Generated by aws cli:
<pre>aws apigateway get-export --profile (cat ~/.aws/credentials) --region YOUR_REGION --rest-api-id API_GATEWAY_ID --stage-name YOUR_STAGE --export-type swagger swagger.json</pre>

[Architecture diagram](draw.io)

import the `tenchi` file on draw.io

---

<b><h2>Bootstrap</h2></b>

<b><h3>Terraform</h3></b>

Config `dev` profile cat ~/.aws/credentials
<pre>
[dev]
aws_access_key_id = YOUR_AWS_ACCESS_KEY_ID
aws_secret_access_key = YOUR_AWS_SECRET_ACCESS_KEY
</pre>

Download [terraform](https://www.terraform.io/downloads.html)

---

<b><h2>Deploy</h2></b>


<b><h3>Lambda code</h3></b>
Run:
<pre>
npm i
npm run bootstrap
npm run deploy:dev or npm run start:dev
</pre>

<b><h3>Terraform</h3></b>
Run: 
<pre>
cd terraform/env/dev
terraform init
terraform plan
terraform apply -auto-approve
</pre>

---

<b><h2>Test</h2></b>

1) /login POST

<pre>
{
    "email": "hate_frampton@gmail.com",
    "password": "123"
}
</pre>


2) Get token and fill Authorization header

obs: this user is a SYSADMIN