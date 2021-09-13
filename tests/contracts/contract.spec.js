// function toHexString(byteArray) {
//   return Array.from(byteArray, function(byte) {
//     return ('0' + (byte & 0xFF).toString(16)).slice(-2);
//   }).join('')
// }

// const originalToString = Uint8Array.prototype.toString;
// Uint8Array.prototype.toString = function(...params) {
//   if (params[0] == "hex") {
//     return toHexString(this);
//   } else {
//     return originalToString(...params).bind(this);
//   }
// }


const fs = require('fs');
const path = require('path');
const { default: ArLocal } = require('arlocal');
const Arweave = require('arweave');
const { LoggerFactory, SmartWeaveNodeFactory } = require("redstone-smartweave");

let arweave, arlocal, smartweave, contract, wallet, walletAddress;

describe('Testing the Loot contract', () => {
  let asset = '';
  const MOCK_ADDRESS = "0x1234", MOCK_ADDRESS_2 = "0x5678";

  beforeAll(async () => {
    arlocal = new ArLocal(1985, false);
    await arlocal.start();

    arweave = Arweave.init({
      host: 'localhost',
      port: 1985,
      protocol: 'http'
    });

    LoggerFactory.INST.logLevel('error');

    smartweave = SmartWeaveNodeFactory.memCached(arweave);

    wallet = await arweave.wallets.generate();
    walletAddress = await arweave.wallets.jwkToAddress(wallet);

    const contractSrc = fs.readFileSync(path.join(__dirname, '../../src/contracts/loot/contract.js'), 'utf8');
    const initialState = fs.readFileSync(path.join(__dirname, '../../src/contracts/loot/initial-state.json'), 'utf8');

    // Deploying contract using the RedStone SmartWeave SDK
    const contractTxId = await smartweave.createContract.deploy({
      wallet,
      initState: initialState,
      src: contractSrc
    });

    contract = smartweave.contract(contractTxId);
    contract.connect(wallet);

    await mine();
  });

  afterAll(async () => {
    await arlocal.stop();
  });

  it('Should have no assets right after deployment', async () => {
    const { state } = await contract.readState();
    expect(state.assets).toEqual({});
  });

  it('Should generate an asset', async () => {
    await contract.writeInteraction({
      function: 'generate',
    });
    await mine();
  });

  it('User should have a new asset', async () => {
    const { result: assets } = await contract.viewState({
      function: "generatedAssets"
    });
    expect(assets).toBeInstanceOf(Array);
    expect(assets.length).toBe(1);
    asset = assets[0];

    const { result: owner } = await contract.viewState({
      function: "getOwner",
      data: { asset },
    });
    expect(owner).toBe(walletAddress);
  });

  it('Should transfer asset to the new address', async () => {
    await contract.writeInteraction({
      function: 'transfer',
      data: {
        to: MOCK_ADDRESS,
        asset,
      },
    });
    await mine();
    const { result: owner } = await contract.viewState({
      function: "getOwner",
      data: { asset },
    });
    expect(owner).toBe(MOCK_ADDRESS);
  });

  it('Should not transfer asset that does not belong to sender', async () => {
    await contract.writeInteraction({
      function: 'transfer',
      data: {
        to: MOCK_ADDRESS_2,
        asset,
      },
    });
    await mine();

    const { result: owner } = await contract.viewState({
      function: "getOwner",
      data: { asset },
    });
    expect(owner).toBe(MOCK_ADDRESS);
  });

});

async function mine() {
  await arweave.api.get('mine');
}
