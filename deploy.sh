#!/bin/bash

set -e

echo "> Installing application dependencies"
npm install

echo "> Building web application"
npm run build

echo "> Deploying web application"
cd ./public/
surge . cvut-fel-via-schinbed.surge.sh

echo ""
echo "APP url: http://cvut-fel-via-schinbed.surge.sh/"
echo "API url: https://schinbed.pythonanywhere.com"
