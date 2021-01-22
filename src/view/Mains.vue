<template>
  <div class="Main" ref="tj">
    <Banner :Datafrom="tabType === 1?'国家及各地卫健委每日信息发布':'WTO和霍普金斯大学网站'"/>
    <div class="bodys" @click="changnext">
      <div
        :class="[{ current: tabType === 1 }, 'tabs']"
        data-id="1"
        @click="changTabHandler"
      >
        国内疫情
      </div>
      <div
        :class="[{ current: tabType === 2 }, 'tabs']"
        data-id="2"
        @click="changTabHandler"
      >
        国外疫情
      </div>
    </div>
    <div class="concent" ref="zj">
      <div v-if="tabType === 1" :key="1" ref="fj">
        <div class="enterIndex">
          <div class="cxcx item" @click="jumpToInfo('sftravel')">
            <span class="text">出行政策查询</span>
          </div>
          <p class="line"></p>
          <div class="bhgj item" @click="jumpToInfo('yimiao')">
            <span class="text">疫苗进度查询</span>
          </div>
          <!-- <div class="ymxx item">
            <span class="text">全国春节出行政策查询</span>
          </div> -->
        </div>
        <div class="timer" v-if="state.ChinaCityAll.length !== 0">
          <div class="timeNum">
            <em>统计截至：</em>
            <span class="timestyle">{{
              state.ChinaCityAll.lastUpdateTime
            }}</span>
            更新于<span class="timestyle">{{
              state.ChinaCityAll.lastUpdateTime | TimeToSJC
            }}</span
            >前
          </div>
        </div>
        <div class="recentNumber" v-if="state.ChinaCityAll.length !== 0">
          <div class="table heal">
            <div class="add">
              较昨日<span>{{
                state.ChinaCityAll.chinaAdd.localConfirm | filterNumber
              }}</span>
            </div>
            <div class="number">{{ state.ChinaCityAll.chinaTotal.localConfirm}}</div>
            <div class="text">本土累计确诊</div>
          </div>
          <div class="table nowConfirm">
            <div class="add">
              较昨日<span>{{
                state.ChinaCityAll.chinaAdd.nowConfirm | filterNumber
              }}</span>
            </div>
            <div class="number">
              {{ state.ChinaCityAll.chinaTotal.nowConfirm }}
            </div>
            <div class="text">现有确诊</div>
          </div>
          <div class="table confirm">
            <div class="add">
              较昨日<span>{{
                state.ChinaCityAll.chinaAdd.confirm | filterNumber
              }}</span>
            </div>
            <div class="number">
              {{ state.ChinaCityAll.chinaTotal.confirm }}
            </div>
            <div class="text">累计确诊</div>
          </div>
          <div class="table nowSevere">
            <div class="add">
              较昨日<span>{{
                state.ChinaCityAll.chinaAdd.noInfect | filterNumber
              }}</span>
            </div>
            <div class="number">
              {{ state.ChinaCityAll.chinaTotal.noInfect }}
            </div>
            <div class="text">无症状感染者</div>
          </div>
          <div class="table nowImport">
            <div class="add">
              较昨日<span>{{
                state.ChinaCityAll.chinaAdd.importedCase | filterNumber
              }}</span>
            </div>
            <div class="number">
              {{ state.ChinaCityAll.chinaTotal.importedCase }}
            </div>
            <div class="text">境外输入</div>
          </div>
          <div class="table dead">
            <div class="add">
              较昨日<span>{{
                state.ChinaCityAll.chinaAdd.dead | filterNumber
              }}</span>
            </div>
            <div class="number">{{ state.ChinaCityAll.chinaTotal.dead }}</div>
            <div class="text">累计死亡</div>
          </div>
        </div>
        <div class="chinaNow">
          <div>
            <div class="h2">
              <span>近期31省区市本土病例</span>
              <span class="fxdq" @click="centerShow = true"></span>
            </div>
            <table>
              <thead>
              <tr>
                <td>省份</td>
                <td>地区</td>
                <td>现有确诊</td>
                <td>新增</td>
                <td>地区风险</td>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="(item, i) in state.ChinaCityNow"
                  :key="i"
                  @click="jumpToDetail($event, item.province)"
                  :class="[{hidden: i > 8}]"
                  ref="hiddenTable"
              >
                <th>{{ item.province }}</th>
                <td>{{ item.city }}</td>
                <td>{{ item.nowConfirm }}</td>
                <td :class="[{ red: item.confirmAdd !== 0 }]">
                  {{ item.confirmAdd | filterNumber }}
                </td>
                <td>{{ item.grade }}</td>
              </tr>
              </tbody>
            </table>
            <div v-if="state.ChinaCityNow.length > 8" class="exp-More" @click="expListHandler" ref="more">
              <span>展开更多</span>
            </div>
          </div>
        </div>
        <div class="echarts1">
          <div class="btnBox">
            <div
              :class="[{ btnActive: btntype === 1 }, 'btn']"
              @click="changBtnHandler"
              data-id="1"
            >
              现有确诊
            </div>
            <div
              :class="[{ btnActive: btntype === 2 }, 'btn']"
              @click="changBtnHandler"
              data-id="2"
            >
              累计确诊
            </div>
          </div>
          <div style="min-height: 69vw; width: 100%" ref="myEchart"></div>
        </div>
        <div class="chartsBox">
          <Swiper
            :autoPlay="false"
            :showIndicator="false"
            ref="swiper"
            @transtionend="getNum"
          >
            <Slide>
              <div class="echarts2">
                <div
                  style="min-height: 60vw; width: 100%"
                  ref="myEchart1"
                ></div>
              </div>
              <div
                class="ordeText"
                v-if="
                  this.state.tubiao2.CityAsymptomaticInfectionLast.lenght !== 0
                "
              >
                其它现有无症状感染者分布：
                <span
                  class="text"
                  v-for="(item, index) in this.state.tubiao2
                    .CityAsymptomaticInfectionLast"
                  :key="index"
                  >{{ item.province }}{{ item.confirm }}例</span
                >
              </div>
            </Slide>
            <Slide>
              <div class="echarts3">
                <div
                  style="min-height: 75vw; width: 100%"
                  ref="myEchart2"
                ></div>
              </div>
            </Slide>
          </Swiper>
          <div class="SwiperbtnBOX">
            <div
              class="Swiperbtn"
              :class="[{ active: tubiaoIndex === 0 }]"
              data-id="1"
              @click="changeNextHandler"
            >
              现有无症状感染者
            </div>
            <div
              class="Swiperbtn"
              :class="[{ active: tubiaoIndex === 1 }]"
              data-id="0"
              @click="changeNextHandler"
            >
              新增无症状感染者
            </div>
          </div>
          <div
            class="chartsbtn-right"
            v-show="tubiaoIndex === 0"
            data-id="0"
            @click="changeNextHandler"
          ></div>
          <div
            class="chartsbtn-left"
            data-id="1"
            v-show="tubiaoIndex === 1"
            @click="changeNextHandler"
          ></div>
        </div>
        <div class="cityYQ">
          <div class="title">
            <em>城市疫情</em>
            累计确诊城市
            <span>{{ cityStatis.confirm }}</span>
          </div>
          <div class="content">
            <div class="zero item">
              <p class="num">{{ cityStatis.zeroNowConfirm }}</p>
              <p class="name">零病例城市</p>
            </div>
            <div class="progress-bar">
              <p :style="getWidth"></p>
            </div>
            <div class="has item">
              <p class="num">{{ cityStatis.notZeroNowConfirm }}</p>
              <p class="name">有病例城市</p>
            </div>
          </div>
          <div class="footer">
            全国累计确诊患者分布于{{ cityStatis.confirm }}个城市，目前已有{{
              cityStatis.zeroNowConfirm
            }}个城市实现现有确诊“清零”，本统计不包括境外输入病例。
          </div>
        </div>
        <div class="shuruYQ">
          <Swiper
            :autoPlay="false"
            :showIndicator="false"
            @transtionend="getNumber"
            ref="swiper1"
          >
            <Slide>
              <div class="echarts">
                <div
                  style="min-height: 55vw; width: 100%"
                  ref="myEchart3"
                ></div>
              </div>
            </Slide>
            <Slide>
              <div class="echarts">
                <div
                  style="min-height: 55vw; width: 100%"
                  ref="myEchart4"
                ></div>
              </div>
            </Slide>
            <Slide>
              <div class="echarts">
                <div
                  style="min-height: 55vw; width: 100%"
                  ref="myEchart5"
                ></div>
              </div>
            </Slide>
          </Swiper>
          <div class="btns">
            <div
              class="btn"
              :class="[{ active: tubiaoIndex1 === 0 }]"
              data-id="0"
              @click="changeSwiperHandler"
            >
              境外输入<br />省市TOP10
            </div>
            <div
              class="btn"
              :class="[{ active: tubiaoIndex1 === 1 }]"
              data-id="1"
              @click="changeSwiperHandler"
            >
              境外输入<br />新增趋势
            </div>
            <div
              class="btn"
              :class="[{ active: tubiaoIndex1 === 2 }]"
              data-id="2"
              @click="changeSwiperHandler"
            >
              境外输入<br />累计趋势
            </div>
          </div>
          <div
            class="pagePrev"
            v-show="tubiaoIndex1 !== 0"
            @click="changeSWiperPrevHandle1"
          ></div>
          <div
            class="pageNext"
            v-show="tubiaoIndex1 !== 2"
            @click="changeSWiperNextHandle1"
          ></div>
        </div>
        <div class="shuruYQ">
          <Swiper
            :autoPlay="false"
            :showIndicator="false"
            @transtionend="getNumber1"
            ref="swiper2"
          >
            <Slide>
              <div class="echarts">
                <div
                  style="min-height: 55vw; width: 100%"
                  ref="myEchart6"
                ></div>
              </div>
            </Slide>
            <Slide>
              <div class="echarts">
                <div
                  style="min-height: 55vw; width: 100%"
                  ref="myEchart7"
                ></div>
              </div>
            </Slide>
            <Slide>
              <div class="echarts">
                <div
                  style="min-height: 55vw; width: 100%"
                  ref="myEchart8"
                ></div>
              </div>
            </Slide>
            <Slide>
              <div class="echarts">
                <div
                  style="min-height: 55vw; width: 100%"
                  ref="myEchart9"
                ></div>
              </div>
            </Slide>
          </Swiper>
          <div class="btns">
            <div
              class="btn"
              :class="[{ active: tubiaoIndex2 === 0 }]"
              data-id="0"
              @click="changeSwiper3Handler"
            >
              全国现有<br />确诊趋势
            </div>
            <div
              class="btn"
              :class="[{ active: tubiaoIndex2 === 1 }]"
              data-id="1"
              @click="changeSwiper3Handler"
            >
              全国疫情<br />新增趋势
            </div>
            <div
              class="btn"
              :class="[{ active: tubiaoIndex2 === 2 }]"
              data-id="2"
              @click="changeSwiper3Handler"
            >
              全国疫情<br />累计趋势
            </div>
            <div
              class="btn"
              :class="[{ active: tubiaoIndex2 === 3 }]"
              data-id="3"
              @click="changeSwiper3Handler"
            >
              治愈率<br />病死率
            </div>
          </div>
          <div
            class="pagePrev"
            v-show="tubiaoIndex2 !== 0"
            @click="changeSWiperPrevHandle3"
          ></div>
          <div
            class="pageNext"
            v-show="tubiaoIndex2 !== 3"
            @click="changeSWiperNextHandle3"
          ></div>
        </div>
        <div class="heid" :class="navBarFixed === true ? 'tableHead' : ''">
          <table>
            <thead>
              <tr>
                <th>地区</th>
                <th>现有确诊</th>
                <th>累计确诊</th>
                <th>治愈</th>
                <th>死亡</th>
                <th>疫情</th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="tables">
          <div class="title-head">
            <span class="title">中国疫情（包括港澳台）</span>
          </div>
          <div class="tips">7:00-10:00为更新高峰期，数据如有滞后请谅解。</div>
          <div class="listWraper" ref="piediv">
            <table>
              <thead>
                <tr>
                  <th>地区</th>
                  <th>现有确诊</th>
                  <th>累计确诊</th>
                  <th>治愈</th>
                  <th>死亡</th>
                  <th>疫情</th>
                </tr>
              </thead>
            </table>
            <table>
              <tbody class="" v-for="(item, index) in state.List" :key="index">
                <tr class="areaBox" @click="changeListType">
                  <th class="area">
                    <span>{{ item.name }}</span>
                  </th>
                  <td>
                    <p>{{ item.total.nowConfirm }}</p>
                  </td>
                  <td>
                    <p>{{ item.total.confirm }}</p>
                  </td>
                  <td>
                    <p>{{ item.total.heal }}</p>
                  </td>
                  <td>
                    <p>{{ item.total.dead }}</p>
                  </td>
                  <td
                    style="color: blue"
                    @click="jumpToDetail($event, item.name)"
                  >
                    {{
                      item.name === "香港" ||
                      item.name === "台湾" ||
                      item.name === "澳门"
                        ? ""
                        : "详情"
                    }}
                  </td>
                </tr>
                <tr class="city" v-for="(items, i) in item.children" :key="i">
                  <th>{{ items.name }}</th>
                  <td>{{ items.total.nowConfirm }}</td>
                  <td>{{ items.total.confirm }}</td>
                  <td>{{ items.total.heal }}</td>
                  <td>{{ items.total.dead }}</td>
                </tr>
                <tr class="tips" v-if="item.today.tip">
                  <td colspan="6">
                    {{ item.today.tip }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="tips">
          <span>数据来源：各地卫健委每日公开数据</span>
          <div>©2020 DSQH</div>
        </div>
      </div>
      <div v-else :key="2">
        <International />
      </div>
    </div>
    <SlimPopup
      :show.sync="centerShow"
      :prevent-popup-touchmove="false"
      :hideOnMaskClick="true"
      :preventBodyScroll="true"
      :popup-class="['popup scroll']">
      <div class="popupbox">
        <div class="title">
            <span>全国疫情中高风险名单</span>
        </div>
        <div class="concents">
          <p class="top">高风险地区 {{hightLen}}个</p>
          <p v-for="(item,index) in state.riskarea.high" :key="index">
            {{item.area}}
          </p>
          <p class="top">中风险地区 {{midLen}}个</p>
          <p v-for="(item) in state.riskarea.mid" :key="item.area">
            {{item.area}}
          </p>
        </div>
        <div class="footer">
          <span>数据来源：微信小程序 “国务院客户端”</span>
        </div>
      </div>
    </SlimPopup>
    <div v-if="centerShow" class="close-btn" @click="centerShow = false"></div>
  </div>
</template>

<script>
import Banner from "../components/banner.vue";
import International from "../components/International.vue";
import SlimPopup from 'vue-slim-popup'

import { Swiper, Slide } from "vue-swiper-component";
import {
  getChinaData,
  getChinaCityNow,
  getAsymptomaticInfection,
  getChinaCityData,
  getRiskarea
} from "../api/request.js";
import echarts from "echarts";
import "../../node_modules/echarts/map/js/china.js"; // 引入中国地图数据

export default {
  name: "Mains",
  components: {
    International,
    Banner,
    Swiper,
    Slide,
    SlimPopup,
  },
  data() {
    return {
      hooktips:null,
      hightLen:0,
      midLen:0,
      centerShow:false,
      tabType: 1,
      btntype: 1,
      tubiaoIndex: 0,
      tubiaoIndex1: 0,
      tubiaoIndex2: 0,
      getWidth: {
        width: "0%",
      },
      navBarFixed: false,
      cityStatis: {
        confirm: 0,
        notZeroNowConfirm: 0,
        zeroNowConfirm: 0,
      },
      state: {
        riskarea:{
          high:[],
          mid:[]
        },
        ChinaCityNow: [],
        ChinaCityAll: [],
        totalConfirm: 0,
        CityNowConfirm: [],
        CityConfirm: [],
        tubiao2: {
          CityAsymptomaticInfection: [],
          CityAsymptomaticInfectionAll: [],
          CityAsymptomaticInfectionLast: [],
          CityName: [],
          CityValue: [],
        },
        tubiao3: {
          NewCityAsymptomaticInfection: [],
          CityName: [],
          CityValue: [],
        },
        tubiao4: {
          jingwaishuruTOP10: {
            cityname: [],
            cityvalue: [],
          },
        },
        tubiao5: {
          jingwaishuruNew: {
            dataname: [],
            datavalue: [],
          },
        },
        tubiao6: {
          jignwaishuruTotal: {
            dataname: [],
            datavalue: [],
          },
        },
        tubiao7: {
          data: [],
          nowConfirm: [],
        },
        tubiao8: {
          data: [],
          confirm: [],
          suspect: [],
        },
        tubiao9: {
          data: [],
          confirm: [],
          heal: [],
          dead: [],
        },
        tubiao10: {
          data: [],
          healRate: [],
          deadRate: [],
        },
        List: [],
      },
      myChart: null,
      myChart1: null,
      myChart2: null,
      myChart3: null,
      myChart4: null,
      myChart5: null,
      myChart6: null,
      myChart7: null,
      myChart8: null,
      myChart9: null,
      data: [
        { name: "四川", value: "1000" },
        { name: "湖北", value: "9999" },
        { name: "新疆", value: "500" },
        { name: "西藏", value: "21" },
      ],
    };
  },
  async created() {
    getChinaData().then((res) => {
      console.log("国内各城市数据", JSON.parse(res.data.data));
      this.state.ChinaCityAll = JSON.parse(res.data.data);
      localStorage.setItem('array',res.data.data)
      this.state.ChinaCityAll.areaTree[0].children.forEach((item) => {
        this.state.CityNowConfirm.push({
          value: item.total.nowConfirm,
          name: item.name,
        });
        this.state.CityConfirm.push({
          value: item.total.confirm,
          name: item.name,
        });
      });
      // console.log("国内城市现有确诊数据：", this.state.CityNowConfirm);
      // console.log("国内城市累计确诊数据：", this.state.CityConfirm);
      // this.state.CityNowConfirm.forEach((item) => {
      //   item.value = item.total.nowConfirm;
      // });
      this.myChart.setOption({
        series: [
          {
            data: this.state.CityNowConfirm,
          },
        ],
      });
      this.state.List = this.state.ChinaCityAll.areaTree[0].children;
      console.log(this.state.List);
      let children = [];
      //过滤出只有境外输入的省
      this.state.ChinaCityAll.areaTree[0].children.forEach((item) => {
        item.children.forEach((items) => {
          if (items.name === "境外输入") {
            children.push({
              name: item.name,
              value: items.total.confirm,
            });
          }
        });
      });
      //按照value排序
      children.sort((a, b) => {
        return b.value - a.value;
      });
      // console.log(children)
      //取出数组前十的数据放入新数组
      for (let i = 0; i < 10; i++) {
        this.state.tubiao4.jingwaishuruTOP10.cityname.push(children[i].name);
        this.state.tubiao4.jingwaishuruTOP10.cityvalue.push(children[i].value);
      }
      // console.log('图表4数据：',this.state.tubiao4.jingwaishuruTOP10.cityname,this.state.tubiao4.jingwaishuruTOP10.cityvalue)
      this.myChart3.setOption({
        xAxis: [
          {
            data: this.state.tubiao4.jingwaishuruTOP10.cityname,
          },
        ],
        series: [
          {
            data: this.state.tubiao4.jingwaishuruTOP10.cityvalue,
          },
        ],
      });
    });
    getChinaCityNow().then((res) => {
      console.log("国内风险地区", res.data.data.statisGradeCityDetail);
      this.state.ChinaCityNow = res.data.data.statisGradeCityDetail;
      this.state.ChinaCityNow.forEach((item) => {
        this.state.totalConfirm += item.nowConfirm;
      });
    });
    getAsymptomaticInfection().then((res) => {
      // console.log("图表二数据", res.data.data.asymptomaticProvince);
      this.state.tubiao2.CityAsymptomaticInfection =
        res.data.data.asymptomaticProvince.confirm;
      //排序从大到小
      this.state.tubiao2.CityAsymptomaticInfection.sort((a, b) => {
        return b.confirm - a.confirm;
      });
      this.state.tubiao2.CityAsymptomaticInfectionAll = this.state.tubiao2.CityAsymptomaticInfection;
      //分割前数组前十
      let arr = this.splitArr(this.state.tubiao2.CityAsymptomaticInfection, 10);
      //push前先清空
      this.state.tubiao2.CityAsymptomaticInfection = [];
      //push数据给图表2用
      arr[0].forEach((item) => {
        this.state.tubiao2.CityName.push(item.province);
        this.state.tubiao2.CityValue.push(item.confirm);
      });
      this.state.tubiao2.CityAsymptomaticInfectionLast = arr[1];
      //push数据给图表3用
      this.state.tubiao2.CityAsymptomaticInfectionAll.sort((a, b) => {
        return b.increase - a.increase;
      });
      this.state.tubiao2.CityAsymptomaticInfectionAll.forEach((item) => {
        if (item.increase !== 0) {
          this.state.tubiao3.CityName.push(item.province);
          this.state.tubiao3.CityValue.push(item.increase);
        }
      });
      // console.log(
      //   "取出来的新增无症状感染者（图表3用）",
      //   this.state.tubiao2.CityAsymptomaticInfectionAll
      // );
      // console.log('完整排过序的数组',this.state.tubiao2.CityAsymptomaticInfectionAll)
      // console.log(
      //   "取出来的新增无症状感染者（图表3用）",
      //   this.state.tubiao3.CityName,
      //   this.state.tubiao3.CityValue
      // );
      // console.log(
      //   "取出来的现有无症状感染者（图表2用）",
      //   this.state.tubiao2.CityName,
      //   this.state.tubiao2.CityValue
      // );
      // console.log(
      //   "剩下的现有无症状感染者",
      //   this.state.tubiao2.CityAsymptomaticInfectionLast
      // );
      this.myChart1.setOption({
        xAxis: [
          {
            data: this.state.tubiao2.CityName,
          },
        ],
        series: [
          {
            data: this.state.tubiao2.CityValue,
          },
        ],
      });
      this.myChart2.setOption({
        xAxis: [
          {
            data: this.state.tubiao3.CityName,
          },
        ],
        series: [
          {
            data: this.state.tubiao3.CityValue,
          },
        ],
      });
    });
    getChinaCityData().then((res) => {
      console.log("境外输入数据：", res.data.data);
      const { cityStatis, chinaDayAddList, chinaDayList,provinceCompare} = res.data.data;
      this.cityStatis = cityStatis;
      localStorage.setItem("provinceCompare",JSON.stringify(provinceCompare))
      //计算进度条宽度
      this.getWidth.width =
        ((cityStatis.zeroNowConfirm / cityStatis.confirm) * 100).toFixed(4) +
        "%";
      chinaDayAddList.forEach((item, index) => {
        if (index > 40) {
          this.state.tubiao5.jingwaishuruNew.dataname.push(
            item.date.replace(".", "-")
          );
          this.state.tubiao5.jingwaishuruNew.datavalue.push(item.importedCase);
        }
        this.state.tubiao8.data.push(item.date.replace(".", "-"));
        this.state.tubiao8.confirm.push(item.confirm);
        this.state.tubiao8.suspect.push(item.suspect);
      });
      chinaDayList.forEach((item, index) => {
        if (index > 40) {
          this.state.tubiao6.jignwaishuruTotal.dataname.push(
            item.date.replace(".", "-")
          );
          this.state.tubiao6.jignwaishuruTotal.datavalue.push(
            item.importedCase
          );
        }
        this.state.tubiao7.data.push(item.date.replace(".", "-"));
        this.state.tubiao7.nowConfirm.push(item.nowConfirm);
        this.state.tubiao9.data.push(item.date.replace(".", "-"));
        this.state.tubiao9.confirm.push(item.confirm);
        this.state.tubiao9.heal.push(item.heal);
        this.state.tubiao9.dead.push(item.dead);
        this.state.tubiao10.data.push(item.date.replace(".", "-"));
        this.state.tubiao10.deadRate.push(item.deadRate);
        this.state.tubiao10.healRate.push(item.healRate);
      });
      // console.log('图表7数据：',this.state.tubiao7.data,this.state.tubiao7.nowConfirm)
      // console.log('图表8数据：',this.state.tubiao8.data,this.state.tubiao8.confirm,this.state.tubiao8.suspect)
      // console.log('图表9数据：',this.state.tubiao9.data,this.state.tubiao9.confirm,this.state.tubiao9.heal,this.state.tubiao9.dead)
      // console.log('图表10数据：',this.state.tubiao10.data,this.state.tubiao10.deadRate,this.state.tubiao10.healRate)
      // console.log('图表5数据',this.state.tubiao5.jingwaishuruNew.dataname,this.state.tubiao5.jingwaishuruNew.datavalue)
      // console.log('图表6数据',this.state.tubiao6.jignwaishuruTotal.dataname,this.state.tubiao6.jignwaishuruTotal.datavalue)
          this.myChart4.setOption({
            series: [
              {
                data: this.state.tubiao5.jingwaishuruNew.datavalue,
              },
            ],
            xAxis: [
              {
                data: this.state.tubiao5.jingwaishuruNew.dataname,
              },
            ],
          });
          this.myChart5.setOption({
            series: [
              {
                data: this.state.tubiao6.jignwaishuruTotal.datavalue,
              },
            ],
            xAxis: [
              {
                data: this.state.tubiao6.jignwaishuruTotal.dataname,
              },
            ],
          });
          this.myChart6.setOption({
            series: [
              {
                data: this.state.tubiao7.nowConfirm,
              },
            ],
            xAxis: [
              {
                data: this.state.tubiao7.data,
              },
            ],
          });
          this.myChart7.setOption({
            color: ["rgba(222, 45, 39, 0.76)", "rgba(244, 233, 24, 0.8)"],
            legend: {
              data: ["新增确诊", "新增疑似"],
              right: "8%",
              top: "5%",
              orient: "horizontal",
              icon: "rect",
              itemHeight: 10,
              itemWidth: 10,
              textStyle: {
                fontSize: 9,
                color: "rgba(101, 98, 98, 1)",
              },
            },
            series: [
              {
                type: "line",
                name: "新增确诊",
                data: this.state.tubiao8.confirm,
                lineStyle: {
                  color: "rgba(222, 45, 39, 0.76)",
                },
              },
              {
                type: "line",
                name: "新增疑似",
                data: this.state.tubiao8.suspect,
                lineStyle: {
                  color: "rgba(244, 233, 24, 0.8)",
                },
              },
            ],
            xAxis: [
              {
                data: this.state.tubiao8.data,
              },
            ],
          });
          this.myChart8.setOption({
            color: [
              "rgba(245, 17, 17, 1)",
              "rgba(33, 231, 30, 1)",
              "rgba(21, 21, 21, 1)",
            ],
            legend: {
              data: ["累计确诊", "累计治愈", "累计死亡"],
              right: "8%",
              top: "11%",
              orient: "horizontal",
              icon: "rect",
              itemHeight: 10,
              itemWidth: 10,
              textStyle: {
                fontSize: 9,
                color: "rgba(101, 98, 98, 1)",
              },
            },
            series: [
              {
                type: "line",
                name: "累计确诊",
                data: this.state.tubiao9.confirm,
                lineStyle: {
                  color: "rgba(245, 17, 17, 1)",
                },
              },
              {
                type: "line",
                name: "累计治愈",
                data: this.state.tubiao9.heal,
                lineStyle: {
                  color: "rgba(33, 231, 30, 1)",
                },
              },
              {
                type: "line",
                name: "累计死亡",
                data: this.state.tubiao9.dead,
                lineStyle: {
                  color: "rgba(21, 21, 21, 1)",
                },
              },
            ],
            xAxis: [
              {
                data: this.state.tubiao9.data,
              },
            ],
          });
          this.myChart9.setOption({
            color: ["rgba(33, 231, 30, 1)", "rgba(21, 21, 21, 1)"],
            tooltip: {
              // trigger: "item",
              triggerOn: "click",
              // formatter: '{b}<br />{a}：{c}%<br />{a1}：{c1}%'
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
              right: "8%",
              top: "8%",
              orient: "horizontal",
              icon: "rect",
              itemHeight: 10,
              itemWidth: 10,
              textStyle: {
                fontSize: 9,
                color: "rgba(101, 98, 98, 1)",
              },
            },
            series: [
              {
                type: "line",
                name: "治愈率",
                data: this.state.tubiao10.healRate,
                lineStyle: {
                  color: "rgba(33, 231, 30, 1)",
                },
              },
              {
                type: "line",
                name: "病死率",
                data: this.state.tubiao10.deadRate,
                lineStyle: {
                  color: "rgba(21, 21, 21, 1)",
                },
              },
            ],
            xAxis: [
              {
                data: this.state.tubiao10.data,
              },
            ],
          });
        
    
    });
    try{
      const result = await this.GetRiskareas()
      const res = result.data.data
        res.forEach((item) => {
          if(item.type === '2'){
            this.state.riskarea.high.push(item)
          }
          if(item.type === '1'){
            this.state.riskarea.mid.push(item)
          }
        })
      this.hightLen = this.state.riskarea.high.length
      this.midLen = this.state.riskarea.mid.length

      console.log('gao',this.state.riskarea.high)
      console.log('low',this.state.riskarea.mid)
    } catch(err){
      console.log('error:',err)
    }
  },
  mounted() {
    this.chinaConfigure();
    this.initTubiao2();
    this.initTubiao3();
    this.initTubiao4();
    this.initTubiao5();
    this.initTubiao6();
    this.initTubiao7();
    this.initTubiao8();
    this.initTubiao9();
    this.initTubiao10();
    window.addEventListener("scroll", this.debounce(this.watchScroll, 15));
  },
  methods: {
    jumpToInfo(value){
      console.log(value);
      let page = value === 'sftravel' ? '/sftravel' : 'yimiao'
      this.$router.push({ path: page})
    },
    expListHandler(){
      this.$refs.hiddenTable.forEach((item,index) => {
        if(index > 8) {
          item.classList.remove("hidden");
        }
      })
      this.$refs.more.classList.add('hidden')
    },
    GetRiskareas(){
      return new Promise((resolve,reject) => {
        getRiskarea().then((res) => {
        resolve(res)
      }).catch(err => reject(err))})
    },
    changnext() {
      // console.log("‘我被点击了");
      // console.log(this.tabType);
      if (this.tabType === 1) {
        this.$nextTick(() => {
          this.chinaConfigure();
          this.initTubiao2();
          this.initTubiao3();
          this.initTubiao4();
          this.initTubiao5();
          this.initTubiao6();
          this.initTubiao7();
          this.initTubiao8();
          this.initTubiao9();
          this.initTubiao10();
          window.addEventListener(
            "scroll",
            this.debounce(this.watchScroll, 15)
          );
          this.myChart.setOption({
            series: [
              {
                data: this.state.CityNowConfirm,
              },
            ],
          });
          this.myChart1.setOption({
            xAxis: [
              {
                data: this.state.tubiao2.CityName,
              },
            ],
            series: [
              {
                data: this.state.tubiao2.CityValue,
              },
            ],
          });
          this.myChart2.setOption({
            xAxis: [
              {
                data: this.state.tubiao3.CityName,
              },
            ],
            series: [
              {
                data: this.state.tubiao3.CityValue,
              },
            ],
          });
          this.myChart3.setOption({
            xAxis: [
              {
                data: this.state.tubiao4.jingwaishuruTOP10.cityname,
              },
            ],
            series: [
              {
                data: this.state.tubiao4.jingwaishuruTOP10.cityvalue,
              },
            ],
          });
          this.myChart4.setOption({
            series: [
              {
                data: this.state.tubiao5.jingwaishuruNew.datavalue,
              },
            ],
            xAxis: [
              {
                data: this.state.tubiao5.jingwaishuruNew.dataname,
              },
            ],
          });
          this.myChart5.setOption({
            series: [
              {
                data: this.state.tubiao6.jignwaishuruTotal.datavalue,
              },
            ],
            xAxis: [
              {
                data: this.state.tubiao6.jignwaishuruTotal.dataname,
              },
            ],
          });
          this.myChart6.setOption({
            series: [
              {
                data: this.state.tubiao7.nowConfirm,
              },
            ],
            xAxis: [
              {
                data: this.state.tubiao7.data,
              },
            ],
          });
          this.myChart7.setOption({
            color: ["rgba(222, 45, 39, 0.76)", "rgba(244, 233, 24, 0.8)"],
            legend: {
              data: ["新增确诊", "新增疑似"],
              right: "8%",
              top: "5%",
              orient: "horizontal",
              icon: "rect",
              itemHeight: 10,
              itemWidth: 10,
              textStyle: {
                fontSize: 9,
                color: "rgba(101, 98, 98, 1)",
              },
            },
            series: [
              {
                type: "line",
                name: "新增确诊",
                data: this.state.tubiao8.confirm,
                lineStyle: {
                  color: "rgba(222, 45, 39, 0.76)",
                },
              },
              {
                type: "line",
                name: "新增疑似",
                data: this.state.tubiao8.suspect,
                lineStyle: {
                  color: "rgba(244, 233, 24, 0.8)",
                },
              },
            ],
            xAxis: [
              {
                data: this.state.tubiao8.data,
              },
            ],
          });
          this.myChart8.setOption({
            color: [
              "rgba(245, 17, 17, 1)",
              "rgba(33, 231, 30, 1)",
              "rgba(21, 21, 21, 1)",
            ],
            legend: {
              data: ["累计确诊", "累计治愈", "累计死亡"],
              right: "8%",
              top: "11%",
              orient: "horizontal",
              icon: "rect",
              itemHeight: 10,
              itemWidth: 10,
              textStyle: {
                fontSize: 9,
                color: "rgba(101, 98, 98, 1)",
              },
            },
            series: [
              {
                type: "line",
                name: "累计确诊",
                data: this.state.tubiao9.confirm,
                lineStyle: {
                  color: "rgba(245, 17, 17, 1)",
                },
              },
              {
                type: "line",
                name: "累计治愈",
                data: this.state.tubiao9.heal,
                lineStyle: {
                  color: "rgba(33, 231, 30, 1)",
                },
              },
              {
                type: "line",
                name: "累计死亡",
                data: this.state.tubiao9.dead,
                lineStyle: {
                  color: "rgba(21, 21, 21, 1)",
                },
              },
            ],
            xAxis: [
              {
                data: this.state.tubiao9.data,
              },
            ],
          });
          this.myChart9.setOption({
            color: ["rgba(33, 231, 30, 1)", "rgba(21, 21, 21, 1)"],
            tooltip: {
              // trigger: "item",
              triggerOn: "click",
              // formatter: '{b}<br />{a}：{c}%<br />{a1}：{c1}%'
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
              right: "8%",
              top: "8%",
              orient: "horizontal",
              icon: "rect",
              itemHeight: 10,
              itemWidth: 10,
              textStyle: {
                fontSize: 9,
                color: "rgba(101, 98, 98, 1)",
              },
            },
            series: [
              {
                type: "line",
                name: "治愈率",
                data: this.state.tubiao10.healRate,
                lineStyle: {
                  color: "rgba(33, 231, 30, 1)",
                },
              },
              {
                type: "line",
                name: "病死率",
                data: this.state.tubiao10.deadRate,
                lineStyle: {
                  color: "rgba(21, 21, 21, 1)",
                },
              },
            ],
            xAxis: [
              {
                data: this.state.tubiao10.data,
              },
            ],
          });
        
        });
      } else {
        window.removeEventListener('scroll', this.debounce(this.watchScroll, 15))
        console.log("第二页？");
      }
    },
    jumpToDetail(e, name) {
      if(e.stopPropagation){
        e.stopPropagation();
      }
      
      if (name === "香港" || name === "澳门" || name === "台湾") {
        console.log("没有相关详情数据");
      } else {
        // console.log(name);
        this.$router.push({ path: "/detail",query:{city: name}});
        window.removeEventListener('scroll',this.debounce)
      }
    },
    watchScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // console.log(scrollTop);
      if(this.tabType === 1){
        if(this.$refs.piediv){
          if (scrollTop > this.$refs.piediv.offsetTop + "") {
            this.navBarFixed = true;
          } else {
            this.navBarFixed = false;
          }
        }
      }
    },
    //函数节流
    debounce(func, wait = 50, immediate = true) {
      let timer, context, args;
      // 延迟执行函数
      const later = () =>
        setTimeout(() => {
          // 延迟函数执行完毕，清空缓存的定时器序号
          timer = null;
          // 延迟执行的情况下，函数会在延迟函数中执行
          // 使用到之前缓存的参数和上下文
          if (!immediate) {
            func.apply(context, args);
            context = args = null;
          }
        }, wait);

      // 这里返回的函数是每次实际调用的函数
      return function (...params) {
        // 如果没有创建延迟执行函数（later），就创建一个
        if (!timer) {
          timer = later();
          // 如果是立即执行，调用函数
          // 否则缓存参数和调用上下文
          if (immediate) {
            func.apply(this, params);
          } else {
            context = this;
            args = params;
          }
          // 如果已有延迟执行函数（later），调用的时候清除原来的并重新设定一个
          // 这样做延迟函数会重新计时
        } else {
          clearTimeout(timer);
          timer = later();
        }
      };
    },
    changeListType(e) {
      let classname = e.currentTarget.parentElement.className;
      if (classname) {
        e.currentTarget.parentElement.classList.remove("current");
      } else {
        e.currentTarget.parentElement.classList.add("current");
      }
    },
    changTabHandler(e) {
      this.tabType = parseInt(e.target.dataset.id);
    },
    changeSwiperHandler(e) {
      let id = parseInt(e.target.dataset.id);
      this.$refs.swiper1.slideTo(id);
      this.tubiaoIndex1 = id;
    },
    changeSWiperPrevHandle1() {
      this.$refs.swiper1.prevSlide();
    },
    changeSWiperNextHandle1() {
      this.$refs.swiper1.nextSlide();
    },
    changeSwiper3Handler(e) {
      let id = parseInt(e.target.dataset.id);
      this.$refs.swiper2.slideTo(id);
      this.tubiaoIndex2 = id;
    },
    changeSWiperPrevHandle3() {
      this.$refs.swiper2.prevSlide();
    },
    changeSWiperNextHandle3() {
      this.$refs.swiper2.nextSlide();
    },
    //初始化图表1
    chinaConfigure() {
      this.myChart = echarts.init(this.$refs.myEchart);
      var _this = this
      this.myChart.setOption({
        tooltip: {
          enterable:true,
          triggerOn: "click",
          formatter: function (e) {
            _this.hooktips = e.name
            let htmls = `<div style="width:85px;height:55px;text-align:center;font-size:10px"><div>${e.name}</div><div style="text-align:center;">现有确诊:${e.value}</div><buttom id="btn-hander">查看详情</buttom></div>`;
            return htmls;
          },
        },
        visualMap: {
          type: "piecewise",
          min: 0,
          max: 10000,
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
          map: "china",
          top: 0,
          left: 0,
          right: 0,
          bottom: "10%",
          label: {
            normal: {
              show: !0,
              fontSize: "10",
              color: "rgba(0,0,0,0.7)",
            },
          },
          itemStyle: {
            normal: {
              // shadowBlur: 50,
              // shadowColor: 'rgba(0, 0, 0, 0.2)',
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
            geoIndex: 0,
            data: this.data,
          },
        ],
      });
    },
    //初始化图表2
    initTubiao2() {
      this.myChart1 = echarts.init(this.$refs.myEchart1);
      this.myChart1.setOption({
        color: ["#3398DB"],
        title: {
          text: "现有无症状感染者",
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
          left: "3%",
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
    //初始化图表3
    initTubiao3() {
      this.myChart2 = echarts.init(this.$refs.myEchart2);
      this.myChart2.setOption({
        color: ["#3398DB"],
        title: {
          text: "新增无症状感染者",
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
          left: "3%",
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
            minInterval: 1,
            offset: 0,
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
    //初始化图表4
    initTubiao4() {
      this.myChart3 = echarts.init(this.$refs.myEchart3);
      this.myChart3.setOption({
        color: ["#3398DB"],
        title: {
          text: "境外输入省市TOP10",
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
          left: "3%",
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
              interval: 0,
              showMaxLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            offset: 0,
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
    initTubiao5() {
      this.myChart4 = echarts.init(this.$refs.myEchart4);
      this.myChart4.setOption({
        title: {
          text: "境外输入新增趋势",
          top: "3%",
          textStyle: {
            fontSize: 14,
            color: "rgba(30, 28, 28, 1)",
            fontWeight: "bolder",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            textStyle: {
              color: "#fff",
            },
          },
        },
        grid: {
          left: "1%",
          right: "1%",
          bottom: "1%",
          top: "20%",
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
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
          },
        ],
      });
    },
    initTubiao6() {
      this.myChart5 = echarts.init(this.$refs.myEchart5);
      this.myChart5.setOption({
        title: {
          text: "境外输入累计趋势",
          top: "3%",
          textStyle: {
            fontSize: 14,
            color: "rgba(30, 28, 28, 1)",
            fontWeight: "bolder",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            textStyle: {
              color: "#fff",
            },
          },
        },
        grid: {
          left: "1%",
          right: "1%",
          bottom: "1%",
          top: "20%",
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
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
          },
        ],
      });
    },
    initTubiao7() {
      this.myChart6 = echarts.init(this.$refs.myEchart6);
      this.myChart6.setOption({
        title: {
          text: "全国现有确诊趋势",
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
          left: "1%",
          right: "1%",
          bottom: "1%",
          top: "20%",
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
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            name: "现有确诊",
          },
        ],
      });
    },
    initTubiao8() {
      this.myChart7 = echarts.init(this.$refs.myEchart7);
      this.myChart7.setOption({
        title: {
          text: "全国疫情新增趋势",
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
          left: "1%",
          right: "1%",
          bottom: "1%",
          top: "20%",
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
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            name: "新增确诊",
          },
          {
            data: [80, 222, 911, 214, 120, 230, 2320],
            type: "line",
            name: "新增疑似",
          },
        ],
      });
    },
    initTubiao9() {
      this.myChart8 = echarts.init(this.$refs.myEchart8);
      this.myChart8.setOption({
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
          left: "1%",
          right: "1%",
          bottom: "1%",
          top: "20%",
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
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            name: "新增确诊",
          },
          {
            data: [80, 222, 911, 214, 120, 230, 2320],
            type: "line",
            name: "新增疑似",
          },
        ],
      });
    
    },
    initTubiao10() {
      this.myChart9 = echarts.init(this.$refs.myEchart9);
      this.myChart9.setOption({
        title: {
          text: "全国治愈率/病死率趋势",
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
          left: "1%",
          right: "1%",
          bottom: "1%",
          top: "20%",
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
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            name: "新增确诊",
          },
          {
            data: [80, 222, 911, 214, 120, 230, 2320],
            type: "line",
            name: "新增疑似",
          },
        ],
      });
    },
    changBtnHandler(e) {
      let id = parseInt(e.target.dataset.id);
      this.btntype = id;
      var _this = this
      if (id === 1) {
        this.myChart.setOption({
          tooltip: {
            formatter: function (e) {
              _this.hooktips = e.name
              let htmls = `<div style="width:85px;height:55px;text-align:center;font-size:10px"><div>${e.name}</div><div style="text-align:center;">现有确诊:${e.value}</div><buttom id="btn-hander">查看详情</buttom></div>`;
              return htmls;
            },
          },
          series: [
            {
              data: this.state.CityNowConfirm,
            },
          ],
        });
      } else {
        this.myChart.setOption({
          tooltip: {
            formatter: function (e) {
              _this.hooktips = e.name
              let htmls = `<div style="width:85px;height:55px;text-align:center;font-size:10px"><div>${e.name}</div><div style="text-align:center;">累计确诊:${e.value}</div><buttom id="btn-hander">查看详情</buttom></div>`;
              return htmls;
            },
          },
          series: [
            {
              data: this.state.CityConfirm,
            },
          ],
        });
      }
    },
    changeNextHandler(e) {
      let id = parseInt(e.target.dataset.id);
      if (this.tubiaoIndex === id) {
        if (id === 0) {
          this.$refs.swiper.nextSlide();
          this.tubiaoIndex === 1;
        } else {
          this.$refs.swiper.prevSlide();
          this.tubiaoIndex === 0;
        }
      } else {
        console.log("ID相同了");
      }
    },
    getNum(data) {
      this.tubiaoIndex = data;
    },
    getNumber(data) {
      this.tubiaoIndex1 = data;
    },
    getNumber1(data) {
      this.tubiaoIndex2 = data;
    },
    splitArr(data, senArrLen) {
      //处理成len个一组的数据
      let data_len = data.length;
      let arrOuter_len =
        data_len % senArrLen === 0
          ? data_len / senArrLen
          : parseInt(data_len / senArrLen + "") + 1;
      let arrSec_len = data_len > senArrLen ? senArrLen : data_len; //内层数组的长度
      let arrOuter = new Array(arrOuter_len); //最外层数组
      let arrOuter_index = 0; //外层数组的子元素下标
      // console.log(data_len % len);
      for (let i = 0; i < data_len; i++) {
        if (i % senArrLen === 0) {
          arrOuter_index++;
          let len = arrSec_len * arrOuter_index;
          //将内层数组的长度最小取决于数据长度对len取余，平时最内层由下面赋值决定
          arrOuter[arrOuter_index - 1] = new Array(data_len % senArrLen);
          if (arrOuter_index === arrOuter_len)
            //最后一组
            data_len % senArrLen === 0
              ? (len = (data_len % senArrLen) + senArrLen * arrOuter_index)
              : (len =
                  (data_len % senArrLen) + senArrLen * (arrOuter_index - 1));
          let arrSec_index = 0; //第二层数组的索引
          for (let k = i; k < len; k++) {
            //第一层数组的开始取决于第二层数组长度*当前第一层的索引
            arrOuter[arrOuter_index - 1][arrSec_index] = data[k];
            arrSec_index++;
          }
        }
      }
      return arrOuter;
    },
  },
  watch:{
    hooktips:function(name){
        document.querySelector("#btn-hander").addEventListener("click", () => {
          console.log('click')
        if (name === "香港" || name === "澳门" || name === "台湾") {
        console.log("没有相关详情数据");
        } else {
          console.log(name);
          this.$router.push({ path: "/detail",query:{city: name}});
        }
      })
    }
  },
  filters: {
    filterNumber: function (value) {
      if (value > 0) {
        return `+${value}`;
      } else {
        return value;
      }
    },
    TimeToSJC: function (value) {
      let utc = Date.parse(new Date()) - new Date(value).getTime();
      //  let day = Math.floor(utc / (24 * 3600 * 1000)) //取得天数
      let hous = Math.floor(utc / (3600 * 1000)); //取得小时
      let min = Math.floor(
        ((utc % (24 * 3600 * 1000)) % (3600 * 1000)) / (60 * 1000)
      ); //取得分钟
      //  let sec = Math.round(((((utc)%(24*3600*1000))%(3600*1000))%(60*1000))/1000)//取得秒
      if (hous === 0) {
        return `${min}分钟`;
      } else {
        return `${hous}小时${min}分钟`;
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.Main {
  font-size: 4.267vw;
  color: #222;
  background: blue;
}
.bodys {
  height: 10vw;
  background: #ddecff;
  // border-radius: 3.2vw 3.2vw 0 0;
  display: flex;
  justify-content: space-between;
  -webkit-box-pack: justify;
  // background: url(../assets/bg.gif);
  // background-size:100% 100% ;
  .tabs {
    width: 50%;
    height: 100%;
    line-height: 11vw;
    font-size: 4.267vw;
    text-align: center;
    z-index: 99;
  }
  .current {
    color: #005dff;
    background: #fff;
    font-weight: 400;
    border-radius: 3.2vw 3.2vw 0 0;
  }
}

.concent {
  background: #fff;
  padding: 5.333vw 5.333vw 0;
  height: 100%;
  overflow: hidden;
  z-index: 99;
  .enterIndex{
    margin: 2.133vw 5.333vw 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eef4ff;
    border-radius: 1.6vw;
    padding: 0 2.667vw;
    text-align: center;
    .line{
      height: 4.8vw;
      width: 1px;
      background-color: #d8e6ff;
    }
    .item{
      line-height: normal;
      font-size: 3.733vw;
      padding: 3.467vw 0;
      color: #222;
      text-align: center;
      position: relative;
      margin:0 2vw;
      &.cxcx{
        .text{
          background: url(https://mat1.gtimg.com/news/feiyanarea/icon_cx.png) no-repeat 0;
          background-size: 5.6vw auto;
          padding-left: 6.667vw;
        }
      }
      &.bhgj{
        .text{
          background: url(https://mat1.gtimg.com/news/feiyanarea/icon_ymjiezhong.png) no-repeat 0;
          background-size: 6.133vw auto;
          padding-left: 6.667vw;
        }
      }
    }
  }
  .chinaNow {
    z-index: 101;
    margin: 2vw 0;
    .hidden{
      display: none;
    }
    .exp-More{
      text-align: center;
      span{
        display: inline-block;
        padding: 1.6vw 4vw 1.6vw 0;
        position: relative;
        line-height: normal;
        font-size: 3.2vw;
        &::before{
          content: ".";
          font-size: 0;
          line-height: 0;
          display: block;
          position: absolute;
          width: 2.4vw;
          height: 1.6vw;
          background: url(https://mat1.gtimg.com/news/feiyanarea/icon_bt_more.png);
          background-size: 100% 100%;
          right: 0;
          top: 50%;
          -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
        }
      }
    }
    .h2 {
      position: relative;
      em {
        font-size: 3.2vw;
        color: #737373;
        font-style: normal;
        margin: 0 25px;
        line-height: 4.8vw;
      }
      span {
        font-size: 4.267vw;
        font-weight: 700;
        color: #222;
      }
      .fxdq {
        width: 18.133vw;
        height: 5.867vw;
        position: absolute;
        right: 9.067vw;
        top: 55%;
        z-index: 99;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        background: url(https://mat1.gtimg.com/news/feiyanarea/btn_fxdq.png);
        background-color: #fff;
        border-radius: 5.867vw;
        background-size: 100% 100%;
      }
    }
    table {
      width: 100%;
      margin-top: 2.7vw;
      thead {
        td {
          height: 8.533vw;
          line-height: 8.533vw;
          text-align: center;
          background-color: #eef4ff;
          color: #4180f1;
          font-size: 3.2vw;
          border-right: 1px solid #fff;
        }
      }
      tbody {
        td {
          line-height: 4.267vw;
          padding: 2.933vw 0;
          text-align: center;
          border-bottom: 1px solid #f5f5f5;
          font-size: 3.2vw;
        }
        th {
          font-weight: 400;
          font-size: 3.2vw;
          line-height: 4.267vw;
          padding: 2.933vw 0;
          text-align: center;
          border-bottom: 1px solid #f5f5f5;
          font-size: 3.2vw;
        }
        .red {
          color: #ff7f7f;
        }
      }
    }
  }
  .recentNumber {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding-bottom: 4vw;
    .table {
      width: 29vw;
      margin: 0 0.533vw 0.533vw 0;
      padding: 1.6vw 0 3.2vw;
      position: relative;
      text-align: center;
    }
    .nowConfirm {
      background-color: #fdf1f1;
      .number {
        color: #f23a3b;
      }
      .add span {
        color: #f23a3b;
      }
    }
    .nowSevere {
      background-color: #faf2f6;
      .number {
        color: #ca3f81;
      }
      .add span {
        color: #ca3f81;
      }
    }
    .nowImport {
      background-color: #fcf4f0;
      .number {
        color: #4e8be6;
      }
      .add span {
        color: #4e8be6;
      }
    }
    .confirm {
      background-color: #fdf1f1;
      .number {
        color: #cc1e1e;
      }
      .add span {
        color: #cc1e1e;
      }
    }
    .heal {
      background-color: #f1f8f4;
      .number {
        color: #e57631;
      }
      .add span {
        color: #e57631;
      }
    }
    .dead {
      background-color: #f3f6f8;
      .number {
        color: #4e5a65;
      }
      .add span {
        color: #4e5a65;
      }
    }
    .number {
      font-size: 5.867vw;
      line-height: 5.867vw;
      height: 5.867vw;
      font-weight: 600;
      padding-top: 1.6vw;
    }
    .add {
      padding-top: 1.6vw;
      color: #7c7c7c;
      font-size: 2.667vw;
      line-height: 2.667vw;
      height: 2.667vw;
      font-weight: 500;
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
  .timeNum {
    padding: 5.333vw 0vw 4vw;
    background-color: #fff;
    border-radius: 3.2vw;
    line-height: 3.733vw;
    font-size: 3.2vw;
    color: #737373;
    .timestyle {
      color: #222;
      font-weight: 500;
      font-size: 1em;
    }
  }
  .echarts1 {
    min-height: 59vw;
    width: 100%;
    .btnBox {
      display: flex;
      .btn {
        width: 17.067vw;
        border: 1px solid #ccc;
        font-size: 3.2vw;
        text-align: center;
        padding: 1.2vw 0;
        &:nth-child(1) {
          border-radius: 10px 0 0 10px;
          border-right: none;
        }
        &:nth-child(2) {
          border-radius: 0 10px 10px 0px;
        }
      }
      .btnActive {
        color: #005dff;
        background-color: #eef4ff;
        border-color: #ccdeff;
      }
    }
  }
  .chartsBox {
    position: relative;
    height: 100%;
    width: 100%;
    .echarts2,
    .echarts3 {
      border: 1px solid #efefef;
      border-radius: 1.6vw;
      margin-top: 5vw;
    }
    .ordeText {
      margin: 2.667vw 5.333vw;
      font-size: 3.2vw;
      line-height: 4.267vw;
      color: #a6a6a6;
      .text::after {
        color: #a6a6a6;
        content: ",";
      }
      .text:last-child::after {
        content: "";
      }
    }
    .SwiperbtnBOX {
      display: flex;
      justify-content: center;
      margin: 3.2vw 5.333vw;
      -webkit-box-pack: justify;

      .Swiperbtn {
        display: block;
        width: 43.733vw;
        border: 1px solid #e9ebed;
        border-radius: 1.067vw;
        font-size: 3.2vw;
        line-height: 9.867vw;
        text-align: center;
        background-color: #f3f6f8;
        height: 9.867vw;
        padding-top: 1.333vw;
        margin: 0 2px;
        text-align: center;
      }
      .active {
        background-color: #eef4ff;
        border-color: #8fb8ff;
        color: #005def;
        font-weight: 500;
      }
    }
    .chartsbtn-right,
    .chartsbtn-left {
      width: 9.6vw;
      height: 9.6vw;
      position: absolute;
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      background-size: 100% 100%;
      z-index: 2;
    }
    .chartsbtn-right {
      background-image: url(//mat1.gtimg.com/news/signin/v6/zhelian_right.png);
      right: -4.8vw;
    }
    .chartsbtn-left {
      background-image: url(//mat1.gtimg.com/news/signin/v6/zhexian_left.png);
      left: -4.8vw;
    }
  }
  .cityYQ {
    margin-top: 5vw;
    .title {
      height: 3.733vw;
      line-height: 3.733vw;
      font-size: 3.733vw;
      em {
        font-style: normal;
        font-weight: 700;
      }
      span {
        color: #f23a3b;
        font-weight: 500;
      }
    }
    .content {
      height: 14.4vw;
      margin: 3.2vw 0 0;
      border-radius: 1.6vw;
      background-color: #eef4ff;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      .item .num {
        font-size: 4.8vw;
        line-height: 4.8vw;
        height: 4.8vw;
        font-weight: 500;
      }
      .item.zero .num {
        color: #1f82df;
      }
      .item.has .num {
        color: #cf0f0f;
      }
      .item .name {
        font-size: 3.2vw;
        color: #000;
        height: 3.2vw;
        line-height: 3.2vw;
        margin-top: 1.067vw;
      }
      .progress-bar {
        width: 46.667vw;
        height: 1.6vw;
        background-color: #cf0f0f;
        border-radius: 1.6vw;
        position: relative;
        overflow: hidden;
        margin: 0 2.667vw;
        p {
          border-right: 0.533vw solid #eef4ff;
          width: 0;
          background-color: #1f82df;
          height: 100%;
        }
      }
    }
    .footer {
      font-size: 3.2vw;
      line-height: 4.267vw;
      color: #a6a6a6;
      margin: 3.2vw 0 0;
    }
  }
  .shuruYQ {
    margin-top: 5vw;
    position: relative;
    .echarts {
      border: 1px solid #efefef;
      border-radius: 1.6vw;
    }
    .btns {
      display: flex;
      padding-top: 3vw;
      .btn {
        display: block;
        width: 28.533vw;
        border: 1px solid #e9ebed;
        border-radius: 1.067vw;
        font-size: 3.2vw;
        line-height: 4.267vw;
        text-align: center;
        background-color: #f3f6f8;
        height: 9.867vw;
        padding-top: 1.333vw;
        margin: 0.75vw;
      }
      .active {
        background-color: #eef4ff;
        border-color: #8fb8ff;
        color: #005def;
        font-weight: 500;
      }
    }
    .pagePrev,
    .pageNext {
      width: 9.6vw;
      height: 9.6vw;
      position: absolute;
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      background-size: 100% 100%;
      z-index: 2;
    }
    .pageNext {
      background-image: url(//mat1.gtimg.com/news/signin/v6/zhelian_right.png);
      right: -4.8vw;
    }
    .pagePrev {
      background-image: url(//mat1.gtimg.com/news/signin/v6/zhexian_left.png);
      left: -4.8vw;
    }
  }
  .tables {
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
              left: -3.4vw;
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
  .tips {
    color: #737373;
    font-size: 3.2vw;
    height: 3.2vw;
    line-height: 3.2vw;
    margin: 5.333vw 0;
    position: relative;
    span {
      position: relative;
      display: inline-block;
      padding-right: 4vw;
      &::before {
        content: ".";
        display: block;
        font-size: 0;
        line-height: 0;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 3.2vw;
        height: 3.2vw;
        background: url(//mat1.gtimg.com/news/images/inews/2020/feiyan/18/img/icon_qs.png);
        background-size: 100% 100%;
      }
    }
  }

}
</style>
