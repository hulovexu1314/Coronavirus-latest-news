<template>
  <div>
    <Banner :city="cityname" :Datafrom="cityname === '美国'?'worldometers网站':'各国(地区)官方通报和权威媒体报道'"/>
    <div class="detaiBox">
      <div class="total">
        <div class="time">
          统计截至<span>{{ UNtimer.lastUpdateTime }}</span>
        </div>
      </div>
      <div class="recentNumber">
        <div class="icbla nowConfrim">
          <p class="add">
            较上日<span>{{ citydata.nowConfirmCompare | filterNumber }}</span>
          </p>
          <div class="num">{{ citydata.nowConfirm }}</div>
          <div class="text">现有确诊</div>
        </div>
        <div class="icbla confrim">
          <p class="add">
            较上日<span>{{ citydata.confirmAdd | filterNumber }}</span>
          </p>
          <div class="num">{{ citydata.confirm }}</div>
          <div class="text">累计确诊</div>
        </div>
        <div class="icbla heal">
          <p class="add">
            较上日<span>{{ citydata.healCompare | filterNumber }}</span>
          </p>
          <div class="num">{{ citydata.heal }}</div>
          <div class="text">累计治愈</div>
        </div>
        <div class="icbla dead">
          <p class="add">
            较上日<span>{{ citydata.deadCompare | filterNumber }}</span>
          </p>
          <div class="num">{{ citydata.dead }}</div>
          <div class="text">累计死亡</div>
        </div>
      </div>
      <div class="echarts" v-if="cityname === '美国'">
        <div
          class="EchartsBOX"
          ref="myEchart1"
          style="min-height: 100vw;"
        ></div>
      </div>
      <div class="echarts1">
        <div
          class="EchartsBOX"
          ref="myEchart2"
          style="min-height: 55vw; width: 100%"
        ></div>
      </div>
      <div class="echarts1">
        <div
          class="EchartsBOX"
          ref="myEchart3"
          style="min-height: 55vw; width: 100%"
        ></div>
      </div>
      <div class="table" v-if="cityname === '美国'">
        <div class="title-head">
          <span class="title">中国疫情（包括港澳台）</span>
        </div>
        <div class="tips">7:00-10:00为更新高峰期，数据如有滞后请谅解。</div>
        <div class="listWraper" ref="piediv">
          <table>
            <thead>
              <tr>
                <th>地区</th>
                <th>累计确诊</th>
                <th>治愈</th>
                <th>死亡</th>
              </tr>
            </thead>
          </table>
          <table>
            <tbody>
              <tr class="areaBox" v-for="(item, index) in usaChild" :key="index">
                <th class="area">
                  <span>{{item.name }}</span>
                </th>
                <td>
                  <p>{{ item.confirm}}</p>
                </td>
                <td>
                  <p>{{ item.heal}}</p>
                </td>
                <td>
                  <p>{{ item.dead}}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "../components/banner.vue";
// import { Swiper, Slide } from "vue-swiper-component";
import echarts from "echarts";

