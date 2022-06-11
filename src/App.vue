<template>
  <div id="app">
    <meta name="viewport" id="viewportMeta" content="width=device-width, initial-scale=1.0,user-scalable=no">
    <div id="background0" :style="{backgroundImage:`url(${img})`}"></div>
    <router-view />
  </div>
</template>

<script>
import b from './assets/pictures/background.png'

export default {
  name: "App",
  components: {},
  data(){
    return{
      img: b
    }
  },
  mounted() {
    var initViewport = function (height) {
      var metaEl = document.querySelector("#viewportMeta");
      var content =
        "width=device-width,initial-scale=1.0,user-scalable=no,maximum-scale=1.0,height=" +
        height;
      metaEl.setAttribute("name", "viewport");
      metaEl.setAttribute("content", content);
    };
    initViewport(window.innerHeight);
    var addEvenListener = function (callback, eventName) {
      let addEvenListenerFn = window.addEventListener || window.attatchEvent;
      let messageEvent = window.addEventListener ? eventName : "on" + eventName;
      addEvenListenerFn(messageEvent, callback, false);
    };

    addEvenListener(function () {
      document.body.style.display = "none";
      setTimeout(function () {
        initViewport(window.innerHeight);
        if(window.innerWidth > window.innerHeight){
          document.body.style.display = "none";
          alert("请在竖屏下打开！")
        }else{
          document.body.style.display = "block";
        }
      }, 300);
    }, "orientationchange");
  },
};
</script>

<style>
  @font-face {
    font-family: "HYMingChanKeBenW";
    src: url("./assets/fonts/HYMingChanKeBenW.ttf")
  }
  @font-face {
    font-family: "HYYiHeXianJingW";
    src: url("./assets/fonts/HYYiHeXianJingW.ttf")
  }
  * {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  #app {
    width: 100vw;
    height: 100vh;
  }
  #background0 {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 8vh;
    left: 0;
    background-image: url(./assets/pictures/background.png);
    background-position:53% 50%;
    background-size: auto 92vh;
    background-repeat: no-repeat;
    z-index: -1;
  }
</style>

