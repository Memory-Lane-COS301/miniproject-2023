#!/usr/bin/env bash

set -ex

# CORE
yarn nx generate @nrwl/js:library feature --unitTestRunner=jest --directory=api/core --no-interactive

# AUTH
yarn nx generate @nrwl/js:library feature --unitTestRunner=jest --directory=api/auth --no-interactive
yarn nx generate @nrwl/js:library data-access --unitTestRunner=jest --directory=api/auth --no-interactive
yarn nx generate @nrwl/js:library util --unitTestRunner=jest --directory=api/auth --no-interactive

# USERS
yarn nx generate @nrwl/js:library feature --unitTestRunner=jest --directory=api/users --no-interactive
yarn nx generate @nrwl/js:library data-access --unitTestRunner=jest --directory=api/users --no-interactive
yarn nx generate @nrwl/js:library util --unitTestRunner=jest --directory=api/users --no-interactive

# PROFILES
yarn nx generate @nrwl/js:library feature --unitTestRunner=jest --directory=api/profiles --no-interactive
yarn nx generate @nrwl/js:library data-access --unitTestRunner=jest --directory=api/profiles --no-interactive
yarn nx generate @nrwl/js:library util --unitTestRunner=jest --directory=api/profiles --no-interactive

# COMMENTS
yarn nx generate @nrwl/js:library feature --unitTestRunner=jest --directory=api/comments --no-interactive
yarn nx generate @nrwl/js:library data-access --unitTestRunner=jest --directory=api/comments --no-interactive
yarn nx generate @nrwl/js:library util --unitTestRunner=jest --directory=api/comments --no-interactive

# MEMORIES
yarn nx generate @nrwl/js:library feature --unitTestRunner=jest --directory=api/memories --no-interactive
yarn nx generate @nrwl/js:library data-access --unitTestRunner=jest --directory=api/memories --no-interactive
yarn nx generate @nrwl/js:library util --unitTestRunner=jest --directory=api/memories --no-interactive

# HISTORY
yarn nx generate @nrwl/js:library feature --unitTestRunner=jest --directory=api/history --no-interactive
yarn nx generate @nrwl/js:library data-access --unitTestRunner=jest --directory=api/history --no-interactive
yarn nx generate @nrwl/js:library util --unitTestRunner=jest --directory=api/history --no-interactive

# EVENTSTORE
yarn nx generate @nrwl/js:library feature --unitTestRunner=jest --directory=api/eventstore --no-interactive
yarn nx generate @nrwl/js:library data-access --unitTestRunner=jest --directory=api/eventstore --no-interactive
yarn nx generate @nrwl/js:library util --unitTestRunner=jest --directory=api/eventstore --no-interactive
