<template>
  <div id="GoodsComment">
    <mt-loadmore >
      <Comment :id="list.id" :btnText="'提交评论'" :hint="'评论内容'" />
    </mt-loadmore>
  </div>
</template>

<style lang="less">
  #GoodsComment {
    padding: 10px;
  }
</style>


<script>
  import Comment from '../subComponents/Comment.vue';
  export default {
    data() {
      return {
        list:[]
      }
    },
    components: {
      Comment
    },
    created() {
      this.$store.commit('setPageTitle', {
        title: '商品评论'
      });
      let data = JSON.parse(this.$route.query.data);
      // console.log(data)
      this.list = data;

    },
    methods:{
      
        
      
    }
  }
</script>