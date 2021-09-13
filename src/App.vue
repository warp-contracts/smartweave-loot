<template>
  <div id="app">
    <main>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/assets">All assets</router-link> |
        <router-link to="/my-assets">My assets</router-link>
      </div>
      <v-app>
        <router-view/>
      </v-app>
    </main>
    
    <footer>
      <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </footer>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',
  beforeMount() {
    this.loadState()
  },
  methods: {
    ...mapActions(['loadState']),
  }
}
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

main {
  min-height: calc(100vh - 40px);
}

footer {
  min-height: 40px;
  background: #dedede;
  width: 100%;
  font-size: 12px;
  padding: 10px;
  color: black;
  a {
    color: black;
  }
}

</style>
