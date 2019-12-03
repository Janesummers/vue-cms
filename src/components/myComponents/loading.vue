<template>
  <div id="loadingBox" >
    <div class="circle" id="circle_one"></div>
    <div class="circle" id="circle_two"></div>
    <div class="circle" id="circle_three"></div>
  </div>
</template>



<style lang="less">
  #loadingBox {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    background: #fff;
    z-index: 1000;
    .circle{
      width: 20px;
      height: 20px;
      background-color: #000;
      float: left;
      margin-right: 20px;
      -moz-border-radius: 50% 50% 50% 50%;
      -webkit-border-radius: 50% 50% 50% 50%;
      border-radius: 50% 50% 50% 50%;
    }
    #circle_one {	
      -webkit-animation: circle_one 1.5s infinite;
      animation: circle_one 1.5s infinite;
    }
    #circle_two {
      -webkit-animation: circle_two 1.5s infinite;
      animation: circle_two 1.5s infinite;
      -webkit-animation-delay: 0.25s; 
      animation-delay: 0.25s;
    }
    #circle_three {
      -webkit-animation: circle_three 1.5s infinite;
      animation: circle_three 1.5s infinite;
      -webkit-animation-delay: 0.5s;
      animation-delay: 0.5s;
    }
  }
  @-webkit-keyframes circle_one {
    75% { 
      -webkit-transform: scale(0); 
    }
  }

  @keyframes circle_one {
    75% { 
      transform: scale(0);
      -webkit-transform: scale(0);
    }
  }

  @-webkit-keyframes circle_two {
    75% { 
      -webkit-transform: scale(0); 
    }
  }

  @keyframes circle_two {
    75% { 
      transform: scale(0);
      -webkit-transform: scale(0);
    }
  }

  @-webkit-keyframes circle_three {
    75% { 
      -webkit-transform: scale(0); 
    }
  }

  @keyframes circle_three {
    75% { 
      transform: scale(0);
      -webkit-transform: scale(0);
    }
  }
</style>
