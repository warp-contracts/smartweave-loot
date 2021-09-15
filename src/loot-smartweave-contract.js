import Arweave from 'arweave'
import {
  LoggerFactory,
  ContractDefinitionLoader,
  ContractInteractionsLoader,
  CacheableContractInteractionsLoader,
  SmartWeaveWebFactory,
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
const contractInteractionsLoader = new CacheableContractInteractionsLoader(
  new ContractInteractionsLoader(arweave),
  new LocalStorageBlockHeightCache("_REDSTONE_LOOT_APP_INTERACTIONS_")
)
const smartweave = SmartWeaveWebFactory.memCachedBased(arweave)
  .setDefinitionLoader(contractDefinitionLoader)
  .setInteractionsLoader(contractInteractionsLoader)
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
