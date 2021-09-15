<template>
  <div>
    <pre v-if="!loadingAssets">
      {{ JSON.stringify(state, null, 2) }}
    </pre>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'CorrectState',
  computed: mapState(['state', 'loadingAssets']),
}
</script>

<style scoped>

pre {
  text-align: left;
  margin: auto;
}

</style>