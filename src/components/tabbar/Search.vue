<template>
  <div id="search">
    <mt-search
      v-model="value"
      cancel-text="取消"
      placeholder="搜索">
    </mt-search>
  </div>
</template>

<script>
  export default {
    created() {
      this.$store.commit('setPageTitle', {
        title: '搜索'
      });
    },
    data () {
      return {
        value: ""
      }
    }
  }
</script>

<style lang="less">
  #search {
    input[type='search'] {
      margin: 0 !important;
      padding: 0 !important;
      background: transparent !important;
    }
  }
  
  
</style>
