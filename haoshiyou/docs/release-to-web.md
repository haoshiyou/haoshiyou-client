# Release instructions

## Web

### Release to DEV

```shell
# First Time
git remote add publish-dev git@github.com:xinbenlv/dev-haoshiyou-org.git
git subtree push --prefix haoshiyou/www/ publish-dev release-web-dev:gh-pages

# Second time and onward
git checkout release-web-dev
git merge master
./travis/setup-env.sh
ionic build ios --release
git add haoshiyou/www/ -f
git commit -m "web-release"

git push publish-dev `git subtree split --prefix haoshiyou/www/ release-web-dev`:gh-pages --force
```

### Release to PROD

TODO(xinbenlv): set up prod hosting

```shell
# First Time
git remote add publish-prod git@github.com:xinbenlv/www-haoshiyou-org.git
git subtree push --prefix haoshiyou/www/ publish-prod release-web-prod:gh-pages

# Second time and onward
git push publish-prod `git subtree split --prefix haoshiyou/www/ release-web-prod`:gh-pages --force
```
