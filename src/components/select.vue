<template>
  <div class="main">
    <div class="top">
      <p class="p3">出发地</p>
      <p class="p3">目的地</p>
    </div>
    <div class="low">
      <div class="left" @click="ShowModalHandler('left')">
        <div class="cityname">
          <p class="title" :class="[{colorgray:RightdefaultValue2 ===''}]">{{LeftdefaultValue || '选择出发地'}}</p>
          <div class="xb"></div>
        </div>
      </div>
      <div class="imgs" @click="changtype"></div>
      <div class="right" @click="ShowModalHandler('right')">
        <div class="cityname">
          <p class="title" :class="[{colorgray:RightdefaultValue2 ===''}]">{{RightdefaultValue2 || '选择目的地'}}</p>
          <div class="xb"></div>
          <div class="hx"></div>
        </div>
      </div>
    
    </div>
    <div class="btn" :class="[{disableBtn:isDisables}]" @click="SearchData">
      查询出行政策
    </div>
    <Modal :list="datalist" ref="modal" @left-value="getLeftValue" @right-value="getRightValue"/>
  </div>
</template>

<script>
import Modal from '../components/modal.vue'
import { getCityInfoData } from '../api/request.js'
import Bus from '../tools/eventBus.js'

export default {
  name: "selects",
  components:{
    Modal
  },
  props: {
    datalist:{
      type:Array,
      default:()=>[],
      required:true
    }
  },
  data() {
    return {
      ModalShow:false,
      data:{
        leftdata:{},
        rightdata:{},
      },
      LeftdefaultValue:'',
      RightdefaultValue2:'',
      type:1,
    };
  },
  computed:{
    isDisables(){
      return this.LeftdefaultValue === '' || this.RightdefaultValue2 === '' ? true : false
    }
  },
  methods:{
    changtype(){
      if(this.type === 1){
        this.type = 2
      }else if(this.type === 2){
        this.type = 1
      }
      let str = this.LeftdefaultValue
      this.LeftdefaultValue = this.RightdefaultValue2
      this.RightdefaultValue2 = str
      this.getCityInfo()
    },
    ShowModalHandler(type){
      this.$refs.modal.ModalShowHandler(type)
    },
    getLeftValue(value){
      // console.log('zuobian',value);
      this.data.leftdata = value
      this.LeftdefaultValue = value.name
    },
    getRightValue(value){
      // console.log('youbian',value);
      this.data.rightdata = value
      this.RightdefaultValue2 = value.name
    },
    async getCityInfo(){
      const l_id = this.data.leftdata.id
      const R_id = this.data.rightdata.id
      console.log(l_id,R_id);
      const res = await getCityInfoData(l_id,R_id)
      const { result } = res.data
      // console.log(result);
      Bus.$emit('getInfo',result,this.type)
    },
    SearchData(){
      let ValueisExist = this.LeftdefaultValue === '' || this.RightdefaultValue2 === '' ? false : true
      if(ValueisExist){
        this.getCityInfo()
      } else {
        console.log('没选完');
      }
    }
  }
};
</script>

<style scoped lang='scss'>
.main {
  position: relative;
  width: 92.267vw;
  border-radius: 3.2vw;
  background: #fff;
  margin: 2vw auto;
  padding: 0 0 9.733vw;
  box-shadow: 0 1px 2.933vw hsl(0deg 0% 89% / 50%);
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5.333vw 8.8vw 0;
    .p3 {
      color: #656565;
      font-size: 3.733vw;
    }
  }
  .low {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.733vw 7.2vw 0;
    .left {
      font-weight: 600;
      .cityname {
        display: flex;
        align-items: center;
        width: 30.4vw;
                .title{
              font-size: 5.333vw;
            color: #222;
        }
        .xb {
          margin-left: 1.6vw;
          width: 2.133vw;
          height: 1.333vw;
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAPCAYAAAD+pA/bAAAAAXNSR0IArs4c6QAAAJdJREFUOBG1lNEJgDAQQ+/DBVzCSZzGeXQaJ3EJF/BDk4Jgsdb0tAcRrFwewqNmZhOyV8qIXmuQuQKAnewO0+K5IH/9CbvYGU2HtxX5CmEHu5LT43RDvBDusiM7A756AdyVxmMWd+QpNSsyRqWoZiWNUSFvZmWNUSFPZknGqJCUWbIxKuRqVpExKuA0y2WMCqFZtzsmt3wAoj2sIDfhFK8AAAAASUVORK5CYII=);
          background-size: 100% 100%;
        }
        .colorgray {
          color: #a6a6a6;
        }
      }
    }
    .imgs {
      width: 8vw;
      height: 8vw;
      background-image: url(https://mat1.gtimg.com/news/signin/v6/chuxing_trans.png);
      background-size: 100% 100%;
    }
    .right {
      font-weight: 600;

      .cityname {

        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 30.4vw;
        .title{
              font-size: 5.333vw;
            color: #222;
        }
        .xb {
          margin-left: 1.6vw;
          width: 2.133vw;
          height: 1.333vw;
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAPCAYAAAD+pA/bAAAAAXNSR0IArs4c6QAAAJdJREFUOBG1lNEJgDAQQ+/DBVzCSZzGeXQaJ3EJF/BDk4Jgsdb0tAcRrFwewqNmZhOyV8qIXmuQuQKAnewO0+K5IH/9CbvYGU2HtxX5CmEHu5LT43RDvBDusiM7A756AdyVxmMWd+QpNSsyRqWoZiWNUSFvZmWNUSFPZknGqJCUWbIxKuRqVpExKuA0y2WMCqFZtzsmt3wAoj2sIDfhFK8AAAAASUVORK5CYII=);
          background-size: 100% 100%;
        }
        .colorgray {
          color: #a6a6a6;
        }
      }
    }
  }
  .btn{
    width: 77.867vw;
    height: 12.8vw;
    background: #005dff;
    border-radius: 6.4vw;
    margin: 8.533vw auto 0;
    line-height: 12.8vw;
    text-align: center;
    font-size: 4.8vw;
    color: #fff;
    &.disableBtn{
      background: grey;
    }
  };
}
</style>