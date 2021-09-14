import Arweave from 'arweave'
import { SmartWeaveWebFactory, LoggerFactory } from 'redstone-smartweave'
import deployedContracts from './deployed-contracts.json'

// Set up Arweave client
export const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
})

// Set up SmartWeave client
LoggerFactory.INST.logLevel('silly')
const smartweave = SmartWeaveWebFactory.memCached(arweave)

// Interacting with the contract
const contract = smartweave
  .contract(deployedContracts.loot)
  .connect('use_wallet')
  .setEvaluationOptions({
    waitForConfirmation: true,
  })

export default contract