import USA from "../assets/USA.json";
import { getCountryDetailDatas } from '../api/request.js'
export default {
  name: "detailUN",
  components: {
    Banner,
    // Swiper,
    // Slide,
  },
  data() {
    return {
      UNtimer: {},
      UNdata: {},
      cityname: "",
      citydata: null,
      myChart: null,
      myChart2: null,
      myChart3: null,
      mapdata:[],
      state:{
        data:[],
        Confirm:[],
        ConfirmAdd:[],
        dead:[],
        heal:[]
      },
      usaChild:[],
    };
  },
  async created() {
    this.cityname = this.$route.query.city;
    this.UNtimer = JSON.parse(localStorage.getItem("UNtime"));
    this.UNdata = JSON.parse(localStorage.getItem("UNData"));
    // console.log(this.UNtimer);
    // console.log(this.UNdata);
    // console.log(this.cityname);
    let filterarr = this.UNdata.filter((item) => {
      return item.name === this.cityname;
    })[0];
    this.citydata = filterarr;
    // console.log(filterarr);
    try{
      if(this.cityname === '美国'){
        const USAMAPdata = await this.getMapjson()
        const { FAutoforeignList } = USAMAPdata.data
        // console.log(FAutoforeignList)
        let child = FAutoforeignList.filter((item) => {
          return item.name === this.cityname;
        })[0];
        // console.log(child.children)
        this.usaChild = child.children
        console.log(this.usaChild)
        child.children.forEach((item) => {
          this.mapdata.push({
            name:item.name,
            value:item.confirm
          })
        })
        // console.log(this.mapdata)
        this.myChart.setOption({
          series: [
            {
              data: this.mapdata,
            },
          ],
        })
      }
      const CountryDetailData = await this.getCountryDetailData()
      CountryDetailData.data.data.forEach((item) => {
        this.state.data.push(item.date.replace(".", "-"))
        this.state.Confirm.push(item.confirm)
        this.state.ConfirmAdd.push(item.confirm_add)
        this.state.dead.push(item.dead)
        this.state.heal.push(item.heal)
      })
      console.log(this.state)
      this.myChart2.setOption({
        title: {
          text: `${this.cityname}疫情新增趋势`,
          top: "3%",
          textStyle: {
            fontSize: 14,
            color: "rgba(30, 28, 28, 1)",
            fontWeight: "bolder",
          },
        },
        color: ["#f06061"],
        tooltip: {
          formatter: function (params) {
            let list = [];
            // console.log(params)
            for (let i = 0; i < params.length; i++) {
              list.push(`
                <i style="display: inline-block;width: 10px;height: 10px;background:${params[i].color};margin-right: 5px;border-radius: 50%;}"></i>
                ${params[i].seriesName}：${params[i].value}<br>
                `);
            }
            let str = `${params[0].axisValue}<br>${list.join("")}`;
            return `<div>${str}</div>`;
          },
        },
        legend: {
          data: ["新增确诊"],
          icon: "rect",
          itemHeight: 10,
          itemWidth: 10,
          textStyle: {
            fontSize: 10,
            color: "rgba(11, 8, 8, 1)",
          },
          left: "5%",
          top: "14%",
          orient: "horizontal",
        },
        xAxis: [
          {
            data: this.state.data,
          },
        ],
        series: [
          {
            type: "line",
            name: "新增确诊",
            data: this.state.ConfirmAdd,
            lineStyle: {
              color: "#f06061",
            },
          },
        ],
      })
      this.myChart3.setOption({
        title: {
          text: `${this.cityname}疫情累计趋势`,
          top: "3%",
          textStyle: {
            fontSize: 14,
            color: "rgba(30, 28, 28, 1)",
            fontWeight: "bolder",
          },
        },
        color: ["#f06061", "#65b379", "#87878b"],
        tooltip: {
          formatter: function (params) {
            let list = [];
            // console.log(params)
            for (let i = 0; i < params.length; i++) {
              list.push(`
                <i style="display: inline-block;width: 10px;height: 10px;background:${params[i].color};margin-right: 5px;border-radius: 50%;}"></i>
                ${params[i].seriesName}：${params[i].value}<br>
                `);
            }
            let str = `${params[0].axisValue}<br>${list.join("")}`;
            return `<div>${str}</div>`;
          },
        },
        legend: {
          data: ["累计确诊", "累计治愈", "累计死亡"],
          icon: "rect",
          itemHeight: 10,
          itemWidth: 10,
          textStyle: {
            fontSize: 10,
            color: "rgba(11, 8, 8, 1)",
          },
          left: "5%",
          top: "14%",
          orient: "horizontal",
        },
        xAxis: [
          {
            data: this.state.data,
          },
        ],
        series: [
          {
            type: "line",
            name: "累计确诊",
            data: this.state.Confirm,
            lineStyle: {
              color: "#f06061",
            },
          },
          {
            type: "line",
            name: "累计治愈",
            data: this.state.heal,
            lineStyle: {
              color: "#65b379",
            },
          },
          {
            type: "line",
            name: "累计死亡",
            data: this.state.dead,
            lineStyle: {
              color: "#87878b",
            },
          },
        ],
      })
    }catch(e){
      console.log('error:',e)
    }
  },
  methods: {
    initEchart() {
      if(this.cityname === '美国'){
        this.myChart = echarts.init(this.$refs.myEchart1);
        echarts.registerMap("USA", USA, {
          '阿拉斯加州': {
            // 把阿拉斯加移到美国主大陆左下方
            left: -131,
            top: 25,
            width: 15,
          },
          '夏威夷': {
            left: -110, // 夏威夷
            top: 28,
            width: 5,
          },
          "波多黎各": {
            // 波多黎各
            left: -76,
            top: 26,
            width: 2,
          },
        });
        this.myChart.setOption({
        tooltip: {
          triggerOn: "click",
          formatter: function (e) {
            let htmls = `<div style="width:95px;height:50px;text-align:center;font-size:10px"><div>${e.name}</div><div style="text-align:center;">现有确诊:${e.value}</div></div>`;
            return htmls;
          },
        },
        visualMap: {
          type: "piecewise",
          min: 0,
          max: 100000,
          itemWidth: 5,
          itemHeight: 10,
          itemGap: 0,
          left: 0,
          bottom: 0,
          textGap: 2,
          showLabel: true,
          pieces: [
            {
              gt: 10000,
              label: "10000人及以上",
              color: "#990000",
            },
            {
              gte: 1000,
              lte: 9999,
              label: "1000-9999人",
              color: "#d7301f",
            },
            {
              gte: 500,
              lte: 999,
              label: "500-999人",
              color: "#ef6548",
            },
            {
              gte: 100,
              lte: 499,
              label: "100-499人",
              color: "#fc8d59",
            },
            {
              gte: 10,
              lte: 99,
              label: "10-99人",
              color: "#fdbb84",
            },
            {
              gte: 1,
              lte: 9,
              label: "1-9人",
              color: "#fdd49e",
            },
            {
              value: 0,
              label: "0人",
              color: "#ccc",
            },
          ],
          show: !0,
        },
        geo: {
          map: "USA",
          top: "2%",
          left: "2%",
          right:"5%",
          bottom: "25%",
          label: {
            normal: {
              show: !0,
              fontSize: "10",
              color: "rgba(0,0,0,0.7)",
            },
          },
          itemStyle: {
            normal: {
              borderColor: "rgba(0, 0, 0, 0.2)",
            },
            emphasis: {
              areaColor: "#ffffb2",
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              borderWidth: 0,
            },
          },
        },
        series: [
          {
            name: "确诊病例",
            type: "map",
            map: "USA",
            geoIndex: 0,
            textFixed: {
              Alaska: [20, -20]
            },
            data: [
              { name: "佛罗里达", value: 19317568 },
              { name: "德克萨斯", value: 26059203 },
            ],
          },
        ],
      });
      }
      let option = {
        title: {
          text: "欧洲多国累计治愈趋势图",
          top: "3%",
          textStyle: {
            fontSize: 14,
            color: "rgba(30, 28, 28, 1)",
            fontWeight: "bolder",
          },
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "0%",
          right: "1%",
          bottom: "1%",
          top: "30%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisLabel: {
            showMaxLabel: true,
            showMinLabel: true,
            interval: 24,
            fontSize: 9,
            rotate: 55,
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            show: true,
            fontStyle: "italic",
            fontWeight: "bolder",
            fontSize: 9,
          },
        },
        series: [],
      }
      this.myChart2 = echarts.init(this.$refs.myEchart2);
      this.myChart3 = echarts.init(this.$refs.myEchart3);
      this.myChart2.setOption(option)
      this.myChart3.setOption(option)
    },
    getMapjson() {
      return new Promise((resolve, reject) => {
        fetch("https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=FAutoforeignList")
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.ret === 0) {
              resolve(data);
            } else {
              reject(data);
            }
          })
          .catch((e) => reject(e));
      });
    },
    getCountryDetailData(){
      return new Promise((resolve,reject) => {
        getCountryDetailDatas(this.cityname).then(res => resolve(res)).catch(e => reject(e))
      }).catch(err => console.log(err))
    }
  },
  filters: {
    filterNumber: function (value) {
      if (value >= 0) {
        return `+${value}`;
      } else {
        return value;
      }
    },
  },
  mounted() {
    this.initEchart();
  },
};
</script>

