#!/bin/sh -e

cd $(dirname "$0")

echo "Deleting old publication"
rm -rf public
mkdir public
git worktree prune
rm -rf .git/worktrees/public/

echo "Checking out gh-pages branch into public"
git worktree add -B gh-pages public origin/gh-pages

echo "Removing existing files"
rm -rf public/*

echo "Generating site"
npm run build
echo 'mkk.schuetze.ag' > public/CNAME

echo "Updating gh-pages branch"
cd public
git add --all
git commit -m "Publishing to gh-pages (deploy.sh)"
git push -u origin gh-pages
