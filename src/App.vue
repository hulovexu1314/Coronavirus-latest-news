<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import Mains from './view/Mains.vue'

export default {
  name: "App",
  // components:{
  //   Mains
  // }
};
</script>

<style lang="scss">
.popup {
  width: 80%;
  min-height: 50vh;
  border-radius: 1.6vw;
  background: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  &.scroll {
    height: 50vh;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    display: block;
  }
  .popupbox {
    padding: 5.333vw 2.667vw 6.4vw 6.4vw;
    font-size: 3.2vw;
    line-height: 5.333vw;
    .title {
      font-size: 4.533vw;
      line-height: 5.333vw;
      font-weight: 500;
      color: #005dff;
    }
    .concents {
      .top {
        font-size: 3.467vw;
        font-weight: 500;
        margin-top: 2.667vw;
        color: #f80;
      }
      p {
        line-height: 6.133vw;
      }
    }
    .footer{
      color: #a6a6a6;
      margin-top: 3.467vw;
    }
  }
}
.close-btn {
  width: 8vw;
  height: 8vw;
  background: url(https://mat1.gtimg.com/news/feiyannews/icon_pop_close.png);
  background-size: 100% 100%;
  position: fixed;
  top: 30vw;
  right: 10vw;
  font-size: 3.2vw;
  line-height: 5.333vw;
  z-index: 9999;
}
.vue-slim-popup__mask {
  background-color: rgba(0, 0, 0, 0.75);
}
</style>
