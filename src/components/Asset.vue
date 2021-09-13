<template>
  <div class="asset-container">
    <div class="asset-image-container" :style="borderColorStyle">
      <!-- <img class="asset" :src="imageBase64" /> -->
      <img class="asset" :style="imageCss" :src="`items/${item}.png`" />
    </div>
    <div class="asset-title-container">
      <h3>{{ color }} {{ material }} {{ item }}</h3>
    </div>
    <div v-if="owner" class="owned-by-container">
      Owned by
      <a target="_blank" :href="getViewblockLink(owner)">{{ owner | short-address }}</a>
    </div>
  </div>
</template>

<script>
import { getCssForColor } from '@/helpers/color-solver'

const MATERIAL_COLORS = {
  'gold': '#FFD700',
  'wood': '#BA8C63',
  'silver': '#C0C0C0',
  'fire': '#ff7700',
  'diamond': '#b9f2ff',
  'platinum': '#e5e4e2',
  'palladium': '#BCC1A5',
  'bronze': '#CD7F32',
  'lithium': '#f4d71f',
  'titanium': '#878681'
}

const NICE_COLORS = {
  'green': '#0F9D58',
  'red': '#DB4437',
  'yellow': '#F4B400',
  'blue': '#4285F4',
  'black': '#000000',
  'brown': '#654321',
  'pink': '#ff91a4',
  'orange': '#ff8c00',
  'purple': '#4b0082',
  'gray': '#808080'
}

export default {
  name: "Asset",
  props: {
    item: String,
    color: String,
    material: String,
    owner: String,
  },
  data() {
    return {
      imageBase64: 'data:image/png;base64, '
    }
  },
  async mounted() {
    // const materialColor = MATERIAL_COLORS[this.material] || '#000'
    // console.log({ materialColor })
    // const resultImage = await replaceColor({
    //   image: `items/${this.item}.png`,
    //   colors: {
    //     type: 'hex',
    //     targetColor: '#ffffff',
    //     replaceColor: materialColor,
    //   }
    // })
    // // const resultImage = await replaceColor({
    // //   image: `items/${this.item}.png`,
    // //   colors: {
    // //     type: 'hex',
    // //     targetColor: '#000000',
    // //     replaceColor: materialColor,
    // //   }
    // // })
    // console.log(resultImage);
    // const base64 = await resultImage.getBase64Async(-1)
    // console.log({ base64 })
    // this.imageBase64 = base64
  },
  methods: {
    getViewblockLink(address) {
      return `https://viewblock.io/arweave/address/${address}`
    },
  },
  computed: {
    borderColorStyle() {
      return { 'box-shadow': `inset 0 0 15px ${NICE_COLORS[this.color]}` }
    },
    imageCss() {
      const materialColor = MATERIAL_COLORS[this.material] || '#000000'
      return getCssForColor(materialColor)
    },
  }
}
</script>

<style scoped lang="scss">

.asset-container {
  width: 200px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;

  h3 {
    font-size: 12px;
    // font-weight: 400;
    padding-top: 12px;
    margin: auto;
    text-align: center;
  }

  .owned-by-container {
    font-size: 10px;
    a {
      color: #0F9D58;
    }
  }


  .asset-image-container {
    margin: auto;
    border-radius: 50%;
    // border: 3px solid;
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;

    img.asset {
      width: 50%;
      height: 50%;
    }
  }
}

</style>