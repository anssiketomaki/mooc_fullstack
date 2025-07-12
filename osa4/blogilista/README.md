### run backend in cmd in development mode (normal)
-> npm run dev

### run ALL node:test -tests from cmd (test mode)
runs the tests in "concurrency=1" -mode
-> npm test

#### run tests in just single file crom cmd
just add filename, like this:
-> npm test -- tests/users_api.test.js

### To use the backend, fill the .env secrets!
1) add MONGODB_URI for mongogb
2) Add PORT , although there SHOULD be a default hardcoded
3) add TEST_MONGODB_URI if you run tests!
4) Add a SECRET for token creation

- run next command on cmd to create a sufficient SECRET:
-> openssl rand -hex 32
OR in node environment:
-> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
