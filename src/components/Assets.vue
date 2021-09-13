<template>
  <div>
      <div class="assets-container">
        <div class="asset-wrapper" v-for="(asset, index) in assets" :key="index">
          <Asset :owner="asset.owner" :item="asset.item" :color="asset.color" :material="asset.material" />
        </div>
      </div>
  </div>
</template>

<script>
import Asset from "./Asset.vue"

const COLORS = ['green', 'red', 'yellow', 'blue', 'black', 'brown', 'pink', 'orange', 'purple', 'gray'];
const MATERIALS = ['gold', 'wood', 'silver', 'fire', 'diamond', 'platinum', 'palladium', 'bronze', 'lithium', 'titanium'];
const ITEMS = ['sword', 'shield', 'robe', 'stone', 'crown', 'katana', 'dragon', 'ring', 'axe', 'hammer'];

function assetNameToObj(name) {
  const [color, material, item] = name.split(' ')
  return {
    color,
    material,
    item,
  }
}

function assetToStr(color, material, item) {
  return `${color} ${material} ${item}`
}

export default {
  name: "Assets",

  props: {
    includeAssets: Array,
    showNotGeneratedAssets: Boolean,
    excludeAssets: Array,
  },

  data() {
    return {}
  },

  computed: {
    assets() {
      const result = []
      if (this.showNotGeneratedAssets) {
        for (const color of COLORS) {
          for (const material of MATERIALS) {
            for (const item of ITEMS) {
              const asset = assetToStr(color, material, item)
              if (!this.excludeAssets.includes(asset)) {
                result.push({
                  color,
                  material,
                  item,
                })
              }
            }
          }
        }
      } else {
        for (const asset of this.includeAssets) {
          result.push({
            owner: asset.owner,
            ...assetNameToObj(asset.name)
          })
        }
      }
      
      return result
    }
  },

  components: {
    Asset,
  },
}
</script>

<style scoped lang="scss">

.assets-container {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  column-gap: 30px;
  row-gap: 30px;
  flex-wrap: wrap;
  justify-content: center;
}

</style>