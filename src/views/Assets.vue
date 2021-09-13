<template>
  <div>

    <div class="generated-assets">
      <h2>Generated assets</h2>
      <div class="checkbox-container">
        <v-checkbox
          size="small"
          v-model="showNotGenerated"
          label="Show not generated assets"
        ></v-checkbox>
      </div>
      <Assets :showNotGeneratedAssets="false" :includeAssets="generatedAssets" :excludeAssets="[]" />
    </div>

    <div v-if="showNotGenerated" class="line-container">
      <hr />
    </div>
    

    <div v-if="showNotGenerated" class="not-generated-assets">
      <h2>Available assets</h2>
      <Assets :showNotGeneratedAssets="true"  :excludeAssets="generatedAssets" />
    </div>
  </div>
</template>

<script>
import Assets from '@/components/Assets.vue'
import { mapState } from 'vuex'

export default {
  name: "AssetsPage",

  data() {
    return {
      loadedAssets: {},
      showNotGenerated: false,
    }
  },

  computed: {
    ...mapState(['state', 'validity']),
    generatedAssets() {
      if (this.state.assets) {
        return Object.entries(this.state.assets).map(([name, owner]) => ({
          name,
          owner,
        }))
      }
      return []
    }
  },

  components: {
    Assets,
  },
}
</script>

<style lang="scss" scoped>

.checkbox-container {
  margin: auto;
  margin-top: 10px;
  border: 1px solid #ddd;
  width: 280px;
  padding-left: 20px;
  padding-right: 20px;
  transform: scale(0.8);
  border-radius: 3px;
}

.line-container {
  hr {
    max-width: 80vw;
    margin: auto;
    margin-top: 40px;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #ddd;
  }
}

</style>