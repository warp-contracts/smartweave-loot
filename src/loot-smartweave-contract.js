import Arweave from 'arweave'
import { SmartWeaveWebFactory, LoggerFactory } from 'redstone-smartweave'

const PROD_LOOT_CONTRACT_ADDRESS = 'GAiZjVrjVcYcVHDrw1hqKsdk3_4IXoF0V-cSLJFiXXU'

// Set up Arweave client
const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
})

// Set up SmartWeave client
LoggerFactory.INST.logLevel('silly')
const smartweave = SmartWeaveWebFactory.memCached(arweave)

// Interacting with the contract
const contract = smartweave
  .contract(PROD_LOOT_CONTRACT_ADDRESS)
  .connect('use_wallet')
  .setEvaluationOptions({
    waitForConfirmation: true,
  })

export default contract
