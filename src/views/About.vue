<template>
  <div class="about">
    <h1>About smartweave-loot</h1>
    <p>
      A simple <a href="https://www.lootproject.com/" target="_blank">LOOT</a>-like contract, which allows to generate and transfer different magical assets, like a "black silver sword" or a "blue gold crown".
      Each asset will be unique and can belong to only one wallet at a time.
      Initially there are no generated assets, but users will be able to generate and claim them. Users also will be able to transfer their assets to others.
    </p>
    <div class="links">
      <div class="link-container" v-for="link in links" :key="link.href">
        <a target="_blank" class="link" :href="link.href">
          {{ link.title }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          title: 'Source code on GitHub',
          href: 'https://github.com/redstone-finance/smartweave-loot'
        },
        {
          title: 'How to implement this',
          href: 'https://github.com/redstone-finance/smartweave-loot/blob/main/docs/LOOT_CONTRACT_TUTORIAL.md'
        },
        {
          title: 'Smart contract on Viewblock',
          href: 'https://viewblock.io/arweave/address/Daj-MNSnH55TDfxqC7v4eq0lKzVIwh98srUaWqyuZtY'
        },
        {
          title: 'Smart contract source code',
          href: 'https://ld27fm4mscl2niqzpfqtrxpin5ltmkh37t7l2nmrbmoq2embqefa.arweave.net/WPXys4yQl6aiGXlhON3ob1c2KPv8_r01kQsdDRGBgQo'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
p {
  width: 500px;
  margin: auto;
  margin-top: 30px;
  text-align: left;
}


.links {
  margin-top: 30px;
}

a.link {
  display: block;
  border-radius: 5px;
  border: 1px solid black;
  padding: 10px;
  text-align: left;
  max-width: 500px;
  margin: auto;
  margin-top: 10px;

  color: black;
  text-decoration: none;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
    border-color: #0F9D58;
  }
}

a {
  color: black;
  &:hover {
    color: #0F9D58;
  }
}

</style>