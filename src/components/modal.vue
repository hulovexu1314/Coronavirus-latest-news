<template>
  <div v-if="Show" class="modalMain">
    <div class="mask" @click="maskHandler"></div>
    <div class="region">
      <div class="left">
        <div 
        v-for="(item,i) in list" :key="item.id" 
        class="region-left-item"
        :class="[{active:i===index}]"
        @click="showDetailHandler(item.name,i)"
        >
        {{item.name}}
        </div>
      </div>
      <div class="right">
        <div>
          <div 
            v-for="(item,i) in ShowSelectData" 
            :key="item.id" 
            class="region-right-item"
            :class="[{active:i===detailIndex}]"
            @click="DetailHandler(item,i)"
            >
            {{item.name}}
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal",
  props: {
    list:{
      type:Array,
      default:()=>[],
      required:true
    }
  },
  data(){
    return {
      Showdefault:[],
      ShowSelectData:[],
      Show:false,
      index:"0",
      detailIndex:"0",
      LeftValue:'',
      RightValue:'',
      type:'',
    }
  },
  mounted(){

  },
  methods:{
    maskHandler(){
      this.Show = !this.Show
    },
    showDetailHandler(name,i){
      this.ShowSelectData = this.list.filter((item)=>{
        return item.name === name
      })[0].list
      // console.log(name,this.ShowSelectData);
      this.index = i
      this.detailIndex='0'
    },
    DetailHandler(item,i){
      this.detailIndex = i
      this.Show = false
      if(this.type==='left'){
        this.$emit('left-value',item)
      } else {
        this.$emit('right-value',item)
      }
    },
    ModalShowHandler(type){
      // console.log(type);
      this.type = type
      this.Show = !this.Show
    }
  }
};
</script>

<style scoped lang='scss'>
.modalMain {
  width: 100vw;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  display: flex;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 80;
  justify-content: center;
  padding: 13.867vw 3.733vw;
  .mask {
    width: 100vw;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: fixed;
    z-index: -1;
  }
  .region {
    height: 100%;
    border-radius: 1.6vw;
    width: 92.533vw;
    background-color: #fff;
    overflow: hidden;
    display: flex;

    .left {
      width: 24vw;
      background-color: #f6f6f6;
      overflow-y: scroll;
      overflow-x: hidden;
      height: 100%;
      border-radius: 1.6vw;
      .region-left-item {
        width: 24vw;
        height: 12.533vw;
        line-height: 12.533vw;
        text-align: center;
        overflow: hidden;
        font-size: 4.267vw;
        color: #4e4e4e;
        font-weight: 500;
        &.active {
          color: #005dfe;
          background-color: #fff;
        }
      }
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .right {
      padding-left: 8vw;
      color: #4e4e4e;
      overflow: scroll;
      flex: 1;
      box-sizing: border-box;
      .region-right-item {
        height: 12.533vw;
        line-height: 12.533vw;
        text-align: left;
        font-size: 4.267vw;
        &.active {
          color: #005dfe;
          background-color: #fff;
        }
      }
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>