{
"Version": "2012-10-17",
"Statement": [
    {
    "Action": ${actions},
    "Effect": "Allow",
    "Resource": "${resource}"
    },
    {
        "Effect": "Allow",
        "Action": [
            "logs:CreateLogGroup",
            "logs:CreateLogStream",
            "logs:PutLogEvents"
        ],
        "Resource": "*"
    }
]
}