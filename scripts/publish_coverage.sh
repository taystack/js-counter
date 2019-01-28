#!/usr/bin/env bash

echo """

  Publishing Coverage

"""
./node_modules/.bin/jest --coverage && \
cat ./coverage/lcov.info | ./node_modules/.bin/coveralls

./node_modules/.bin/codecov --token="$CODECOV_TOKEN_JS_COUNTER"
