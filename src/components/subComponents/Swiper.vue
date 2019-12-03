<template>
  <div id="banner">
    <mt-swipe :auto="auto">
      <mt-swipe-item v-for="item in data" :key="item.id">
        <div class="imgBox">
          <img v-lazy="item.src" alt=""  data-preview-src="" data-preview-group="1">
        </div>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
import mui from '../../assets/common/js/mui.js'
import mui2 from '../../assets/common/js/mui.previewimage.js'
import mui3 from '../../assets/common/js/mui.zoom.js'

export default {
  props: ['data', 'auto'],
  mounted() {
    mui.previewImage();
    mui.plusReady(function() {})
  }
}
</script>

<style lang="less">
  #banner {
    height: 200px;
    margin: 10px;
    border-radius: 10px;
    overflow: hidden;
    .imgBox {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      background: url("../../assets/img/loading2.gif") no-repeat center center;
      img {
        width: 100%;
      }
    }
    
  }
</style>
