const Arweave = require('arweave');
const { SmartWeaveNodeFactory, LoggerFactory } = require("redstone-smartweave");

(async () => {
  // Set up Arweave client
  const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
  });
  const wallet = require("../../.secrets/jwk.json");

  // Set up SmartWeave client
  LoggerFactory.INST.logLevel('error');
  const smartweave = SmartWeaveNodeFactory.memCached(arweave);

  // Interacting with the contract
  const contract = smartweave
    .contract("GAiZjVrjVcYcVHDrw1hqKsdk3_4IXoF0V-cSLJFiXXU")
    .connect(wallet)
    .setEvaluationOptions({
      waitForConfirmation: true,
    });

  // Read state
  const state = await contract.readState();
  console.log("State before any interactions");
  console.log(JSON.stringify(state, null, 2));

  // Write interaction
  console.log("Sending 'generate' interaction...");
  await contract.writeInteraction({ function: "generate" });
  console.log("Interaction has been sent");

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

  // Transferring the asset to another address
  console.log("Sending 'transfer' interaction...");
  await contract.writeInteraction({
    function: "transfer",
    data: {
      to: "another-address",
      asset: generatedAsset,
    },
  });
  console.log("Interaction has been sent");

  // Getting the new owner of the asset
  const { result: newOwner } = await contract.viewState({
    function: "getOwner",
    data: { asset: generatedAsset }
  });
  console.log(`New owner of the asset ${generatedAsset}: ${newOwner}`);

  // Generating the new asset
  console.log("Sending 'generate' interaction...");
  await contract.writeInteraction({ function: "generate" });
  console.log("Interaction has been sent");

  // Getting the final state
  console.log(`Getting final state`);
  const finalState = await contract.readState();
  console.log(JSON.stringify(finalState, null, 2));
})();