<style lang="scss" scoped>
.detaiBox {
  // background-color: blue;
  padding: 5vw;
  overflow: hidden;
  .total {
    padding: 5.333vw 5.333vw 4vw;
    line-height: 3.733vw;
    font-size: 3.2vw;
    background-color: #fff;
    color: #737373;
    position: relative;
    border-radius: 3.2vw 3.2vw 0 0;
    .time {
      span {
        font-weight: 500;
        color: #222;
        margin-left: 1vw;
      }
    }
  }
  .recentNumber {
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    .icbla {
      width: 21.867vw;
      position: relative;
      text-align: center;
      padding: 1.6vw 0 3.2vw;
      margin-right: 0.533vw;
      &:first-child {
        border-radius: 1.6vw 0 0 1.6vw;
      }
      &:last-child {
        border-radius: 0 1.6vw 1.6vw 0;
        margin-right: 0;
      }
    }
    .nowConfrim {
      background-color: #fff0f1;
      span {
        color: #f23a3b;
      }
      .num {
        color: #f23a3b;
      }
    }
    .confrim {
      background-color: #fff0f1;
      span {
        color: #cc1e1e;
      }
      .num {
        color: #cc1e1e;
      }
    }
    .heal {
      background-color: #f0f8f4;
      span {
        color: #178b50;
      }
      .num {
        color: #178b50;
      }
    }
    .dead {
      background-color: #f2f6f7;
      span {
        color: #4e5a65;
      }
      .num {
        color: #4e5a65;
      }
    }
    .add {
      padding-top: 1.6vw;
      color: #7c7c7c;
      font-size: 2.4vw;
      line-height: 2.667vw;
      height: 2.667vw;
      font-weight: 500;
      display: none;
      white-space: nowrap;
      display: block;
      font-family: PingFang SC, Helvetica Neue, Helvetica, Arial,
        Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei,
        sans-serif;
    }
    .num {
      font-size: 4.267vw;
      line-height: 5.867vw;
      height: 5.867vw;
      font-weight: 600;
      padding-top: 1.6vw;
    }
    .text {
      font-size: 3.2vw;
      height: 3.2vw;
      line-height: 3.2vw;
      color: #222;
      font-weight: 500;
      margin-top: 1.6vw;
    }
  }
  .echarts1{
    // padding: 2vw 5vw;

  }
  .table {
    margin-top: 5.5vw;
    .title-head {
      box-sizing: border-box;
      height: 4.8vw;
      line-height: normal;
      color: #222;
      font-size: 3.733vw;
      font-weight: 700;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        display: inline-block;
        font-size: 4.267vw;
      }
    }
    .tips {
      color: #737373;
      font-size: 3.2vw;
      line-height: 3.2vw;
      height: 3.2vw;
      font-weight: 400;
      font-style: normal;
      margin: 1.5vw 0 3.5vw 0;
    }
    .listWraper {
      table {
        border: 0;
        padding: 0;
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        thead {
          border-collapse: collapse;
          border-spacing: 0;
          th {
            height: 10.667vw;
            text-align: center;
            font-size: 3.2vw;
            font-weight: 400;
            padding: 0;
            margin: 0;
            border: 0;
            line-height: 10.667vw;
            border-right: 1px solid #fff;
            &:first-child {
              background-color: #f5f5f5;
              width: 18.4vw;
            }
            &:nth-child(2) {
              background-color: #fdeeee;
              color: #f55253;
              width: 15.467vw;
            }
            &:nth-child(3) {
              background-color: #e9f7ec;
              color: #178b50;
              width: 12vw;
            }
            &:nth-child(4) {
              background-color: #f3f6f8;
              color: #4e5a65;
              width: 12vw;
            }
          }
        }
        tbody {
          line-height: 10.667vw;
          height: 10.667vw;
          font-size: 3.2vw;
          border-collapse: collapse;
          th {
            border-bottom: 1px solid #f5f5f5;
            &:first-child {
              background-color: #fff;
              width: 18.4vw;
            }
          }
          td {
            border-bottom: 1px solid #f5f5f5;
            text-align: center;
            position: relative;
            border-right: 1px solid #fff;
            &:nth-child(2),
            &:nth-child(3) {
              width: 15.467vw;
            }
            &:nth-child(4),
            &:nth-child(5) {
              width: 12vw;
            }
          }
          .areaBox {
            .area{
              text-align: left;
            }
            p {
              position: relative;
            }
            .text {
              color: #333;
              font-size: 3.2vw;
              display: block;
              width: 100%;
              // position:absolute;
              // top: 0;
              // left:1vw;
            }
          }
          tr.city {
            display: none;
            color: #737373;
          }
          tr.tips {
            display: none;
            color: #737373;
          }
        }
      }
    }
  }
}
</style>