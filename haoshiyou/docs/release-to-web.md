# Release instructions

## Web

### Release to DEV

```shell
# First Time
git remote add publish-dev git@github.com:xinbenlv/dev-haoshiyou-org.git
git subtree push --prefix haoshiyou/www/ publish-dev web:gh-pages

# Second time and onward
git push publish-dev `git subtree split --prefix haoshiyou/www/ web`:gh-pages --force
```

### Release to PROD

TODO(xinbenlv): set up prod hosting

```shell
# First Time
git remote add publish-prod git@github.com:xinbenlv/www-haoshiyou-org.git
git subtree push --prefix haoshiyou/www/ publish-prod web:gh-pages

# Second time and onward
git push publish-prod `git subtree split --prefix haoshiyou/www/ web`:gh-pages --force
```