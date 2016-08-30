#!/bin/bash

# This script downloads security related configuration and credentials from our
# security repository.

set -ev
mkdir -p www/config
curl -H 'Authorization: token $HAOSHIYOU_SECURITY_TOKEN' \
  -H 'Accept: application/vnd.github.v3.raw' \
  -o www/config/config.json -O \
  -L https://api.github.com/repos/xinbenlv/haoshiyou-security/config.json
