<template>
  <div id="userComment" class="userComment">
    <Comment :id="id" :btnText="'提交留言'" :hint="'留言内容'" />
  </div>
</template>

<script>
import Comment from '../subComponents/Comment.vue';
export default {
  data () {
    return {
      id: this.getId()
    }
  },
  methods: {
    getId(){
      var d = new Date()
      return `${d.getFullYear()}${d.getMonth() + 1 <= 9 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1}${d.getDate() <= 9 ? '0' + d.getDate() : d.getDate()}${d.getHours() <= 9 ? '0' + d.getHours() : d.getHours()}${d.getMinutes() <= 9 ? '0' + d.getMinutes() : d.getMinutes()}${d.getSeconds() <= 9 ? '0' + d.getSeconds() : d.getSeconds()}${Math.floor((Math.random() + 1) * 10000)}`
    }
  },
  components: {
    Comment
  },
  created() {
    this.$store.commit('setPageTitle', {
      title: '留言反馈'
    });
  }
}
</script>


<style lang="less" scoped>
  #userComment {
    padding: 10px;
  }
</style>

<style lang="less">
  .userComment {
    #comment {
      h4, .commentList {
        display: none;
      }
      .comment-props {
        display: none !important;
      }
    }
  }
</style>
