# the-moon-monorepo
Mono Repo for The Moon Platform (getmoons.io)

There are two Next.js projects in this repo. The main project that is going to be hosted on [getmoons.io](https://getmoons.io) is `the-moon-dapp/` project. Both projects will need their own seperate .env files.

## Setup - the-moon-dapp
1. Install postgres `brew install postgres`. Make sure you install version 13.2 or later.
2. Install the flow cli `brew install flow-cli`. Clone this repo [here](https://github.com/aobeta/flow-lib) and follow the instructions for setting up your smart contracts to work with your local blockchain.
3. Setup your database. You will need to clone [this](https://github.com/aobeta/db-model) repo and follow the [instructions](https://github.com/aobeta/db-model/blob/main/README.md) for setting up your database. Make sure you use the same connection string here that you used in the other repo.
4. set up an environment variable on your machine called `GITHUB_ACCESS_TOKEN`. You should have received this token. If not contact me.
5. In order to setup this project you will need a .env file. Create a .env file in the project and add these settings:

```

# Database Connection String
DATABASE_CONNECTION_STRING="postgresql://postgres@localhost:5432/MainDb?schema=public"


# Server Side Variables
MOON_NFT_CONTRACT_ADDRESS=0xf8d6e0586b0a20c7
FLOW_ACCESS_NODE=http://localhost:8080
MOON_PLATFORM_ACCOUNT_ADDRESS=0xf8d6e0586b0a20c7

NEXTAUTH_URL=http://localhost:3000

AUTH0_CLIENT_ID=X7FX9FBPCb6pPfnafGTx5fB4gFPKGlIL
AUTH0_CLIENT_SECRET=<Auth0-Client-secret>
AUTH0_DOMAIN=getmoons.us.auth0.com

```

You should have received secrets that you need to fill in the .env file. If not contact me.

6. In this project simply run `npm install`

