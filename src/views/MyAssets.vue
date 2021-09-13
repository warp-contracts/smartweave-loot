<template>
  <div>
    <div class="generate-button-container">
      
      <v-btn
        @click="generateLoot()"
      >
        Generate your loot
      </v-btn>
    </div>
    <Assets :includeAssets="myAssets" />
  </div>
</template>

<script>
import Assets from '@/components/Assets.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AssetsPage',

  data() {
    return {
      walletLoaded: false,
      address: '',
    }
  },

  mounted() {
    window.addEventListener("arweaveWalletLoaded", (...args) => {
      console.log(...args);
      this.walletLoaded = true
    })

    window.addEventListener("walletSwitch", (e) => {
      this.address = e.detail.address;
    })
  },

  methods: {
    ...mapActions(['loadState']),
    async generateLoot() {
      await this.contract.writeInteraction({
        function: 'generate'
      })

      await this.loadState()
    },
  },

  computed: {
    ...mapState(['state', 'contract']),

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
    }
  },

  components: {
    Assets,
  },
}
</script>

<style scoped>

.generate-button-container {
  /* border: 1px solid black; */
}

</style>