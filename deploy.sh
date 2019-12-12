#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f https://${GITHUB_TOKEN}@github.com/sijianian/sijianian.github.io.git master
git push -f https://pAYYogCAwg:${CODING_TOKEN}@e.coding.net/sijianian/blog.git master

cd -
