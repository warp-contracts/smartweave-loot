import Arweave from 'arweave';
import {
  CacheableContractInteractionsLoader,
  CacheableStateEvaluator,
  ContractDefinitionLoader, ContractInteractionsLoader, LocalStorageBlockHeightCache, LocalStorageCache, LoggerFactory,
  SmartWeaveWebFactory
} from 'redstone-smartweave';
import deployedContracts from './deployed-contracts.json';

// Set up Arweave client
export const arweave = Arweave.init({
  host: "dh48zl0solow5.cloudfront.net",
  port: 443,
  protocol: "https",
});

LoggerFactory.INST.logLevel("debug");

const contractDefinitionLoader = new ContractDefinitionLoader(
  arweave,
  new LocalStorageCache("_REDSTONE_APP_")
);
const cacheableStateEvaluator = new CacheableStateEvaluator(
  arweave,
  new LocalStorageBlockHeightCache("_REDSTONE_APP_STATE_", 2, false, 100)
);
const cacheableInteractionsLoader = new CacheableContractInteractionsLoader(
  new ContractInteractionsLoader(arweave),
  new LocalStorageBlockHeightCache("_REDSTONE_APP_INTERACTIONS_", 1, true)
);

const smartweave = SmartWeaveWebFactory
  .memCachedBased(arweave)
  .setDefinitionLoader(contractDefinitionLoader)
  .setStateEvaluator(cacheableStateEvaluator)
  .setInteractionsLoader(cacheableInteractionsLoader)
  .build();

// Interacting with the contract
const contract = smartweave
  .contract(deployedContracts.loot)
  .connect('use_wallet')

export default contract
