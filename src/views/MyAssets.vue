<template>
  <div>

    <div v-if="address" class="address-container notification">
      Your address:
      <a :href="'https://viewblock.io/arweave/address/' + address" target="_blank">
        {{ address }}
      </a>
    </div>

    <div v-if="notificationText" class="notification">
      {{ notificationText }}

      <a v-if="notificationLink == 'download-arconnect'" target="_blank" href="https://chrome.google.com/webstore/detail/arconnect/einnioafmpimabjcddiinlhmijaionap">
        Download ArConnect for Chrome
      </a>

      <a v-if="notificationLink == 'connect-wallet'" href="javascript:void(0)" @click="connectToArconnect()">
        Connect to wallet
      </a>

    </div>

    <div v-if="sendingTx" class="tx-sending notification">
      Your transaction is being sending. Please wait for about 20 minutes for it to be confirmed.
      You can close this page and come back any time. It also shoud appear on
      <a :href="'https://viewblock.io/arweave/address/' + address" target="_blank">
        Viewblock
      </a>
      in 20 minutes
    </div>

    <div v-if="walletLoaded" class="generate-button-container">
      <v-btn
        outlined
        width="450"
        @click="generateLoot()"
      >
        Generate your loot
      </v-btn>
    </div>

    <div v-if="walletLoaded" class="my-assets">
      <h2>My assets</h2>
      <div v-if="!loadingAssets && myAssets && myAssets.length == 0" class="notification">
        You don't own any assets yet. Click the "generate" button above to generate a new one.
      </div>
      <div v-if="walletLoaded && loadingAssets">
        <vue-loaders-ball-beat color="gray" scale="1"></vue-loaders-ball-beat>
      </div>
      <Assets v-if="walletLoaded && !loadingAssets" :includeAssets="myAssets" />
    </div>
    
  </div>
</template>

<script>
import Assets from '@/components/Assets.vue'
import { mapState, mapActions } from 'vuex'
import item from '@/components/Asset.vue'

export default {
  name: 'AssetsPage',

  data() {
    return {
      walletLoaded: false,
      arConnectInstalled: !!window.arweaveWallet,
      address: '',
      item,
      items: Array.from(Array(1000).keys()).map(i => ({
        id: i,
        color: i,
      })),
      sendingTx: false,
    }
  },

  timers: {
    checkArConnect: { time: 100, autostart: true, immediate: true, repeat: true },
  },

  methods: {
    ...mapActions(['loadState']),

    checkArConnect() {
      this.arConnectInstalled = !!window.arweaveWallet
      if (this.arConnectInstalled) {
        this.connectToArconnect()
        this.$timer.stop('checkArConnect')
      }
    },
    
    async generateLoot() {
      try {
        console.log('Sending transaction')
        this.sendingTx = true
        await this.contract.writeInteraction({
          function: 'generate'
        })
        console.log('Tx sent')
        await this.loadState()
      } finally {
        this.sendingTx = false
      }
    },

    async connectToArconnect() {
      console.log('Connecting to ArConnect')
      if (window.arweaveWallet) {
        window.addEventListener("walletSwitch", async (e) => {
          console.log('walletSwitch', e);
          this.walletLoaded = true
          this.loadArweaveAddress()
        });
        window.addEventListener("arweaveWalletLoaded", async (e) => {
          console.log('arweaveWalletLoaded', e);
          this.walletLoaded = true
          this.loadArweaveAddress()
        });

        try {
          await this.loadArweaveAddress()
        } catch (e) {
          console.error(e)
          if (!this.address) {
            console.warn("Failed to get address. Connecting to ArConnect")
            await window.arweaveWallet.connect(['ACCESS_ADDRESS', 'ACCESS_ALL_ADDRESSES', 'SIGN_TRANSACTION']);
            await this.loadArweaveAddress()
          }
        }
      }
    },

    async loadArweaveAddress() {
      if (!window.arweaveWallet) {
        throw new Error('Can not get address without arweaveWallet')
      } else {
        this.address = await window.arweaveWallet.getActiveAddress()
        this.walletLoaded = true
      }
    },
  },

  computed: {
    ...mapState(['state', 'contract', 'loadingAssets']),

    myAssets() {
      if (!this.state.assets) {
        return []
      }
      const result = []
      for (const [name, owner] of Object.entries(this.state.assets)) {
        if (owner && owner === this.address) {
          result.push({
            name,
            owner
          })
        }
      }
      return result
    },

    notificationText() {
      if (!this.walletLoaded) {
        return 'Please connect your ArConnect wallet to this app for being able to see your loots and generate new loots.'
      } else {
        return ''
      }
    },

    notificationLink() {
      if (this.arConnectInstalled) {
        return 'connect-wallet'
      } else {
        return 'download-arconnect'
      }
    },
  },

  components: {
    Assets,
  },
}
</script>

<style lang="scss">
a {
  color: black;

  &:hover {
    color: #0F9D58;
  }
}
</style>

<style scoped lang="scss">

.my-assets {
  margin-top: 30px;
  h2 {
    margin-bottom: 10px;
  }
}

.notification {
  width: 450px;
  border-radius: 3px;
  border: 1px solid #ddd;
  text-align: left;
  margin: 10px auto;
  padding: 16px;
  font-size: 14px;
  font-weight: 400;
}

.address-container {
  text-align: center;
  font-size: 12px;
}


</style>