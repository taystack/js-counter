#!/usr/bin/env bash

rm -rf lib/

# Don't build a failing test
./node_modules/.bin/jest && \
./node_modules/.bin/babel src -d lib

echo """
/lib dir generated, to deploy this build, update the package.json version then run:

  \$ npm publish --access public

"""
