import Arweave from 'arweave'
import {
  LoggerFactory,
  CacheableExecutorFactory,
  CacheableStateEvaluator,
  ContractDefinitionLoader,
  ContractInteractionsLoader,
  HandlerExecutorFactory,
  LexicographicalInteractionsSorter,
  MemCache,
  SmartWeave,
  // SmartWeaveWebFactory,
} from 'redstone-smartweave'
import LocalStorageCache from "@/cache/cache"
import LocalStorageBlockHeightCache from "@/cache/block-height-cache"
import deployedContracts from './deployed-contracts.json'

// Set up Arweave client
export const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
})

// Set up SmartWeave client
LoggerFactory.INST.logLevel('silly')

const contractDefinitionLoader = new ContractDefinitionLoader(arweave, new LocalStorageCache("_REDSTONE_LOOT_APP_"))
const contractInteractionsLoader = new ContractInteractionsLoader(arweave)
const cacheableExecutorFactory = new CacheableExecutorFactory(arweave, new HandlerExecutorFactory(arweave), new MemCache())
const cacheableStateEvaluator = new CacheableStateEvaluator(arweave, new LocalStorageBlockHeightCache("_REDSTONE_LOOT_APP_STATE_"))
const lexicographicalInteractionsSorter = new LexicographicalInteractionsSorter(arweave)

const smartweave = SmartWeave.builder(arweave)
  .setInteractionsLoader(contractInteractionsLoader)
  .setInteractionsSorter(lexicographicalInteractionsSorter)
  .setDefinitionLoader(contractDefinitionLoader)
  .setExecutorFactory(cacheableExecutorFactory)
  .setStateEvaluator(cacheableStateEvaluator)
  .build();

// const smartweave = SmartWeaveWebFactory.memCached(arweave)

// Interacting with the contract
const contract = smartweave
  .contract(deployedContracts.loot)
  .connect('use_wallet')
  .setEvaluationOptions({
    waitForConfirmation: true,
  })

export default contract
