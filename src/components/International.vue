<template>
  <div class="un">
    <div class="tips">
      <div class="times">
        <p>
          统计截至<span>{{ state.total.lastUpdateTime }}</span>
        </p>
      </div>
      <div class="recentNumber">
        <div class="nowConfirm box">
          <p class="add">
            较上日<span>+{{ state.total.nowConfirmAdd }}</span>
          </p>
          <div class="num">{{ state.total.nowConfirm }}</div>
          <div class="txt">现有确诊</div>
        </div>
        <div class="confirm box">
          <p class="add">
            较上日<span>+{{ state.total.confirmAdd }}</span>
          </p>
          <div class="num">{{ state.total.confirm }}</div>
          <div class="txt">累计确诊</div>
        </div>
        <div class="heal box">
          <p class="add">
            较上日<span>+{{ state.total.healAdd }}</span>
          </p>
          <div class="num">{{ state.total.heal }}</div>
          <div class="txt">累计治愈</div>
        </div>
        <div class="dead box">
          <p class="add">
            较上日<span>+{{ state.total.deadAdd }}</span>
          </p>
          <div class="num">{{ state.total.dead }}</div>
          <div class="txt">累计死亡</div>
        </div>
      </div>
    </div>
    <div class="chart1">
      <div class="chartBox">
        <Swiper
          :autoPlay="false"
          :showIndicator="false"
          ref="swiper11"
          data-id="1"
          @transtionend="getNum($event, 1)"
        >
          <Slide>
            <div class="charts1" ref="myCharts">1</div>
          </Slide>
          <Slide>
            <div class="charts1" ref="myCharts2">2</div>
          </Slide>
        </Swiper>
        <div
          class="arr_l"
          v-if="swiperType !== 0"
          @click="NextHandler(0, 1)"
        ></div>
        <div
          class="arr_r"
          v-if="swiperType !== 1"
          @click="NextHandler(1, 1)"
        ></div>
      </div>
      <div class="chartBoxBtn">
        <div
          class="btn-left"
          :class="[{ active: swiperType === 0 }]"
          @click="jumptoHandler($event, 1)"
          data-id="0"
        >
          海外多国<br />累计趋势
        </div>
        <div
          class="btn-right"
          :class="[{ active: swiperType === 1 }]"
          @click="jumptoHandler($event, 1)"
          data-id="1"
        >
          24小时新增<br />确诊TOP10
        </div>
      </div>
    </div>
    <div class="chart2">
      <div class="chartBox">
        <Swiper
          :autoPlay="false"
          :showIndicator="false"
          ref="swiper22"
          @transtionend="getNum($event, 2)"
        >
          <Slide>
            <div class="charts1" ref="myCharts3">1</div>
          </Slide>
          <Slide>
            <div class="charts1" ref="myCharts4">2</div>
          </Slide>
          <Slide>
            <div class="charts1" ref="myCharts5">3</div>
          </Slide>
        </Swiper>
        <div
          class="arr_l"
          v-if="swiperType2 !== 0"
          @click="NextHandler(0, 2)"
        ></div>
        <div
          class="arr_r"
          v-if="swiperType2 !== 2"
          @click="NextHandler(1, 2)"
        ></div>
      </div>
      <div class="chartBoxBtn">
        <div
          class="btn-left"
          :class="[{ active: swiperType2 === 0 }]"
          @click="jumptoHandler($event, 2)"
          data-id="0"
        >
          海外<br />累计趋势
        </div>
        <div
          class="btn-center"
          :class="[{ active: swiperType2 === 1 }]"
          @click="jumptoHandler($event, 2)"
          data-id="1"
        >
          海外<br />确诊趋势
        </div>
        <div
          class="btn-right"
          :class="[{ active: swiperType2 === 2 }]"
          @click="jumptoHandler($event, 2)"
          data-id="2"
        >
          海外<br />病死率/治愈率
        </div>
      </div>
    </div>
    <div class="chart3">
      <div class="chartBox">
        <Swiper
          :autoPlay="false"
          :showIndicator="false"
          ref="swiper33"
          @transtionend="getNum($event, 3)"
        >
          <Slide>
            <div class="charts1" ref="myCharts6">1</div>
          </Slide>
          <Slide>
            <div class="charts1" ref="myCharts7">2</div>
          </Slide>
          <Slide>
            <div class="charts1" ref="myCharts8">3</div>
          </Slide>
          <Slide>
            <div class="charts1" ref="myCharts9">4</div>
          </Slide>
        </Swiper>
        <div
          class="arr_l"
          v-if="swiperType3 !== 0"
          @click="NextHandler(0, 3)"
        ></div>
        <div
          class="arr_r"
          v-if="swiperType3 !== 3"
          @click="NextHandler(1, 3)"
        ></div>
      </div>
      <div class="chartBoxBtn">
        <div
          class="btn-left"
          :class="[{ active: swiperType3 === 0 }]"
          @click="jumptoHandler($event, 3)"
          data-id="0"
        >
          欧洲多国<br />现有确诊
        </div>
        <div
          class="btn-center"
          :class="[{ active: swiperType3 === 1 }]"
          @click="jumptoHandler($event, 3)"
          data-id="1"
        >
          美洲多国<br />现有确诊
        </div>
        <div
          class="btn-center"
          :class="[{ active: swiperType3 === 2 }]"
          @click="jumptoHandler($event, 3)"
          data-id="2"
        >
          亚洲多国<br />现有确诊
        </div>
        <div
          class="btn-right"
          :class="[{ active: swiperType3 === 3 }]"
          @click="jumptoHandler($event, 3)"
          data-id="3"
        >
          非洲多国<br />现有确诊
        </div>
      </div>
    </div>
    <div class="chart3">
      <div class="chartBox">
        <Swiper
          :autoPlay="false"
          :showIndicator="false"
          ref="swiper44"
          @transtionend="getNum($event, 4)"
        >
          <Slide>
            <div class="charts1" ref="myCharts10">1</div>
          </Slide>
          <Slide>
            <div class="charts1" ref="myCharts11">2</div>
          </Slide>
          <Slide>
            <div class="charts1" ref="myCharts12">3</div>
          </Slide>
          <Slide>
            <div class="charts1" ref="myCharts13">4</div>
          </Slide>
        </Swiper>
        <div
          class="arr_l"
          v-if="swiperType4 !== 0"
          @click="NextHandler(0, 4)"
        ></div>
        <div
          class="arr_r"
          v-if="swiperType4 !== 3"
          @click="NextHandler(1, 4)"
        ></div>
      </div>
      <div class="chartBoxBtn">
        <div
          class="btn-left"
          :class="[{ active: swiperType4 === 0 }]"
          @click="jumptoHandler($event, 4)"
          data-id="0"
        >
          欧洲多国<br />累计治愈
        </div>
        <div
          class="btn-center"
          :class="[{ active: swiperType4 === 1 }]"
          @click="jumptoHandler($event, 4)"
          data-id="1"
        >
          美洲多国<br />累计治愈
        </div>
        <div
          class="btn-center"
          :class="[{ active: swiperType4 === 2 }]"
          @click="jumptoHandler($event, 4)"
          data-id="2"
        >
          亚洲多国<br />累计治愈
        </div>
        <div
          class="btn-right"
          :class="[{ active: swiperType4 === 3 }]"
          @click="jumptoHandler($event, 4)"
          data-id="3"
        >
          非洲多国<br />累计治愈
        </div>
      </div>
    </div>
    <div class="chart4">
      <div class="chartBox">
        <Swiper
          :autoPlay="false"
          :showIndicator="false"
          ref="swiper55"
          @transtionend="getNum($event, 5)"
        >
          <Slide>
            <div class="charts1" ref="myCharts14">1</div>
          </Slide>
          <Slide>
            <div class="charts1" ref="myCharts15">2</div>
          </Slide>
          <Slide>
            <div class="charts1" ref="myCharts16">3</div>
          </Slide>
          <Slide>
            <div class="charts1" ref="myCharts17">4</div>
          </Slide>
        </Swiper>
        <div
          class="arr_l"
          v-if="swiperType5 !== 0"
          @click="NextHandler(0, 5)"
        ></div>
        <div
          class="arr_r"
          v-if="swiperType5 !== 3"
          @click="NextHandler(1, 5)"
        ></div>
      </div>
      <div class="chartBoxBtn">
        <div
          class="btn-left"
          :class="[{ active: swiperType5 === 0 }]"
          @click="jumptoHandler($event, 5)"
          data-id="0"
        >
          每百万人<br />确诊数
        </div>
        <div
          class="btn-center"
          :class="[{ active: swiperType5 === 1 }]"
          @click="jumptoHandler($event, 5)"
          data-id="1"
        >
          累计确诊<br />七日增幅
        </div>
        <div
          class="btn-center"
          :class="[{ active: swiperType5 === 2 }]"
          @click="jumptoHandler($event, 5)"
          data-id="2"
        >
          海外国家<br />治愈率排行
        </div>
        <div
          class="btn-right"
          :class="[{ active: swiperType5 === 3 }]"
          @click="jumptoHandler($event, 5)"
          data-id="3"
        >
          海外国家<br />病死率排行
        </div>
      </div>
    </div>
    <div class="chart5">
      <div class="mycharts" ref="myCharts18"></div>
      <div class="title">海外疫情累计确诊周增幅</div>
      <div class="table">
        <div class="item">
          <p>日期</p>
          <p>累计确诊</p>
          <p>周增幅</p>
        </div>
        <div
          class="item"
          v-for="(item, i) in state.FAutoContinentConfirmStatis"
          :key="i"
        >
          <p>{{ item.date }}</p>
          <p>{{ item.confirm }}</p>
          <p>{{ item.rate }}%</p>
        </div>
      </div>
    </div>
    <div class="heid" :class="[{tableHead:navBarFixed}]">
        <table>
          <thead>
            <tr>
              <th>地区</th>
              <th>新增确诊</th>
              <th>累计确诊</th>
              <th>治愈</th>
              <th>死亡</th>
              <th>疫情</th>
            </tr>
          </thead>
        </table>
    </div>
    <div class="tables" ref="piedivs">
      <div class="title-head">
        <span class="title">海外疫情</span>
        <div class="switchBtns">
          <p :class="[{current:tabletype}]" @click="ChangeTable">按大洲查看</p>
          <p :class="[{current:!tabletype}]" @click="ChangeTable">按国家查看</p>
        </div>
      </div>
      <div class="listWraper" ref="piediv">
        <table v-if="tabletype">
          <thead>
            <tr>
              <th>地区</th>
              <th>新增确诊</th>
              <th>累计确诊</th>
              <th>治愈</th>
              <th>死亡</th>
              <th>疫情</th>
            </tr>
          </thead>
          <tbody v-for="(item,i) in undata" :key="i">
            <tr class="areaBox"  @click="changeListType">
              <th class="area">
                <span>{{item.name}}({{item.len}})</span>
              </th>
              <td>
                <p >{{item.confirmAdd}}</p>
              </td>
              <td>
                <p>{{item.confirm}}</p>
              </td>
              <td>
                <p>{{item.heal}}</p>
              </td>
              <td>
                <p>{{item.dead}}</p>
              </td>
              <td></td>
            </tr>
            <tr class="city" v-for="(items,i) in item.children" :key="i">
              <th class="area">
                <span>{{items.name}}</span>
              </th>
              <td>
                <p style="color:blue">{{items.confirmAdd?items.confirmAdd:"-"}}</p>
              </td>
              <td>
                <p>{{items.confirm}}</p>
              </td>
              <td>
                <p>{{items.heal}}</p>
              </td>
              <td>
                <p>{{items.dead}}</p>
              </td>
              <td
                    style="color: blue"
                    @click="jumpToDetail($event, items.name)"
                  >
                    {{items.name | filterDetail}}
              </td>
            </tr>
          </tbody>
        </table>
        <table v-if="!tabletype">
          <thead>
            <tr>
              <th>地区</th>
              <th>新增确诊</th>
              <th>累计确诊</th>
              <th>治愈</th>
              <th>死亡</th>
              <th>疫情</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,i) in undataList" :key="i">
              <th class="area">
                <span>{{item.name}}</span>
              </th>
              <td>
                <p >{{item.confirmAdd}}</p>
              </td>
              <td>
                <p>{{item.confirm}}</p>
              </td>
              <td>
                <p>{{item.heal}}</p>
              </td>
              <td>
                <p>{{item.dead}}</p>
              </td>
              <td
                    style="color: blue"
                    @click="jumpToDetail($event, item.name)"
                  >
                    {{item.name | filterDetail}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="footer">

    </div>
  </div>
</template>

<script>
import { Swiper, Slide } from "vue-swiper-component";
import {
  getUnCityData,
  getUN8Data,
  getFAutoCountryNowConfirmMerge,
  getFAutoCountryHealMerge,
  getUnRankCityData,
  getUNRankData,
} from "../api/request";
import echarts from "echarts";
export default {
  name: "international",
  components: {
    Swiper,
    Slide,
  },
  data() {
    return {
      num: "1",
      swiperType: 0,
      swiperType2: 0,
      swiperType3: 0,
      swiperType4: 0,
      swiperType5: 0,
      undata:[],
      undataList:[],
      tabletype:true,
      navBarFixed:false,
      state: {
        total: {},
        FAutoCountryMerge: {
          data: [],
          rouss: [],
          baxi: [],
          deguo: [],
          yidali: [],
          faguo: [],
          meiguo: [],
          yingguo: [],
          xibanya: [],
        },
        unDataComfrim: {
          name: [],
          value: [],
        },
        FAutoGlobalDailyList: {
          data: [],
          newAddConfirm: [],
          deadRate: [],
          healRate: [],
          confirm:[],
          totalConfirm:[]
        },
        FAutoCountryNowConfirmMerge: {
          euro: {
            data: [],
            yingguo: [],
            faguo: [],
            deguo: [],
          },
          meizhou: {
            data: [],
            meiguo: [],
            baxi: [],
            milu: [],
          },
          yazhou: {
            data: [],
            yindu: [],
            yilang: [],
            bajisitan: [],
          },
          feizhou: {
            data: [],
            nanfei: [],
            aiji: [],
            niriniya: [],
          },
        },
        FAutoCountryHealMerge: {
          euro: {
            data: [],
            yingguo: [],
            faguo: [],
            deguo: [],
          },
          meizhou: {
            data: [],
            meiguo: [],
            baxi: [],
            milu: [],
          },
          yazhou: {
            data: [],
            yindu: [],
            yilang: [],
            bajisitan: [],
          },
          feizhou: {
            data: [],
            nanfei: [],
            aiji: [],
            niriniya: [],
          },
        },
        FAutoConfirmMillionRankList: {
          data: [],
          value: [],
        },
        FAutoCountryWeekCompRank: {
          data: [],
          value: [],
        },
        FAutoHealDeadRateRankList: {
          healHead: {
            data: [],
            value: [],
          },
          deadHead: {
            data: [],
            value: [],
          },
        },
        FAutoContinentConfirmStatis: [],
        FAutoContinentStatis: {
          data: [],
          yazhou: [],
          ouzhou: [],
          feihzou: [],
          nanmeizhou: [],
          beimeizhou: [],
          dayangzhou: [],
          orde: [],
          nowConfirm: [],
          totalConfirm:[]
        },
        FAutoforeignList:[],
        cityUNdata:[],
      },
      charts: {
        charts1: null,
        charts2: null,
        charts3: null,
        charts4: null,
        charts5: null,
        charts6: null,
        charts7: null,
        charts8: null,
        charts9: null,
        charts10: null,
        charts11: null,
        charts12: null,
        charts13: null,
        charts14: null,
        charts15: null,
        charts16: null,
        charts17: null,
        charts18: null,
        charts19: null,
      },
    };
  },
  methods: {
    watchScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // console.log(scrollTop);
        if(this.$refs.piedivs){
          if (scrollTop > this.$refs.piedivs.offsetTop + "") {
            this.navBarFixed = true;
          } else {
            this.navBarFixed = false;
          }
        }
    },
    ChangeTable(){
      this.tabletype=!this.tabletype
    },
    changeListType(e) {
      let classname = e.currentTarget.parentElement.className;
      if (classname) {
        e.currentTarget.parentElement.classList.remove("current");
      } else {
        e.currentTarget.parentElement.classList.add("current");
      }
    },
    NextHandler(num, i) {
      if (i === 1) {
        //0上一页1下一页
        if (num === 0) {
          this.$refs.swiper11.prevSlide();
        } else {
          this.$refs.swiper11.nextSlide();
        }
      }
      if (i === 2) {
        //0上一页1下一页
        if (num === 0) {
          this.$refs.swiper22.prevSlide();
        } else {
          this.$refs.swiper22.nextSlide();
        }
      }
      if (i === 3) {
        //0上一页1下一页
        if (num === 0) {
          this.$refs.swiper33.prevSlide();
        } else {
          this.$refs.swiper33.nextSlide();
        }
      }
      if (i === 4) {
        //0上一页1下一页
        if (num === 0) {
          this.$refs.swiper44.prevSlide();
        } else {
          this.$refs.swiper44.nextSlide();
        }
      }
      if (i === 5) {
        //0上一页1下一页
        if (num === 0) {
          this.$refs.swiper55.prevSlide();
        } else {
          this.$refs.swiper55.nextSlide();
        }
      }
    },
    jumpToDetail(e,name){
        e.stopPropagation();
        console.log(name)
        this.$router.push({ path: "/detailUN",query:{city: name}});
    },
    jumptoHandler(e, i) {
      if (i === 1) {
        let id = parseInt(e.target.dataset.id);
        this.$refs.swiper11.slideTo(id);
        this.swiperType = id;
      }
      if (i === 2) {
        let id = parseInt(e.target.dataset.id);
        this.$refs.swiper22.slideTo(id);
        this.swiperType2 = id;
      }
      if (i === 3) {
        let id = parseInt(e.target.dataset.id);
        this.$refs.swiper33.slideTo(id);
        this.swiperType3 = id;
      }
      if (i === 4) {
        let id = parseInt(e.target.dataset.id);
        this.$refs.swiper44.slideTo(id);
        this.swiperType4 = id;
      }
      if (i === 5) {
        let id = parseInt(e.target.dataset.id);
        this.$refs.swiper55.slideTo(id);
        this.swiperType5 = id;
      }
    },
    getNum(num, i) {
      // console.log('swiper索引：',num,'swiper:',i)
      if (i === 1) {
        this.swiperType = num;
      }
      if (i === 2) {
        this.swiperType2 = num;
      }
      if (i === 3) {
        this.swiperType3 = num;
      }
      if (i === 4) {
        this.swiperType4 = num;
      }
      if (i === 5) {
        this.swiperType5 = num;
      }
    },
    initTubiao9() {
      this.charts.charts1 = echarts.init(this.$refs.myCharts);
      this.charts.charts1.setOption({
        title: {
          text: "全国累计确诊/治愈/死亡趋势",
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
      });
    },
    initTubiao10() {
      this.charts.charts2 = echarts.init(this.$refs.myCharts2);
      this.charts.charts2.setOption({
        color: ["#3398DB"],
        title: {
          text: "24小时新增确诊国家TOP10",
          top: "8%",
          textStyle: {
            fontSize: 14,
            color: "rgba(30, 28, 28, 1)",
            fontWeight: "bolder",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "none", // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: "{b0}: {c0}",
        },
        grid: {
          left: "0%",
          right: "0%",
          bottom: "0%",
          top: "25%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              show: true,
              rotate: 60,
              fontSize: 10,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            offset: 0,
            minInterval: 1,
            axisLine: {
              lineStyle: {
                color: "rgba(67, 64, 64, 1)",
              },
              show: false,
            },
            axisLabel: {
              show: true,
              fontStyle: "italic",
              fontWeight: "bolder",
              fontSize: 9,
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "30%",
            data: [10, 52, 200, 334, 390, 330, 220],
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                  [
                    { offset: 0, color: "rgba(248, 21, 5, 1)" },
                    { offset: 0.8, color: "rgba(248, 122, 5, 1)" },
                    { offset: 1, color: "rgba(248, 220, 5, 1)" },
                  ] //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
                ),
              },
            },
          },
        ],
      });
    },
    initTubiao11() {
      this.charts.charts3 = echarts.init(this.$refs.myCharts3);
      this.charts.charts3.setOption({
        title: {
          text: "海外新增确诊趋势",
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
      });
      this.charts.charts4 = echarts.init(this.$refs.myCharts4);
      this.charts.charts4.setOption({
        title: {
          text: "海外确诊趋势",
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
      })
    },
    initTubiao13() {
      this.charts.charts5 = echarts.init(this.$refs.myCharts5);
      this.charts.charts5.setOption({
        title: {
          text: "海外治愈率/病死率对比",
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
      });
    },
    initTubiao14() {
      this.charts.charts6 = echarts.init(this.$refs.myCharts6);
      this.charts.charts6.setOption({
        title: {
          text: "欧洲多国现有确诊趋势图",
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
      });
      this.charts.charts7 = echarts.init(this.$refs.myCharts7);
      this.charts.charts7.setOption({
        title: {
          text: "美洲多国现有确诊趋势图",
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
      });
      this.charts.charts8 = echarts.init(this.$refs.myCharts8);
      this.charts.charts8.setOption({
        title: {
          text: "亚洲多国现有确诊趋势图",
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
      });
      this.charts.charts9 = echarts.init(this.$refs.myCharts9);
      this.charts.charts9.setOption({
        title: {
          text: "非洲多国现有确诊趋势图",
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
      });
    },
    initTubiao15() {
      this.charts.charts10 = echarts.init(this.$refs.myCharts10);
      this.charts.charts10.setOption({
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
      });
      this.charts.charts11 = echarts.init(this.$refs.myCharts11);
      this.charts.charts11.setOption({
        title: {
          text: "美洲多国累计治愈趋势图",
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
      });
      this.charts.charts12 = echarts.init(this.$refs.myCharts12);
      this.charts.charts12.setOption({
        title: {
          text: "亚洲多国累计治愈趋势图",
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
      });
      this.charts.charts13 = echarts.init(this.$refs.myCharts13);
      this.charts.charts13.setOption({
        title: {
          text: "非洲多国累计治愈趋势图",
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
      });
    },
    initTubiao16() {
      this.charts.charts14 = echarts.init(this.$refs.myCharts14);
      this.charts.charts14.setOption({
        title: {
          text: "海外主要疫情国家-每百万人确诊数",
          top: "3%",
          subtext: "本表为感染率最严重的国家",
          textStyle: {
            fontSize: 14,
            color: "rgba(30, 28, 28, 1)",
            fontWeight: "bolder",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "1%",
          bottom: "1%",
          right: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          axisTick: {
            show: false,
            lineStyle: {
              color: "rgba(135, 133, 133, 1)",
            },
          },
          axisLabel: {
            fontSize: 9,
          },
        },
        yAxis: {
          type: "category",
          data: [
            "周一",
            "周二",
            "周三",
            "周四",
            "周五",
            "周六",
            "周日",
            "周日",
            "周日",
            "周日",
          ],
          axisTick: {
            show: false,
            lineStyle: {
              color: "rgba(135, 133, 133, 1)",
            },
          },
          axisLabel: {
            fontSize: 9,
          },
        },
        series: [
          {
            type: "bar",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  1,
                  0,
                  [
                    {
                      offset: 0,
                      color: "rgba(218, 108, 108, 1)", // 0% 处的颜色
                    },
                    {
                      offset: 0.6,
                      color: "rgba(220, 57, 57, 1)", // 60% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(214, 15, 15, 1)", // 100% 处的颜色
                    },
                  ],
                  false
                ),
              },
            },
            barWidth: 6,
            data: [320, 302, 301, 334, 390, 330, 320, 320, 320, 320],
          },
        ],
      });
      this.charts.charts15 = echarts.init(this.$refs.myCharts15);
      this.charts.charts15.setOption({
        title: {
          text: "海外主要疫情国家-累计确诊七日增幅",
          top: "3%",
          subtext: "本表为最近一周增长幅度最快的国家",
          textStyle: {
            fontSize: 14,
            color: "rgba(30, 28, 28, 1)",
            fontWeight: "bolder",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: "{b}:{c}%",
        },
        grid: {
          left: "1%",
          bottom: "1%",
          right: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          axisTick: {
            show: false,
            lineStyle: {
              color: "rgba(135, 133, 133, 1)",
            },
          },
          axisLabel: {
            fontSize: 9,
            formatter: "{value}%",
          },
        },
        yAxis: {
          type: "category",
          data: [
            "周一",
            "周二",
            "周三",
            "周四",
            "周五",
            "周六",
            "周日",
            "周日",
            "周日",
            "周日",
          ],
          axisTick: {
            show: false,
            lineStyle: {
              color: "rgba(135, 133, 133, 1)",
            },
          },
          axisLabel: {
            fontSize: 9,
          },
        },
        series: [
          {
            type: "bar",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  1,
                  0,
                  [
                    {
                      offset: 0,
                      color: "rgba(218, 108, 108, 1)", // 0% 处的颜色
                    },
                    {
                      offset: 0.6,
                      color: "rgba(220, 57, 57, 1)", // 60% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(214, 15, 15, 1)", // 100% 处的颜色
                    },
                  ],
                  false
                ),
              },
            },
            barWidth: 6,
            data: [320, 302, 301, 334, 390, 330, 320, 320, 320, 320],
          },
        ],
      });
      this.charts.charts16 = echarts.init(this.$refs.myCharts16);
      this.charts.charts16.setOption({
        title: {
          text: "海外主要疫情国家-治愈率TOP10",
          top: "3%",
          subtext: "本表只对累计确诊数大于1000的国家排序",
          textStyle: {
            fontSize: 14,
            color: "rgba(30, 28, 28, 1)",
            fontWeight: "bolder",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: "{b}:{c}%",
        },
        grid: {
          left: "1%",
          bottom: "1%",
          right: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          axisTick: {
            show: false,
            lineStyle: {
              color: "rgba(135, 133, 133, 1)",
            },
          },
          axisLabel: {
            fontSize: 9,
            formatter: "{value}%",
          },
        },
        yAxis: {
          type: "category",
          data: [
            "周一",
            "周二",
            "周三",
            "周四",
            "周五",
            "周六",
            "周日",
            "周日",
            "周日",
            "周日",
          ],
          axisTick: {
            show: false,
            lineStyle: {
              color: "rgba(135, 133, 133, 1)",
            },
          },
          axisLabel: {
            fontSize: 9,
          },
        },
        series: [
          {
            type: "bar",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  1,
                  0,
                  [
                    {
                      offset: 0,
                      color: "rgba(207, 210, 28, 1)", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(125, 232, 18, 1)", // 100% 处的颜色
                    },
                  ],
                  false
                ),
              },
            },
            barWidth: 6,
            data: [320, 302, 301, 334, 390, 330, 320, 320, 320, 320],
          },
        ],
      });
      this.charts.charts17 = echarts.init(this.$refs.myCharts17);
      this.charts.charts17.setOption({
        title: {
          text: "海外主要疫情国家-病死率TOP10",
          top: "3%",
          subtext: "本表支队累计确诊数大于1000的国家排序",
          textStyle: {
            fontSize: 14,
            color: "rgba(30, 28, 28, 1)",
            fontWeight: "bolder",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: "{b}:{c}%",
        },
        grid: {
          left: "1%",
          bottom: "1%",
          right: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          axisTick: {
            show: false,
            lineStyle: {
              color: "rgba(135, 133, 133, 1)",
            },
          },
          axisLabel: {
            fontSize: 9,
            formatter: "{value}%",
          },
        },
        yAxis: {
          type: "category",
          data: [
            "周一",
            "周二",
            "周三",
            "周四",
            "周五",
            "周六",
            "周日",
            "周日",
            "周日",
            "周日",
          ],
          axisTick: {
            show: false,
            lineStyle: {
              color: "rgba(135, 133, 133, 1)",
            },
          },
          axisLabel: {
            fontSize: 9,
          },
        },
        series: [
          {
            type: "bar",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  1,
                  0,
                  [
                    {
                      offset: 0,
                      color: "rgba(20, 172, 248, 1)", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(79, 79, 78, 1)", // 100% 处的颜色
                    },
                  ],
                  false
                ),
              },
            },
            barWidth: 6,
            data: [320, 302, 301, 334, 390, 330, 320, 320, 320, 320],
          },
        ],
      });
    },
    initTubiao17() {
      this.charts.charts18 = echarts.init(this.$refs.myCharts18);
      this.charts.charts18.setOption({
        title: {
          text: "海外主要疫情国家-每百万人确诊数",
          top: "1%",
          textStyle: {
            fontSize: 14,
            color: "rgba(30, 28, 28, 1)",
            fontWeight: "bolder",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          itemWidth: 8,
          itemHeight: 8,
          icon: "rect",
          top: "7%",
          left: "4%",
          orient: "horizontal",
          itemGap: 4,
        },
        grid: {
          left: "1%",
          right: "3%",
          bottom: "1%",
          top: "22%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            axisTick: {
              show: false,
              lineStyle: {
                color: "rgba(135, 133, 133, 1)",
              },
            },
            axisLabel: {
              fontSize: 9,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false,
              lineStyle: {
                color: "rgba(135, 133, 133, 1)",
              },
            },
            axisLabel: {
              fontSize: 9,
            },
          },
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: 9,
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "邮件营销",
            type: "bar",
            stack: "广告",
            barWidth: 9,
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "联盟广告",
            type: "bar",
            stack: "广告",
            barWidth: 9,
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "联盟广告1",
            type: "bar",
            stack: "广告",
            barWidth: 9,
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "联盟广告2",
            type: "bar",
            stack: "广告",
            barWidth: 9,
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "联盟广告3",
            type: "bar",
            stack: "广告",
            barWidth: 9,
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "联盟广告4",
            type: "bar",
            stack: "广告",
            barWidth: 9,
            data: [220, 182, 191, 234, 290, 330, 310],
          },
        ],
      });
    },
    MyChartsSetOption() {
      this.charts.charts1.setOption({
        color: [
          "#60BBFC",
          "#FF7B7C",
          "#FFD661",
          "#9B0A0E",
          "#7E74EB",
          "#5591FA",
          "#CD73BF",
          "#FFA655",
        ],
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
          data: [
            "俄罗斯",
            "巴西",
            "德国",
            "意大利",
            "法国",
            "美国",
            "英国",
            "西班牙",
          ],
          right: "8%",
          top: "11%",
          orient: "horizontal",
          icon: "rect",
          itemHeight: 10,
          itemWidth: 10,
          textStyle: {
            fontSize: 9,
            color: "rgba(11, 8, 8, 1)",
          },
        },
        series: [
          {
            type: "line",
            name: "俄罗斯",
            data: this.state.FAutoCountryMerge.rouss,
            lineStyle: {
              color: "#60BBFC",
            },
          },
          {
            type: "line",
            name: "巴西",
            data: this.state.FAutoCountryMerge.baxi,
            lineStyle: {
              color: "#FF7B7C",
            },
          },
          {
            type: "line",
            name: "德国",
            data: this.state.FAutoCountryMerge.deguo,
            lineStyle: {
              color: "#FFD661",
            },
          },
          {
            type: "line",
            name: "意大利",
            data: this.state.FAutoCountryMerge.yidali,
            lineStyle: {
              color: "#9B0A0E",
            },
          },
          {
            type: "line",
            name: "法国",
            data: this.state.FAutoCountryMerge.faguo,
            lineStyle: {
              color: "#7E74EB",
            },
          },
          {
            type: "line",
            name: "美国",
            data: this.state.FAutoCountryMerge.meiguo,
            lineStyle: {
              color: "#5591FA",
            },
          },
          {
            type: "line",
            name: "英国",
            data: this.state.FAutoCountryMerge.yingguo,
            lineStyle: {
              color: "#CD73BF",
            },
          },
          {
            type: "line",
            name: "西班牙",
            data: this.state.FAutoCountryMerge.xibanya,
            lineStyle: {
              color: "FFA655",
            },
          },
        ],
        xAxis: [
          {
            data: this.state.FAutoCountryMerge.data,
          },
        ],
      });
    },
    MyChartsSetOption2() {
      this.charts.charts2.setOption({
        xAxis: [
          {
            data: this.state.unDataComfrim.name,
          },
        ],
        series: [
          {
            data: this.state.unDataComfrim.value,
          },
        ],
      });
    },
    MyChartsSetOption3() {
      this.charts.charts3.setOption({
        color: ["#9B0A0E"],
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
            data: this.state.FAutoGlobalDailyList.data,
          },
        ],
        series: [
          {
            type: "line",
            name: "新增确诊",
            data: this.state.FAutoGlobalDailyList.newAddConfirm,
            lineStyle: {
              color: "#9B0A0E",
            },
          },
        ],
      });
      this.charts.charts4.setOption({
        color: ["#9B0A0E","#ffa655"],
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
          data: ["累计确诊",'现有确诊'],
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
            data: this.state.FAutoGlobalDailyList.data,
          },
        ],
        series: [
          {
            type: "line",
            name: "累计确诊",
            data: this.state.FAutoGlobalDailyList.confirm,
            lineStyle: {
              color: "#9b0a0e",
            },
          },
          {
            type: "line",
            name: "现有确诊",
            data: this.state.FAutoGlobalDailyList.totalConfirm,
            lineStyle: {
              color: "#ffa655",
            },
          },
        ],
      });

    },
    MyChartsSetOption5() {
      this.charts.charts5.setOption({
        color: ["#ACDB70", "#2B7C74"],
        tooltip: {
          formatter: function (params) {
            let list = [];
            // console.log(params)
            for (let i = 0; i < params.length; i++) {
              list.push(`
                <i style="display: inline-block;width: 10px;height: 10px;background:${params[i].color};margin-right: 5px;border-radius: 50%;}"></i>
                ${params[i].seriesName}：${params[i].value}%<br>
                `);
            }
            let str = `${params[0].axisValue}<br>${list.join("")}`;
            return `<div>${str}</div>`;
          },
        },
        legend: {
          data: ["治愈率", "病死率"],
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
            data: this.state.FAutoGlobalDailyList.data,
          },
        ],
        series: [
          {
            type: "line",
            name: "治愈率",
            data: this.state.FAutoGlobalDailyList.healRate,
            lineStyle: {
              color: "#ACDB70",
            },
          },
          {
            type: "line",
            name: "病死率",
            data: this.state.FAutoGlobalDailyList.deadRate,
            lineStyle: {
              color: "#2B7C74",
            },
          },
        ],
      });
    },
    MyChartsSetOption6() {
      this.charts.charts6.setOption({
        color: ["#9B0A0E", "#FFA655", "#FF7B7C"],
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
          data: ["英国", "德国", "法国"],
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
            data: this.state.FAutoCountryNowConfirmMerge.euro.data,
          },
        ],
        series: [
          {
            type: "line",
            name: "英国",
            data: this.state.FAutoCountryNowConfirmMerge.euro.yingguo,
            lineStyle: {
              color: "#9B0A0E",
            },
          },
          {
            type: "line",
            name: "德国",
            data: this.state.FAutoCountryNowConfirmMerge.euro.deguo,
            lineStyle: {
              color: "#FFA655",
            },
          },
          {
            type: "line",
            name: "法国",
            data: this.state.FAutoCountryNowConfirmMerge.euro.faguo,
            lineStyle: {
              color: "#FF7B7C",
            },
          },
        ],
      });
      this.charts.charts7.setOption({
        color: ["#9B0A0E", "#FFA655", "#FF7B7C"],
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
          data: ["美国", "秘鲁", "巴西"],
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
            data: this.state.FAutoCountryNowConfirmMerge.meizhou.data,
          },
        ],
        series: [
          {
            type: "line",
            name: "美国",
            data: this.state.FAutoCountryNowConfirmMerge.meizhou.meiguo,
            lineStyle: {
              color: "#9B0A0E",
            },
          },
          {
            type: "line",
            name: "秘鲁",
            data: this.state.FAutoCountryNowConfirmMerge.meizhou.milu,
            lineStyle: {
              color: "#FFA655",
            },
          },
          {
            type: "line",
            name: "巴西",
            data: this.state.FAutoCountryNowConfirmMerge.meizhou.baxi,
            lineStyle: {
              color: "#FF7B7C",
            },
          },
        ],
      });
      this.charts.charts8.setOption({
        color: ["#9B0A0E", "#FFA655", "#FF7B7C"],
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
          data: ["印度", "伊朗", "巴基斯坦"],
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
            data: this.state.FAutoCountryNowConfirmMerge.yazhou.data,
          },
        ],
        series: [
          {
            type: "line",
            name: "印度",
            data: this.state.FAutoCountryNowConfirmMerge.yazhou.yindu,
            lineStyle: {
              color: "#9B0A0E",
            },
          },
          {
            type: "line",
            name: "伊朗",
            data: this.state.FAutoCountryNowConfirmMerge.yazhou.yilang,
            lineStyle: {
              color: "#FFA655",
            },
          },
          {
            type: "line",
            name: "巴基斯坦",
            data: this.state.FAutoCountryNowConfirmMerge.yazhou.bajisitan,
            lineStyle: {
              color: "#FF7B7C",
            },
          },
        ],
      });
      this.charts.charts9.setOption({
        color: ["#9B0A0E", "#FFA655", "#FF7B7C"],
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
          data: ["南非", "埃及", "尼日利亚"],
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
            data: this.state.FAutoCountryNowConfirmMerge.feizhou.data,
          },
        ],
        series: [
          {
            type: "line",
            name: "南非",
            data: this.state.FAutoCountryNowConfirmMerge.feizhou.nanfei,
            lineStyle: {
              color: "#9B0A0E",
            },
          },
          {
            type: "line",
            name: "尼日利亚",
            data: this.state.FAutoCountryNowConfirmMerge.feizhou.niriniya,
            lineStyle: {
              color: "#FFA655",
            },
          },
          {
            type: "line",
            name: "埃及",
            data: this.state.FAutoCountryNowConfirmMerge.feizhou.aiji,
            lineStyle: {
              color: "#FF7B7C",
            },
          },
        ],
      });
    },
    MyChartsSetOption7() {
      this.charts.charts10.setOption({
        color: ["#008733", "#2AB400", "#9BCE00"],
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
          data: ["英国", "德国", "法国"],
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
            data: this.state.FAutoCountryHealMerge.euro.data,
          },
        ],
        series: [
          {
            type: "line",
            name: "英国",
            data: this.state.FAutoCountryHealMerge.euro.yingguo,
            lineStyle: {
              color: "#008733",
            },
          },
          {
            type: "line",
            name: "德国",
            data: this.state.FAutoCountryHealMerge.euro.deguo,
            lineStyle: {
              color: "#9BCE00",
            },
          },
          {
            type: "line",
            name: "法国",
            data: this.state.FAutoCountryHealMerge.euro.faguo,
            lineStyle: {
              color: "#2AB400",
            },
          },
        ],
      });
      this.charts.charts11.setOption({
        color: ["#008733", "#2AB400", "#9BCE00"],
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
          data: ["美国", "秘鲁", "巴西"],
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
            data: this.state.FAutoCountryHealMerge.meizhou.data,
          },
        ],
        series: [
          {
            type: "line",
            name: "美国",
            data: this.state.FAutoCountryHealMerge.meizhou.meiguo,
            lineStyle: {
              color: "#008733",
            },
          },
          {
            type: "line",
            name: "秘鲁",
            data: this.state.FAutoCountryHealMerge.meizhou.milu,
            lineStyle: {
              color: "#2AB400",
            },
          },
          {
            type: "line",
            name: "巴西",
            data: this.state.FAutoCountryHealMerge.meizhou.baxi,
            lineStyle: {
              color: "#9BCE00",
            },
          },
        ],
      });
      this.charts.charts12.setOption({
        color: ["#008733", "#2AB400", "#9BCE00"],
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
          data: ["印度", "伊朗", "巴基斯坦"],
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
            data: this.state.FAutoCountryHealMerge.yazhou.data,
          },
        ],
        series: [
          {
            type: "line",
            name: "印度",
            data: this.state.FAutoCountryHealMerge.yazhou.yindu,
            lineStyle: {
              color: "#008733",
            },
          },
          {
            type: "line",
            name: "伊朗",
            data: this.state.FAutoCountryHealMerge.yazhou.yilang,
            lineStyle: {
              color: "#2AB400",
            },
          },
          {
            type: "line",
            name: "巴基斯坦",
            data: this.state.FAutoCountryHealMerge.yazhou.bajisitan,
            lineStyle: {
              color: "#9BCE00",
            },
          },
        ],
      });
      this.charts.charts13.setOption({
        color: ["#008733", "#2AB400", "#9BCE00"],
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
          data: ["南非", "埃及", "尼日利亚"],
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
            data: this.state.FAutoCountryHealMerge.feizhou.data,
          },
        ],
        series: [
          {
            type: "line",
            name: "南非",
            data: this.state.FAutoCountryHealMerge.feizhou.nanfei,
            lineStyle: {
              color: "#008733",
            },
          },
          {
            type: "line",
            name: "埃及",
            data: this.state.FAutoCountryHealMerge.feizhou.aiji,
            lineStyle: {
              color: "#9BCE00",
            },
          },
          {
            type: "line",
            name: "尼日利亚",
            data: this.state.FAutoCountryHealMerge.feizhou.niriniya,
            lineStyle: {
              color: "#2AB400",
            },
          },
        ],
      });
    },
    MyChartsSetOption8() {
      this.charts.charts14.setOption({
        yAxis: {
          data: this.state.FAutoConfirmMillionRankList.data,
        },
        series: [
          {
            data: this.state.FAutoConfirmMillionRankList.value,
          },
        ],
      });
      this.charts.charts15.setOption({
        yAxis: {
          data: this.state.FAutoCountryWeekCompRank.data,
        },
        series: [
          {
            data: this.state.FAutoCountryWeekCompRank.value,
          },
        ],
      });
      this.charts.charts16.setOption({
        yAxis: {
          data: this.state.FAutoHealDeadRateRankList.healHead.data,
        },
        series: [
          {
            data: this.state.FAutoHealDeadRateRankList.healHead.value,
          },
        ],
      });
      this.charts.charts17.setOption({
        yAxis: {
          data: this.state.FAutoHealDeadRateRankList.deadHead.data,
        },
        series: [
          {
            data: this.state.FAutoHealDeadRateRankList.deadHead.value,
          },
        ],
      });
    },
    MyChartsSetOption9() {
      this.charts.charts18.setOption({
        color: [
          "#DD0B10",
          "#FF6060",
          "#FFA655",
          "#FEDD7F",
          "#AE79FF",
          "#FFAFE6",
          "#D7C7D2",
          "#92B8FF",
        ],
        xAxis: [
          {
            type: "category",
            data: this.state.FAutoContinentStatis.data,
            axisTick: {
              show: false,
              lineStyle: {
                color: "rgba(135, 133, 133, 1)",
              },
            },
            axisLabel: {
              fontSize: 9,
            },
          },
        ],
        series: [
          {
            name: "欧洲",
            type: "bar",
            stack: "广告",
            barWidth: 7,
            data: this.state.FAutoContinentStatis.ouzhou,
          },
          {
            name: "亚洲(不含中国)",
            type: "bar",
            stack: "广告",
            barWidth: 7,
            data: this.state.FAutoContinentStatis.yazhou,
          },
          {
            name: "北美洲",
            type: "bar",
            stack: "广告",
            barWidth: 7,
            data: this.state.FAutoContinentStatis.beimeizhou,
          },
          {
            name: "南美洲",
            type: "bar",
            stack: "广告",
            barWidth: 7,
            data: this.state.FAutoContinentStatis.nanmeizhou,
          },
          {
            name: "大洋洲",
            type: "bar",
            stack: "广告",
            barWidth: 7,
            data: this.state.FAutoContinentStatis.dayangzhou,
          },
          {
            name: "非洲",
            type: "bar",
            stack: "广告",
            barWidth: 7,
            data: this.state.FAutoContinentStatis.feihzou,
          },
          {
            name: "其它",
            type: "bar",
            stack: "广告",
            barWidth: 7,
            data: this.state.FAutoContinentStatis.orde,
          },
          {
            name: "海外现有确诊",
            type: "bar",
            barWidth: 7,
            data: this.state.FAutoContinentStatis.nowConfirm,
          }
        ],
      });
    },
  },
  async created() {
    const result = await getUnCityData()
    const {
        FAutoGlobalStatis,
        FAutoContinentStatis,
        FAutoCountryConfirmAdd,
        FAutoGlobalDailyList,
      } = result.data.data;
      this.state.total = FAutoGlobalStatis;
      localStorage.setItem('UNtime',JSON.stringify(FAutoGlobalStatis))
      // console.log(this.state.total);
      this.state.cityUNdata = FAutoCountryConfirmAdd
      let arr = [];
      Object.keys(FAutoCountryConfirmAdd).forEach((item) => {
        arr.push({
          name: item,
        });
      });
      arr.forEach((item, index) => {
        item.value = Object.values(FAutoCountryConfirmAdd)[index];
      });
      arr.sort((a, b) => {
        return b.value - a.value;
      });
      let newarr = arr.splice(0, 10);
      newarr.forEach((item) => {
        this.state.unDataComfrim.name.push(item.name);
        this.state.unDataComfrim.value.push(item.value);
      });
      // 图表2数据
      // console.log(
      //   this.state.unDataComfrim.name,
      //   this.state.unDataComfrim.value
      // );
      this.MyChartsSetOption2();
      //-----------------------------------
      FAutoGlobalDailyList.forEach((item) => {
        this.state.FAutoGlobalDailyList.data.push(item.date.replace(".", "-"));
        this.state.FAutoGlobalDailyList.newAddConfirm.push(
          item.all.newAddConfirm
        );
        this.state.FAutoGlobalDailyList.confirm.push(item.all.confirm)
        this.state.FAutoGlobalDailyList.totalConfirm.push(item.all.confirm-item.all.dead-item.all.heal);
        this.state.FAutoGlobalDailyList.deadRate.push(item.all.deadRate);
        this.state.FAutoGlobalDailyList.healRate.push(item.all.healRate);
      });
      // 图表3数据
      // console.log('图表3数据',
      //   this.state.FAutoGlobalDailyList
      // )
      this.MyChartsSetOption3();
      // 图表5数据
      //   console.log('图表5数据',
      //   this.state.FAutoGlobalDailyList.data,
      //   this.state.FAutoGlobalDailyList.deadRate,
      //   this.state.FAutoGlobalDailyList.healRate
      // )
      this.MyChartsSetOption5();
      let arrs = FAutoContinentStatis.splice(FAutoContinentStatis.length - 7);
      let nums = 0;
      arrs.forEach((item) => {
        this.state.FAutoContinentStatis.data.push(item.date);
        this.state.FAutoContinentStatis.ouzhou.push(item.statis.欧洲);
        this.state.FAutoContinentStatis.yazhou.push(item.statis.亚洲);
        this.state.FAutoContinentStatis.feihzou.push(item.statis.非洲);
        this.state.FAutoContinentStatis.nanmeizhou.push(item.statis.南美洲);
        this.state.FAutoContinentStatis.beimeizhou.push(item.statis.北美洲);
        this.state.FAutoContinentStatis.dayangzhou.push(item.statis.大洋洲);
        this.state.FAutoContinentStatis.orde.push(item.statis.其他);
        this.state.FAutoContinentStatis.nowConfirm.push(item.nowConfirm);
        
        nums = item.statis.欧洲 + item.statis.亚洲 + item.statis.非洲 + item.statis.南美洲 + item.statis.北美洲 + item.statis.大洋洲 + item.statis.其他
        this.state.FAutoContinentStatis.totalConfirm.push(item.statis.欧洲 + item.statis.亚洲 + item.statis.非洲+item.statis.南美洲+item.statis.北美洲+item.statis.大洋洲+item.statis.其他);
      });
      console.log(nums)
      console.log(this.state.FAutoContinentStatis)
      this.MyChartsSetOption9();
    getUN8Data().then((res) => {
      // console.log(res.data.data);
      const { FAutoCountryMerge } = res.data.data;
      FAutoCountryMerge.俄罗斯.list.forEach((item, index) => {
        if (index >= 26) {
          this.state.FAutoCountryMerge.data.push(item.date.replace(".", "-"));
          this.state.FAutoCountryMerge.rouss.push(item.confirm);
        }
      });
      FAutoCountryMerge.巴西.list.forEach((item) => {
        this.state.FAutoCountryMerge.baxi.push(item.confirm);
      });
      FAutoCountryMerge.德国.list.forEach((item, index) => {
        if (index >= 29) {
          this.state.FAutoCountryMerge.deguo.push(item.confirm);
        }
      });
      FAutoCountryMerge.意大利.list.forEach((item, index) => {
        if (index >= 26) {
          this.state.FAutoCountryMerge.yidali.push(item.confirm);
        }
      });
      FAutoCountryMerge.法国.list.forEach((item, index) => {
        if (index >= 29) {
          this.state.FAutoCountryMerge.faguo.push(item.confirm);
        }
      });
      FAutoCountryMerge.美国.list.forEach((item, index) => {
        if (index >= 29) {
          this.state.FAutoCountryMerge.meiguo.push(item.confirm);
        }
      });
      FAutoCountryMerge.英国.list.forEach((item, index) => {
        if (index >= 26) {
          this.state.FAutoCountryMerge.yingguo.push(item.confirm);
        }
      });
      FAutoCountryMerge.西班牙.list.forEach((item, index) => {
        if (index >= 25) {
          this.state.FAutoCountryMerge.xibanya.push(item.confirm);
        }
      });
      //图表一数据
      // console.log(this.state.FAutoCountryMerge);
      this.MyChartsSetOption();
    });
    getFAutoCountryNowConfirmMerge().then((res) => {
      // console.log(res.data.data.FAutoCountryNowConfirmMerge)
      const { FAutoCountryNowConfirmMerge } = res.data.data;

      FAutoCountryNowConfirmMerge.德国.list.forEach((item, index) => {
        if (index >= 3) {
          this.state.FAutoCountryNowConfirmMerge.euro.data.push(item.d);
          this.state.FAutoCountryNowConfirmMerge.euro.deguo.push(item.n);
        }
      });
      FAutoCountryNowConfirmMerge.法国.list.forEach((item, index) => {
        if (index >= 3) {
          this.state.FAutoCountryNowConfirmMerge.euro.faguo.push(item.n);
        }
      });
      FAutoCountryNowConfirmMerge.英国.list.forEach((item) => {
        this.state.FAutoCountryNowConfirmMerge.euro.yingguo.push(item.n);
      });
      // console.log('欧洲三国数据：',
      //   this.state.FAutoCountryNowConfirmMerge.euro.data,
      //   this.state.FAutoCountryNowConfirmMerge.euro.faguo,
      //   this.state.FAutoCountryNowConfirmMerge.euro.deguo,
      //   this.state.FAutoCountryNowConfirmMerge.euro.yingguo,
      // )

      FAutoCountryNowConfirmMerge.秘鲁.list.forEach((item) => {
        this.state.FAutoCountryNowConfirmMerge.meizhou.data.push(item.d);
        this.state.FAutoCountryNowConfirmMerge.meizhou.milu.push(item.n);
      });
      FAutoCountryNowConfirmMerge.美国.list.forEach((item, index) => {
        if (index >= 38) {
          this.state.FAutoCountryNowConfirmMerge.meizhou.meiguo.push(item.n);
        }
      });
      FAutoCountryNowConfirmMerge.巴西.list.forEach((item, index) => {
        if (index >= 9) {
          this.state.FAutoCountryNowConfirmMerge.meizhou.baxi.push(item.n);
        }
      });
      // console.log('美洲三国数据：',
      //   this.state.FAutoCountryNowConfirmMerge.meizhou.data,
      //   this.state.FAutoCountryNowConfirmMerge.meizhou.milu,
      //   this.state.FAutoCountryNowConfirmMerge.meizhou.meiguo,
      //   this.state.FAutoCountryNowConfirmMerge.meizhou.baxi,
      // )
      FAutoCountryNowConfirmMerge.巴基斯坦.list.forEach((item) => {
        this.state.FAutoCountryNowConfirmMerge.yazhou.data.push(item.d);
        this.state.FAutoCountryNowConfirmMerge.yazhou.bajisitan.push(item.n);
      });
      FAutoCountryNowConfirmMerge.印度.list.forEach((item, index) => {
        if (index >= 23) {
          this.state.FAutoCountryNowConfirmMerge.yazhou.yindu.push(item.n);
        }
      });
      FAutoCountryNowConfirmMerge.伊朗.list.forEach((item, index) => {
        if (index >= 3) {
          this.state.FAutoCountryNowConfirmMerge.yazhou.yilang.push(item.n);
        }
      });
      // console.log('亚洲三国数据：',
      //   this.state.FAutoCountryNowConfirmMerge.yazhou.data,
      //   this.state.FAutoCountryNowConfirmMerge.yazhou.bajisitan,
      //   this.state.FAutoCountryNowConfirmMerge.yazhou.yindu,
      //   this.state.FAutoCountryNowConfirmMerge.yazhou.yilang,
      // )
      FAutoCountryNowConfirmMerge.南非.list.forEach((item) => {
        this.state.FAutoCountryNowConfirmMerge.feizhou.data.push(item.d);
        this.state.FAutoCountryNowConfirmMerge.feizhou.nanfei.push(item.n);
      });
      FAutoCountryNowConfirmMerge.埃及.list.forEach((item, index) => {
        if (index >= 3) {
          this.state.FAutoCountryNowConfirmMerge.feizhou.aiji.push(item.n);
        }
      });
      FAutoCountryNowConfirmMerge.尼日利亚.list.forEach((item, index) => {
        if (index >= 6) {
          this.state.FAutoCountryNowConfirmMerge.feizhou.niriniya.push(item.n);
        }
      });
      // console.log('非洲三国数据：',
      //   this.state.FAutoCountryNowConfirmMerge.feizhou.data,
      //   this.state.FAutoCountryNowConfirmMerge.feizhou.nanfei,
      //   this.state.FAutoCountryNowConfirmMerge.feizhou.aiji,
      //   this.state.FAutoCountryNowConfirmMerge.feizhou.niriniya,
      // )
      this.MyChartsSetOption6();
    });
    getFAutoCountryHealMerge().then((res) => {
      // console.log(res.data.data.FAutoCountryHealMerge);
      const { FAutoCountryHealMerge } = res.data.data;

      FAutoCountryHealMerge.德国.list.forEach((item, index) => {
        if (index >= 3) {
          this.state.FAutoCountryHealMerge.euro.data.push(item.d);
          this.state.FAutoCountryHealMerge.euro.deguo.push(item.n);
        }
      });
      FAutoCountryHealMerge.法国.list.forEach((item, index) => {
        if (index >= 3) {
          this.state.FAutoCountryHealMerge.euro.faguo.push(item.n);
        }
      });
      FAutoCountryHealMerge.英国.list.forEach((item) => {
        this.state.FAutoCountryHealMerge.euro.yingguo.push(item.n);
      });
      // console.log('欧洲三国治愈数据：',
      //   this.state.FAutoCountryHealMerge.euro.data,
      //   this.state.FAutoCountryHealMerge.euro.faguo,
      //   this.state.FAutoCountryHealMerge.euro.deguo,
      //   this.state.FAutoCountryHealMerge.euro.yingguo,
      // )
      FAutoCountryHealMerge.秘鲁.list.forEach((item) => {
        this.state.FAutoCountryHealMerge.meizhou.data.push(item.d);
        this.state.FAutoCountryHealMerge.meizhou.milu.push(item.n);
      });
      FAutoCountryHealMerge.美国.list.forEach((item, index) => {
        if (index >= 38) {
          this.state.FAutoCountryHealMerge.meizhou.meiguo.push(item.n);
        }
      });
      FAutoCountryHealMerge.巴西.list.forEach((item, index) => {
        if (index >= 9) {
          this.state.FAutoCountryHealMerge.meizhou.baxi.push(item.n);
        }
      });
      // console.log('美洲三国治愈数据：',
      //   this.state.FAutoCountryHealMerge.meizhou.data,
      //   this.state.FAutoCountryHealMerge.meizhou.milu,
      //   this.state.FAutoCountryHealMerge.meizhou.meiguo,
      //   this.state.FAutoCountryHealMerge.meizhou.baxi,
      // )
      FAutoCountryHealMerge.巴基斯坦.list.forEach((item) => {
        this.state.FAutoCountryHealMerge.yazhou.data.push(item.d);
        this.state.FAutoCountryHealMerge.yazhou.bajisitan.push(item.n);
      });
      FAutoCountryHealMerge.印度.list.forEach((item, index) => {
        if (index >= 23) {
          this.state.FAutoCountryHealMerge.yazhou.yindu.push(item.n);
        }
      });
      FAutoCountryHealMerge.伊朗.list.forEach((item, index) => {
        if (index >= 3) {
          this.state.FAutoCountryHealMerge.yazhou.yilang.push(item.n);
        }
      });
      // console.log('亚洲三国治愈数据：',
      //   this.state.FAutoCountryHealMerge.yazhou.data,
      //   this.state.FAutoCountryHealMerge.yazhou.bajisitan,
      //   this.state.FAutoCountryHealMerge.yazhou.yindu,
      //   this.state.FAutoCountryHealMerge.yazhou.yilang,
      // )
      FAutoCountryHealMerge.南非.list.forEach((item) => {
        this.state.FAutoCountryHealMerge.feizhou.data.push(item.d);
        this.state.FAutoCountryHealMerge.feizhou.nanfei.push(item.n);
      });
      FAutoCountryHealMerge.埃及.list.forEach((item, index) => {
        if (index >= 3) {
          this.state.FAutoCountryHealMerge.feizhou.aiji.push(item.n);
        }
      });
      FAutoCountryHealMerge.尼日利亚.list.forEach((item, index) => {
        if (index >= 6) {
          this.state.FAutoCountryHealMerge.feizhou.niriniya.push(item.n);
        }
      });
      // console.log('非洲三国治愈数据：',
      //   this.state.FAutoCountryHealMerge.feizhou.data,
      //   this.state.FAutoCountryHealMerge.feizhou.nanfei,
      //   this.state.FAutoCountryHealMerge.feizhou.aiji,
      //   this.state.FAutoCountryHealMerge.feizhou.niriniya,
      // )
      this.MyChartsSetOption7();
    });
    getUnRankCityData().then((res) => {
      // console.log(res.data.data.FAutoConfirmMillionRankList)
      const {
        FAutoConfirmMillionRankList,
        FAutoCountryWeekCompRank,
        FAutoHealDeadRateRankList,
        FAutoContinentConfirmStatis,
      } = res.data.data;

      FAutoConfirmMillionRankList.sort((a, b) => {
        return b.rate - a.rate;
      });
      let arr = FAutoConfirmMillionRankList.splice(0, 10);
      // console.log(arr);
      arr.forEach((item) => {
        this.state.FAutoConfirmMillionRankList.data.push(item.nation);
        this.state.FAutoConfirmMillionRankList.value.push(item.rate);
      });
      // console.log(
      //   "每百万人确诊数：",
      //   this.state.FAutoConfirmMillionRankList.data,
      //   this.state.FAutoConfirmMillionRankList.value
      // );
      FAutoCountryWeekCompRank.forEach((item) => {
        this.state.FAutoCountryWeekCompRank.data.push(item.nation);
        this.state.FAutoCountryWeekCompRank.value.push(item.rate);
      });
      // console.log(
      //   "累计确诊七日幅度",
      //   this.state.FAutoCountryWeekCompRank.data,
      //   this.state.FAutoCountryWeekCompRank.value
      // );
      FAutoHealDeadRateRankList.healHead.forEach((item) => {
        this.state.FAutoHealDeadRateRankList.healHead.data.push(item.country);
        this.state.FAutoHealDeadRateRankList.healHead.value.push(item.healRate);
      });
      // console.log(
      //   "海外国家治愈排行",
      //   this.state.FAutoHealDeadRateRankList.healHead.data,
      //   this.state.FAutoHealDeadRateRankList.healHead.value
      // );
      FAutoHealDeadRateRankList.deadHead.forEach((item) => {
        this.state.FAutoHealDeadRateRankList.deadHead.data.push(item.country);
        this.state.FAutoHealDeadRateRankList.deadHead.value.push(item.deadRate);
      });
      // console.log(
      //   "海外国家死亡排行",
      //   this.state.FAutoHealDeadRateRankList.deadHead.data,
      //   this.state.FAutoHealDeadRateRankList.deadHead.value
      // );
      let arrs = FAutoContinentConfirmStatis.splice(
        FAutoContinentConfirmStatis.length - 7
      );
      arrs.reverse();
      arrs[0].date = "今日较之上周日";
      // console.log('sdasdsadsa',this.state.total)
      if (this.state.total.confirm) {
        arrs[0].confirm = this.state.total.confirm;
      }
      this.state.FAutoContinentConfirmStatis = arrs;
      // console.log(this.state.FAutoContinentConfirmStatis)
      this.MyChartsSetOption8();
    });
    const result1 = await getUNRankData()
    console.log(this.state.cityUNdata)
    localStorage.setItem('UNData',JSON.stringify(result1.data.data))
    result1.data.data.forEach((item) => {
      if(item.confirmAdd === 0){
        item.confirmAdd = this.state.cityUNdata[item.name]
      }
    })
    console.log(result1.data.data)
    this.undataList = result1.data.data
    function filterCity(params) {
      let arr1 = []
      if(params === '北美洲'){
        arr1 = result1.data.data.filter((item) => {
            return item.continent === ""
        })
      }
      let arr2 = result1.data.data.filter((item) => {
        return item.continent === params
      })
      return [...arr2,...arr1]
    }
    // function name(array) {
    //   let arr = []
    //   let obj = {}
    //   arr = array.reduce((prev,item) => {
    //     obj[item.continent] ? '': obj[item.continent] = true && prev.push(item.continent)
    //     console.log(prev)
    //     return prev
    //   },[])
    //   return arr
    // }
    // console.log(name(result1.data.data))

    function filterCitys(array,array1) {
      let arr = {
        name:'null',
        confirmAdd:0,
        confirm:0,
        heal:0,
        dead:0,
        len:0,
        children:array
      }
      arr.name = array[0].continent
      array.forEach((item) => {
        if(item.confirmAdd <= 0){
          item.confirmAdd = array1[item.name]
        }
        arr.confirmAdd += item.confirmAdd
        arr.confirm += item.confirm
        arr.heal += item.heal
        arr.dead += item.dead
        arr.len++
      })
      return arr
    }
    let citydata = []
    citydata.push(filterCitys(filterCity('欧洲'),this.state.cityUNdata))
    citydata.push(filterCitys(filterCity('北美洲'),this.state.cityUNdata))
    citydata.push(filterCitys(filterCity('亚洲'),this.state.cityUNdata))
    citydata.push(filterCitys(filterCity('南美洲'),this.state.cityUNdata))
    citydata.push(filterCitys(filterCity('非洲'),this.state.cityUNdata))
    citydata.push(filterCitys(filterCity('大洋洲'),this.state.cityUNdata))
    citydata.push(filterCitys(filterCity('其他'),this.state.cityUNdata))
    this.undata = citydata
    console.log(this.undata)
  },
  mounted() {
    this.initTubiao9();
    this.initTubiao10();
    this.initTubiao11();
    this.initTubiao13();
    this.initTubiao14();
    this.initTubiao15();
    this.initTubiao16();
    this.initTubiao17();
    window.addEventListener("scroll", this.watchScroll);
  },
  beforeDestroy(){
    console.log('xh')
    window.removeEventListener("scroll", this.watchScroll)
  },
  filters:{
    filterDetail(value){
      switch (value) {
        case '刚果（金）':
        case '马尔代夫':
        case '佛得角':
        case '刚果（布）':
        case '圣马力诺':
        case '中非共和国':
        case '钻石号邮轮':
        case '毛里求斯':
        case '巴巴多斯':
        case '圣卢西亚':
        case '塞舌尔':
        case '安提瓜和巴布达':
        case '圣文森特和格林纳丁斯':
        case '格林纳达':
        case '多米尼克':
        case '斐济':
        case '老挝':
        case '马提尼克岛':
        case '东帝汶':
        case '圣基茨和尼维斯':
        case '梵蒂冈':
        case '马绍尔群岛':
          return value =''
        default:
          return value = '详情'
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.un {
  .tips {
    .times {
      padding: 4vw 0;
      line-height: 3.733vw;
      font-size: 3.2vw;
      background-color: #fff;
      color: #737373;
      p {
        font-weight: 500;
        color: #737373;
        font-size: 1em;
      }
      span {
        font-weight: 500;
        color: #222;
        font-size: 1em;
        padding-left: 1.5vw;
      }
    }
    .recentNumber {
      display: flex;
      // flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      .box {
        width: 23.867vw;
        position: relative;
        text-align: center;
        padding: 1.6vw 0 3.2vw;
        margin-right: 0.533vw;
        border-radius: 1.6vw;
      }
      .nowConfirm {
        background-color: #fff0f1;
        .num {
          color: #f23a3b;
        }
        .add {
          span {
            color: #f23a3b;
          }
        }
      }
      .confirm {
        background-color: #fff0f1;
        .num {
          color: #cc1e1e;
        }
        .add {
          span {
            color: #cc1e1e;
          }
        }
      }
      .heal {
        background-color: #f0f8f4;
        .num {
          color: #178b50;
        }
        .add {
          span {
            color: #178b50;
          }
        }
      }
      .dead {
        background-color: #f2f6f7;
        .num {
          color: #4e5a65;
        }
        .add {
          span {
            color: #4e5a65;
          }
        }
      }
      .add {
        padding-top: 1.6vw;
        color: #7c7c7c;
        font-size: 2.667vw;
        line-height: 2.667vw;
        height: 2.667vw;
        font-weight: 500;
        display: block;
        white-space: nowrap;
      }
      .num {
        font-size: 4.267vw;
        line-height: 5.867vw;
        height: 5.867vw;
        font-weight: 600;
        padding-top: 1.6vw;
      }
      .txt {
        font-size: 3.2vw;
        height: 3.2vw;
        line-height: 3.2vw;
        color: #222;
        font-weight: 500;
        margin-top: 1.6vw;
      }
    }
  }
  .chart1 {
    .chartBox {
      width: 100%;
      padding: 4vw 0;
      position: relative;
      .charts1 {
        height: 88vw;
        // width: 100vw;
        border: 1px solid #efefef;
        border-radius: 1.6vw;
      }
      .arr_l,
      .arr_r {
        width: 9.6vw;
        height: 9.6vw;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-size: 100% 100%;
        z-index: 2;
      }
      .arr_l {
        background-image: url(//mat1.gtimg.com/news/signin/v6/zhexian_left.png);
        left: -4.8vw;
      }
      .arr_r {
        background-image: url(//mat1.gtimg.com/news/signin/v6/zhelian_right.png);
        right: -4.8vw;
      }
    }
    .chartBoxBtn {
      display: flex;
      justify-content: space-between;
      .btn-right,
      .btn-left,
      .btn-center {
        display: block;
        width: 43.733vw;
        border: 1px solid #e9ebed;
        border-radius: 1.067vw;
        font-size: 3.2vw;
        line-height: 4.267vw;
        text-align: center;
        background-color: #f3f6f8;
        height: 9.867vw;
        padding-top: 1.333vw;
      }
      .active {
        background-color: #eef4ff;
        border-color: #8fb8ff;
        color: #005def;
        font-weight: 500;
      }
    }
  }
  .chart2 {
    .chartBox {
      width: 100%;
      padding: 2vw 0;
      position: relative;
      .charts1 {
        height: 60vw;
        border: 1px solid #efefef;
        border-radius: 1.6vw;
      }
      .arr_l,
      .arr_r {
        width: 9.6vw;
        height: 9.6vw;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-size: 100% 100%;
        z-index: 2;
      }
      .arr_l {
        background-image: url(//mat1.gtimg.com/news/signin/v6/zhexian_left.png);
        left: -4.8vw;
      }
      .arr_r {
        background-image: url(//mat1.gtimg.com/news/signin/v6/zhelian_right.png);
        right: -4.8vw;
      }
    }
    .chartBoxBtn {
      display: flex;
      justify-content: space-between;
      .btn-right,
      .btn-left,
      .btn-center {
        display: block;
        width: 28.733vw;
        border: 1px solid #e9ebed;
        border-radius: 1.067vw;
        font-size: 3.2vw;
        line-height: 4.267vw;
        text-align: center;
        background-color: #f3f6f8;
        height: 9.867vw;
        padding-top: 1.333vw;
      }
      .active {
        background-color: #eef4ff;
        border-color: #8fb8ff;
        color: #005def;
        font-weight: 500;
      }
    }
  }
  .chart3 {
    .chartBox {
      width: 100%;
      padding: 2vw 0;
      position: relative;
      .charts1 {
        height: 60vw;
        border: 1px solid #efefef;
        border-radius: 1.6vw;
      }
      .arr_l,
      .arr_r {
        width: 9.6vw;
        height: 9.6vw;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-size: 100% 100%;
        z-index: 2;
      }
      .arr_l {
        background-image: url(//mat1.gtimg.com/news/signin/v6/zhexian_left.png);
        left: -4.8vw;
      }
      .arr_r {
        background-image: url(//mat1.gtimg.com/news/signin/v6/zhelian_right.png);
        right: -4.8vw;
      }
    }
    .chartBoxBtn {
      display: flex;
      justify-content: space-between;
      .btn-right,
      .btn-left,
      .btn-center {
        display: block;
        width: 21vw;
        border: 1px solid #e9ebed;
        border-radius: 1.067vw;
        font-size: 3.2vw;
        line-height: 4.267vw;
        text-align: center;
        background-color: #f3f6f8;
        height: 9.867vw;
        padding-top: 1.333vw;
      }
      .active {
        background-color: #eef4ff;
        border-color: #8fb8ff;
        color: #005def;
        font-weight: 500;
      }
    }
  }
  .chart4 {
    .chartBox {
      width: 100%;
      padding: 2vw 0;
      position: relative;
      .charts1 {
        height: 78vw;
        border: 1px solid #efefef;
        border-radius: 1.6vw;
      }
      .arr_l,
      .arr_r {
        width: 9.6vw;
        height: 9.6vw;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-size: 100% 100%;
        z-index: 2;
      }
      .arr_l {
        background-image: url(//mat1.gtimg.com/news/signin/v6/zhexian_left.png);
        left: -4.8vw;
      }
      .arr_r {
        background-image: url(//mat1.gtimg.com/news/signin/v6/zhelian_right.png);
        right: -4.8vw;
      }
    }
    .chartBoxBtn {
      display: flex;
      justify-content: space-between;
      .btn-right,
      .btn-left,
      .btn-center {
        display: block;
        width: 21vw;
        border: 1px solid #e9ebed;
        border-radius: 1.067vw;
        font-size: 3.2vw;
        line-height: 4.267vw;
        text-align: center;
        background-color: #f3f6f8;
        height: 9.867vw;
        padding-top: 1.333vw;
      }
      .active {
        background-color: #eef4ff;
        border-color: #8fb8ff;
        color: #005def;
        font-weight: 500;
      }
    }
  }
  .chart5 {
    margin: 3vw 0;
    height: 148vw;
    border: 1px solid #efefef;
    border-radius: 1.6vw;
    .mycharts {
      height: 78vw;
    }
    .title {
      box-sizing: border-box;
      padding: 0 0 0 5.333vw;
      height: 4.8vw;
      line-height: normal;
      color: #222;
      font-size: 3.733vw;
      font-weight: 700;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .table {
      margin: 3.2vw 3.2vw 0;
      .item {
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        padding: 0 1.333vw;
        display: flex;
        justify-content: space-between;
        font-size: 3.2vw;
        align-items: center;
        text-align: left;
        line-height: 7.467vw;
        &:first-child {
          background-color: #f5f5f5;
          border: 0;
          line-height: 5.867vw;
          font-size: 2.667vw;
          p:last-child {
            font-weight: 400;
          }
        }
        &:nth-child(2) {
          background-color: #e8effc;
          border-bottom: 0;
        }
        p {
          width: 32vw;
          &:first-child {
            text-align: left;
            width: 36.8vw;
          }
          &:last-child {
            font-weight: 600;
            text-align: right;
            width: 16vw;
          }
        }
      }
    }
  }
  .tables {
    margin:2vw 0;
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
      position: relative;
      margin:3vw 0;
      .title {
        display: inline-block;
        font-size: 4.267vw;
      }
      .switchBtns {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        justify-content: flex-start;
        p {
          font-size: 3.2vw;
          line-height: normal;
          padding: 0.8vw 2.133vw;
          border: 1px solid #efefef;
          position: relative;
          background-color: #fff;
          margin-right: -1px;
          font-weight: 400;
          &:first-child {
            border-radius: 1.6vw 0 0 1.6vw;
          }
          &:last-child {
            border-radius: 0 1.6vw 1.6vw 0;
          }
        }
        .current {
          border-color: rgba(1, 93, 254, 0.14);
          background-color: #eef4ff;
          color: #005dff;
          z-index: 2;
        }
      }
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
              background-color: #fcf2e8;
              color: #ff5d00;
              width: 15.467vw;
            }
            &:nth-child(3) {
              background-color: #fdeeee;
              color: #f55253;
              width: 15.467vw;
            }
            &:nth-child(4) {
              background-color: #e9f7ec;
              color: #178b50;
              width: 12vw;
            }
            &:nth-child(5) {
              background-color: #f3f6f8;
              color: #4e5a65;
              width: 12vw;
            }
            &:last-child {
              background-color: #f5f5f5;
              border-right: 0;
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
            font-weight: 400;
            line-height: 4.8vw;
            &:first-child {
              background-color: #fff;
              width: 17.4vw;
            }
          }

          td {
            border-bottom: 1px solid #f5f5f5;
            text-align: center;
            position: relative;

            &:nth-child(2),
            &:nth-child(3) {
              width: 14.467vw;
            }
            &:nth-child(4),
            &:nth-child(5) {
              width: 13vw;
            }
          }
          .areaBox {
            font-size: 3.2vw;
            font-weight: 600;
            background-color: #f5f5f5;
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
            .area{
                background-color: #f5f5f5;
                border-top: 1px solid #fff;
                text-align: right;
            }
            .area span {
              position: relative;
            }
            .area span::before {
              content: ".";
              font-size: 0;
              line-height: 0;
              display: block;
              position: absolute;
              width: 2.133vw;
              height: 1.6vw;
              left: -2.0vw;
              top: 50%;
              -webkit-transform: translateY(-50%);
              transform: translateY(-50%);
              background: url(//mat1.gtimg.com/news/images/inews/2020/feiyan/18/img/area_down.png);
              background-size: 100% 100%;
            }
            .area span::after {
              content: ".";
              font-size: 0;
              line-height: 0;
              display: block;
              position: absolute;
              width: 0;
              height: 0;
              background: url(//mat1.gtimg.com/news/images/inews/2020/feiyan/18/img/area_top.png);
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
        tbody.current tr.city {
          display: table-row !important;
        }
        tbody tr.tips td {
          text-align: left;
          line-height: 4.8vw;
          color: #737373;
          padding: 1.333vw 4.533vw;
        }
        tbody.current tr.tips {
          display: table-row !important;
        }
        tbody.current .areaBox .area span::before {
          background-image: url(//mat1.gtimg.com/news/images/inews/2020/feiyan/18/img/area_top.png);
        }
      }
    }
  }
  .tableHead {
    display: block !important;
    position: fixed;
    top: 0;
    z-index: 99;
  }
  .heid {
    display: none;
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
          background-color: #fcf2e8;
          color: #ff5d00;
          width: 15.467vw;
        }
        &:nth-child(3) {
          background-color: #fdeeee;
          color: #f55253;
          width: 15.467vw;
        }
        &:nth-child(4) {
          background-color: #e9f7ec;
          color: #178b50;
          width: 12vw;
        }
        &:nth-child(5) {
          background-color: #f3f6f8;
          color: #4e5a65;
          width: 12vw;
        }
        &:last-child {
          background-color: #f5f5f5;
          border-right: 0;
          width: 15vw;
        }
      }
    }
  }
  .tableHead {
    display: block !important;
    position: fixed;
    top: 0;
    z-index: 99;
  }
}
</style>
