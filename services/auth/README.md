
## Description

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Migration
```bash
# generate migration
$ yarn migration:create ./src/database/migrations/${migration_name}

# run migration
$ yarn migration:up

# revert migration
$ yarn migration:down
```
