<template>
    <div class="imgInfo">
        <div class="imgGroup" v-for="item in previewList" :key="item.id">
            <img class="leftImage page-lazyload-image" v-lazy="item.src" data-preview-src="" data-preview-group="1" />
        </div>
    </div>
</template>

<script>
import mui from '../../assets/common/js/mui.js'
import mui2 from '../../assets/common/js/mui.previewimage.js'
import mui3 from '../../assets/common/js/mui.zoom.js'


export default {
    props:["previewList"],
    mounted() {
      mui.previewImage();
      mui.plusReady(function() {})
    }
}


</script>

<style lang="less" scoped>
  .imgInfo{
    width: 100%;
    overflow: hidden;
    .leftImage{
      width: 100%;
      margin-bottom: 10px;
    }
    .page-lazyload-image {
      width: 100%;
      display: block;
      opacity: 1;
    }
  }
  
</style>