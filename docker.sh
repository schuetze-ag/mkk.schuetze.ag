#!/bin/bash -e

cd $(dirname "$0")

rm -rf public
npm run build

docker build --tag mkk-schuetze-ag .
