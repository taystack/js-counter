#!/usr/bin/env bash

./node_modules/.bin/jest --coverage

echo """
/coverage dir generated, to publish the new test coverage run:

  \$ yarn publish-coverage

"""
