# Implementation tutorial for loot contract on SmartWeave

This tutorial shows how to implement a simple loot contract on SmartWeave protocol.

### What is SmartWeave
SmartWeave is a new generation of smart contracts built on Arweave.
It uses lazy-evaluation to move the burden of contract execution from network nodes to smart contract users.

### The smart contract idea
We will implement a simple [LOOT](https://www.lootproject.com/)-like contract, which allows to generate and transfer different magical assets, like for example `black silver sword` or `blue gold crown`. Each asset will be unique and can belong to only one wallet at a time.

Initially there are no generated assets, but users will be able to generate and claim them.
Users also will be able to transfer their assets to others.

### 🙋‍♂️ Need help?
Please feel free to contact us [on Discord](https://redstone.finance/discord) if you have any questions.

### Prerequisites
- Prepared Node.js environment
- `yarn` installed
- Basic coding skills in Javascript
- Basic understanding of [SmartWeave](https://www.npmjs.com/package/redstone-smartweave)

## 📦 Install dependencies
To 
`yarn add arweave redstone-smartweave`

## 🧑‍💻 Implement the smart contract
### Start with a state
TODO: create a state object in JSON file.

### Implement contract logic in Javascript

#### Implement the first method `name`
TODO
`name()`

#### Implement `getOwner` and `transfer` methods
TODO
TODO: describe difference between read interaction and writeInteration

#### Implement `generate` method
TODO

#### Add bonus methods `generatedAssets` and `assetsLeft`
TODO

## 🔥 Test your contract
I strongly recommend you to implement tests for all your smart contracts. It's generaly a good practice and it will help you to avoid silly bugs before deploying contracts to blockchain.

The best way to implement tests is to use a special test framework like [JEST](https://jestjs.io/). But to keep this tutorial shorter we will implement a simple Node.js testing script. Anyway, you can check the JEST tests implementation in [tests/contracts](../tests/contracts).

We will use arlocal to run a local Arweave instance. It is much faster than the real blockchain.
And it allows to test SmartWave contracts without spending AR tokens.

Let's create a new file `simple-test.js`.

💡 You can see the ready-made implementation in [src/tools/simple-test.js](../src/tools/simple-test.js)

#### 1.Load required modules
```javascript
// File: simple-test.js

const fs = require('fs');
const path = require('path');
const Arweave = require('arweave');
const { SmartWeaveNodeFactory } = require("redstone-smartweave-exp");
const { default: ArLocal } = require("arlocal");
```

#### 2. Configure `arlocal`, `arweave` and `smarteave`
```javascript
// File: simple-test.js

// Set up ArLocal
const arLocal = new ArLocal(1985, false);
await arLocal.start();

// Set up Arweave client
const arweave = Arweave.init({
  host: "localhost",
  port: 1985,
  protocol: "http"
});
const wallet = await arweave.wallets.generate();
const mine = () => arweave.api.get("mine");

// Set up SmartWeave client
LoggerFactory.INST.logLevel('error');
const smartweave = SmartWeaveNodeFactory.memCached(arweave);
```

#### 3. Load contract source code and initial state
```javascript
// File: simple-test.js

const contractSrc = fs.readFileSync("_REPLACE_WITH_PATH_TO_CONTRACT_CODE_", "utf8");
const initialState = fs.readFileSync("_REPLACE_WITH_PATH_TO_INITIAL_STATE_", "utf8");
```

#### 4. Deploy your contract to arlocal
```javascript
// File: simple-test.js

const contractTxId = await smartweave.createContract.deploy({
  wallet,
  initState: initialState,
  src: contractSrc
});
await mine(); // We run this function 
```

#### 5. Interact with your contract
You can read more about interacting with your contracts in our [dedicated repo with examples.](https://github.com/redstone-finance/redstone-smartweave-examples)

```javascript
// File: simple-test.js

// Interacting with the contract
const contract = smartweave
  .contract(contractTxId)
  .connect(wallet);

// Read state
const state = await contract.readState();
console.log("State before any interactions");
console.log(JSON.stringify(state, null, 2));

// Write intetraction
await contract.writeInteraction({ function: "generate" });
await mine();

// Read state after interaction
const stateAfterInteraction = await contract.readState();
console.log("State after 1 interaction");
console.log(JSON.stringify(stateAfterInteraction, null, 2));

// Using generatedAssets contract function
const { result: generatedAssets } = await contract.viewState({
  function: "generatedAssets"
});
const generatedAsset = generatedAssets[0];
console.log(`Generated asset: ${generatedAsset}`);

// Transfering the asset to another address
await contract.writeInteraction({
  function: "transfer",
  data: {
    to: "another-address",
    asset: generatedAsset,
  },
});
await mine();

// Getting the new owner of the asset
const { result: newOwner } = await contract.viewState({
  function: "getOwner",
  data: { asset: generatedAsset }
});
console.log(`New owner of the asset ${generatedAsset}: ${newOwner}`);

// Generating the new asset
await contract.writeInteraction({ function: "generate" });
await mine();

// Getting the final state
const finalState = await contract.readState();
console.log(JSON.stringify(finalState, null, 2));

```


#### 6. Shut down arlocal
```javascript
// File: simple-test.js

await arLocal.stop();
```



## 🔒 Deploy your contract
The code for deploying smart contract to the Arweave blockchain is very similar to the one that we've used in testing script. You can see an example of deployment script in [src/tools/deploy-contracts.js.](../src/tools/deploy-contracts.js).

After running the deployment script the contract transaction Id will be printed.
It should be mined on Arweave in about 20-30 minutes. You can check th transaction status in https://viewblock.io.

## 🔥 Interact with the deployed contract
To learn how to interact with your deployed contract, check out our [dedicated repo with examples.](https://github.com/redstone-finance/redstone-smartweave-examples)
