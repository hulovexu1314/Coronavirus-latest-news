<template>
  <div class="policy">
    <div v-if="isShow">
      <div class="shuxian"></div>
      <div class="setout">
        <div class="topbox">
          <div class="imgs"></div>
          <p class="cityname">出发地：{{ data.left.city }}</p>
          <Tag v-if="l.hight" :type="2" :num="l.hight" />
          <Tag v-if="l.mid" :type="1" :num="l.mid" />
          <Tag v-if="data.left.poi_list.length === 0" />
        </div>
        <div class="time">
          <p class="resulename">数据来源于当地卫健委</p>
          <p class="resuletime">
            政策发布时间：{{ data.left.leave_policy_date }}
          </p>
        </div>
        <div class="outpolicy">
          <p class="title">离开政策</p>
          <p
            v-for="item in data.left.leave_policy_list"
            :key="item"
            class="txt"
          >
            {{ item }}
          </p>
        </div>
        <div class="areaList" v-if="data.left.poi_list.length">
          <p class="title">
            中高风险地区<span>{{ data.left.poi_list.length }}个</span>
          </p>
          <ul>
            <li v-for="item in data.left.poi_list" :key="item.area ">
              <Tag :styles="0" :type="Number(item.type)" />
              <p class="listconter">{{ item.area }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="arrive">
        <div class="topbox">
          <div class="imgs"></div>
          <p class="cityname">目的地：{{data.right.city}}</p>
          <Tag v-if="r.hight" :type="2" :num="r.hight" />
          <Tag v-if="r.mid" :type="1" :num="r.mid" />
          <Tag v-if="data.right.poi_list.length === 0" />
        </div>
        <div class="time">
          <p class="resulename">数据来源于当地卫健委</p>
          <p class="resuletime">政策发布时间:{{ data.right.back_policy_date }}</p>
        </div>
        <div class="outpolicy">
          <p class="title">到达政策</p>
          <p
            v-for="item in data.right.back_policy_list"
            :key="item + 'as'"
            class="txt"
          >
            {{ item }}
          </p>
        </div>
        <div class="accommo">
          <p class="title">住宿须知</p>
          <p v-for="item in data.right.stay_info_list" :key="item+'b'" class="txt">{{item}}</p>
        </div>
        <div class="areaList" v-if="data.right.poi_list.length">
          <p class="title">中高风险地区<span>{{data.right.poi_list.length}}个</span></p>
          <ul>
            <li v-for="item in data.right.poi_list" :key="item.area">
              <Tag :styles="0" :type="Number(item.type)" />
              <p class="listconter">{{ item.area }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="info">
        <div class="topbox">
          <div class="imgs"></div>
          <p class="text">发现信息有误？欢迎反馈，帮助我们做得更好。</p>
        </div>
      </div>
    </div>
    <div v-else style="text-align: center;">
      <span >请在上方选择地点！</span>
    </div>
  </div>
</template>

<script>
import Tag from "../components/tag.vue";
import Bus from "../tools/eventBus.js";
export default {
  name: "policy",
  components: {
    Tag,
  },
  data() {
    return {
      data: {
        left: {},
        right: {},
      },
      l: {
        hight: 0,
        mid: 0,
      },
      r: {
        hight: 0,
        mid: 0,
      },
      isShow: false,
      datas:{}
    };
  },
  methods:{
    ChangeHandler(){
        this.data.left = this.datas.data[1];
        this.data.right = this.datas.data[0];
    }
  },
  mounted() {
    Bus.$on("getInfo", (data,aa) => {
      if (Object.keys(data).length == 0) {
        console.log("空对象");
      } else {
        // console.log(aa);
        if(aa === 1){
          this.data.left = data.data[0];
          this.data.right = data.data[1];
        } else {
          this.data.left = data.data[1];
          this.data.right = data.data[0];
        }
          this.datas = data
          this.l.hight = this.l.mid = this.r.hight = this.r.mid = 0;
          this.data.left.poi_list.forEach((item) => {
            if (item.type === "2") {
              this.l.hight++;
            } else {
              this.l.mid++;
            }
          });
          this.data.right.poi_list.forEach((item) => {
            if (item.type === "2") {
              this.r.hight++;
            } else {
              this.r.mid++;
            }
          });
          this.isShow = true;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.policy {
  background: #f5f5f5 !important;
  font-weight: 400;
  position: relative;
  margin: 5vw 0vw;
  padding: 3vw 0;
  .shuxian {
    position: absolute;
    left: 4vw;
    
    top: 1.333vw;
    width: 1px;
    height: calc(100% - 2.133vw);
    background: #d8d8d8;
  }
  .setout {
    font-weight: 400;
    position: relative;
    .topbox {
      display: flex;
      align-items: center;
      padding: 0 0 0 2.4vw;
      .cityname {
        padding-left: 2.4vw;
        font-size: 4.267vw;
        color: #000;
        font-weight: 600;
      }
    }
    .time {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 2.4vw 3.733vw 0 7.733vw;
      .resulename {
        color: #a6a6a6;
        font-size: 3.2vw;
      }
      .resuletime {
        color: #a6a6a6;
        font-size: 3.2vw;
      }
    }
    .outpolicy {
      margin: 2.4vw 3.733vw 0 7.733vw;
      background: #fff;
      border-radius: 1.6vw;
      padding-bottom: 5.333vw;
    }
    .areaList {
      margin: 2.4vw 3.733vw 0 7.733vw;
      background: #fff;
      border-radius: 1.6vw;
      padding-bottom: 5.333vw;
    }
  }
  .arrive {
    font-weight: 400;
    position: relative;
    padding-top: 6vw;
    .topbox {
      display: flex;
      align-items: center;
      padding: 0 0 0 2.4vw;
      .cityname {
        padding-left: 2.4vw;
        font-size: 4.267vw;
        color: #000;
        font-weight: 600;
      }
    }
    .time {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 2.4vw 3.733vw 0 7.733vw;
      .resulename {
        color: #a6a6a6;
        font-size: 3.2vw;
      }
      .resuletime {
        color: #a6a6a6;
        font-size: 3.2vw;
      }
    }
    .outpolicy {
      margin: 2.4vw 3.733vw 0 7.733vw;
      background: #fff;
      border-radius: 1.6vw;
      padding-bottom: 5.333vw;
    }
    .areaList {
      margin: 2.4vw 3.733vw 0 7.733vw;
      background: #fff;
      border-radius: 1.6vw;
      padding-bottom: 5.333vw;
    }
    .accommo {
      margin: 2.4vw 3.733vw 0 7.733vw;
      background: #fff;
      border-radius: 1.6vw;
      padding-bottom: 5.333vw;
    }
  }
  .imgs {
    background: url(https://mat1.gtimg.com/news/signin/v6/chuxing_shuxian.png);
    background-size: 100% 100%;
    width: 3.2vw;
    height: 2.933vw;
  }
  .title {
    padding: 6.667vw 0 0 3.467vw;
    color: #000;
    font-size: 4.267vw;
    font-weight: 600;
  }
  .txt {
    padding: 2.4vw 2.667vw 0 3.467vw;
    color: #666;
    font-size: 3.733vw;
    line-height: 5.333vw;
  }
  li {
    display: flex;
    align-items: center;
    padding: 2.4vw 0 0 3.467vw;
    .listconter {
      margin-left: 1.333vw;
      color: #666;
      font-size: 3.733vw;
      line-height: 5.333vw;
      padding-right: 1.333vw;
    }
  }
  .info {
    position: relative;
    padding-top: 7.467vw;
    .topbox {
      display: flex;
      align-items: center;
      padding: 0 4vw 0 2.4vw;
      // justify-content: space-between;
    }
    .text {
      font-size: 3.2vw;
      color: #a6a6a6;
      padding-left: 5vw;
    }
  }
}
</style>