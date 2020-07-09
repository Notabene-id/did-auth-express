# did-auth-express

DID-Auth middelware for Express like servers

[![Build Status](https://github.com/notabene-id/did-auth-express/workflows/build/badge.svg)](https://github.com/notabene-id/did-auth-express/actions)
[![License](https://img.shields.io/github/license/notabene-id/did-auth-express.svg?color=blue)](./LICENSE.md)
![npm](https://img.shields.io/npm/v/did-auth-express)
![GitHub last commit](https://img.shields.io/github/last-commit/notabene-id/did-auth-express)
[![codecov](https://codecov.io/gh/Notabene-id/did-auth-express/branch/master/graph/badge.svg)](https://codecov.io/gh/Notabene-id/did-auth-express)

Documentation: https://notabene-id.github.io/did-auth-express/

## Description

This package provides [Express](https://expressjs.com/) middleware for DID-AUTH authentication.

## Installation

**yarn**

`yarn add did-auth-express`

**npm**

`npm install did-auth-express`

## Usage

#### Basic middleware registration

```javascript
const didauth = require("did-auth-express");

app.use("/api", didauth());
```

## Development

Instal dependencies

```
$ npm install
```

Build

```
$ npm run build
```

Test

```
$ npm test
```

To publish to NPM:

```
$ pika-pack publish
```

To publish dosc:

```
$ npm run docs
```

## Contributing

Contributions are welcome!

Want to file a bug, request a feature or contribute some code?

- Check out the [Code of Conduct](./CODE_OF_CONDUCT.md)
- Check that there is no existing [issue](https://github.com/Notabene-id/did-auth-express/issues) corresponding to your bug or feature
- Before implementing a new feature, discuss your changes in an issue first!

## License

[MIT](./LICENSE.md) © Notabene
