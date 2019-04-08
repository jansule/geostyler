#!/bin/sh
set -ex

if [ "$TRAVIS" != "true" ]; then
  # Only do something on travis.
  echo "This script is supposed to be run inside the travis environment."
  return 1;
fi

if [ $TRAVIS_PULL_REQUEST != "false" ]; then
  # Dont build anything for PR requests, only for merges.
  return 0;
fi

if [ -z "$TRAVIS_TAG" ]; then
  # Only update when a tag was pushed / a new release was published
  return 0;
fi

echo "updating gh-pages"

