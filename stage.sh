#!/bin/sh -e

cd $(dirname "$0")
TAG=docker-registry-dev.ci.scag/mkk-schuetze-ag
CONTAINER=mkk-schuetze-ag
PORT=6009
export DOCKER_HOST=docker-host1:2375

./docker.sh
docker tag mkk-schuetze-ag $TAG
docker push $TAG

running_containers=$(docker ps --quiet --all --filter "name=$CONTAINER" | wc -l)
if [ $running_containers -gt 0 ]; then
  docker rm --force $CONTAINER
fi

docker run --detach --name $CONTAINER --publish $PORT:80 $TAG

echo "The website is now running on http://docker-host1:$PORT"
