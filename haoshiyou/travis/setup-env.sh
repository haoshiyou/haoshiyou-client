#!/usr/bin/env bash

ENVSTR=""
if [ "$IONIC_ENV" == "prod" ]; then
  ENVSTR="prod"
else
  ENVSTR="dev"
fi

echo "Setting up haoshiyou env = $ENVSTR"

if [ -z "${GITHUB_TOKEN}" ]; then
  echo "Github repo 'haoshiyou-security' GITHUB_TOKEN not set in env vars. Now exit... !";
  exit 1
fi

OWNER="xinbenlv"
REPO="haoshiyou-security"

FILENAME="env.$ENVSTR.ts"
FILE="https://api.github.com/repos/$OWNER/$REPO/contents/$FILENAME"

curl -o "src/app/env.ts" \
     --header "Authorization: token ${GITHUB_TOKEN}" \
     --header "Accept: application/vnd.github.v3.raw" \
     --remote-name \
     --location $FILE
echo "Setting environment ${ENVSTR} done!."
