# telegram-bot-duty-check

## Required

Nodejs >= 14

## Global Package

* pm2

### command

```bash
# copy to config.js
cp src/config.js.example src/config.js

# eslint
npm run lint

# Sync Table Schema
npm run sync-db

# test
npm run test

# development
npm run dev

# build for production
npm run build

# run as production (pm2)
npm start
```