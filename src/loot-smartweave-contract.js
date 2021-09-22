import Arweave from 'arweave'
import {
  LoggerFactory,
  // ContractDefinitionLoader,
  RemoteBlockHeightCache,
  CacheableStateEvaluator,
  ContractInteractionsLoader,
  CacheableContractInteractionsLoader,
  SmartWeaveWebFactory,
  // LocalStorageBlockHeightCache,
  // LocalStorageCache,
} from 'redstone-smartweave'
// import LocalStorageCache from "@/cache/cache"
import LocalStorageBlockHeightCache from '@/cache/block-height-cache'
import deployedContracts from './deployed-contracts.json'


// const CACHE_API_URL = 'https://dnmt9ldcqj0gz.cloudfront.net/cache'
// const CACHE_API_URL = 'http://localhost:3000/cache'
// const CACHE_API_URL = 'https://duei9u4otl5h4.cloudfront.net/cache'
// const CACHE_API_URL = 'http://smartweave-cache-express-dev.eu-north-1.elasticbeanstalk.com/cache'
const CACHE_API_URL = 'https://smart-cache.herokuapp.com/cache'

// Set up Arweave client
export const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
})

// Set up SmartWeave client
LoggerFactory.INST.logLevel('silly')

// const contractDefinitionLoader = new ContractDefinitionLoader(
//   arweave,
//   new LocalStorageCache("_REDSTONE_LOOT_APP_")
// )
const contractInteractionsLoader = new CacheableContractInteractionsLoader(
  new ContractInteractionsLoader(arweave),
  new RemoteBlockHeightCache('INTERACTIONS', CACHE_API_URL)
)
const cacheableStateEvaluator = new CacheableStateEvaluator(
  arweave,
  new RemoteBlockHeightCache('STATE', CACHE_API_URL)
  // new LocalStorageBlockHeightCache('_REDSTONE_APP_STATE_', 2, false, 100)
)

const smartweave = SmartWeaveWebFactory
  .memCachedBased(arweave)
  // .setDefinitionLoader(contractDefinitionLoader)
  .setInteractionsLoader(contractInteractionsLoader)
  // .setStateEvaluator(cacheableStateEvaluator)
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
