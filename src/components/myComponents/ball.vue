<template>
  <transition 
    name="ball-move"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
  >
    <div id="ball" ref="ball" v-if="s"></div>
  </transition>
</template>

<script>
  export default {
    props: ['s'],
    methods: {
      beforeEnter (el) {
        let start = document.getElementById('toShopcart').getBoundingClientRect();
        this.start = start;
      },
      enter (el, done) {
        el.offsetTop;
        document.getElementById('ball').style.background = `url(${this.$store.state.ballBg}) 0 0 / 100% 100% no-repeat`
        document.getElementById('ball').style.transform = `translate(${this.start.left + 80}px, ${this.start.top }px)`
        let ballPath = this.$refs.ball.getBoundingClientRect();
        let end = document.getElementById('sh').getBoundingClientRect();
        let x = end.left - ballPath.left;
        let y = end.top - ballPath.top;
        el.style.transform = `translate(${this.start.left+ 80 + x}px, ${this.start.top + y}px)`;
        el.style.transition = "all 1s cubic-bezier(.51,-1.11,.63,.92)"
        done()
      },
      afterEnter (el) {
        this.$store.commit("setBall", {value: false});
      }
    },
  }
</script>

<style scoped>
  #ball {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10000000;
  }
</style>
