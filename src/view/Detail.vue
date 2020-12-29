<template>
  <div>
    <Banner :city="city" :Datafrom="''"/>
    <div class="detaiBox">
      <div class="total">
        <div class="time">
          统计截至<span>{{ data.lastUpdateTime }}</span>
        </div>
      </div>
      <div class="recentNumber">
        <div class="icbla nowConfrim">
          <p class="add">
            较上日<span>{{ dataAdd.nowConfirm | filterNumber }}</span>
          </p>
          <div class="num">{{ citydata.total.nowConfirm }}</div>
          <div class="text">现有确诊</div>
        </div>
        <div class="icbla confrim">
          <p class="add">
            较上日<span>{{ dataAdd.confirmAdd | filterNumber }}</span>
          </p>
          <div class="num">{{ citydata.total.confirm }}</div>
          <div class="text">累计确诊</div>
        </div>
        <div class="icbla heal">
          <p class="add">
            较上日<span>{{ dataAdd.heal | filterNumber }}</span>
          </p>
          <div class="num">{{ citydata.total.heal }}</div>
          <div class="text">累计治愈</div>
        </div>
        <div class="icbla dead">
          <p class="add">
            较上日<span>{{ dataAdd.dead | filterNumber }}</span>
          </p>
          <div class="num">{{ citydata.total.dead }}</div>
          <div class="text">累计死亡</div>
        </div>
      </div>
      <div
        class="address"
        v-if="
          city !== '上海' &&
          city !== '北京' &&
          city !== '天津' &&
          city !== '重庆'
        "
      >
        <div class="addressBox">
          <div class="cityname">
            <span>{{ lastCityData.city }}</span>
          </div>
          <div class="detail">
            <p>
              <span>-新增-</span>
            </p>
            <p>
              <span>{{ lastCityData.confirm }}</span>
              确诊
            </p>
            <p>
              <span>{{ lastCityData.heal }}</span>
              治愈
            </p>
            <p>
              <span>{{ lastCityData.dead }}</span>
              死亡
            </p>
          </div>
        </div>
      </div>
      <div class="Echarts">
        <div class="EchartsBOX" ref="Echarts1"></div>
        <div class="btnbox">
          <span
            :class="[{ current: defaults === 'NowConfirm' }]"
            @click="changmaptype(0)"
            >现有确诊</span
          >
          <span
            :class="[{ current: defaults === 'Confirm' }]"
            @click="changmaptype(1)"
            >累计确诊</span
          >
        </div>
      </div>
      <div class="cityAddEcharts">
        <div class="EchartsBOX" ref="Echarts2"></div>
      </div>
      <div class="cityAddEcharts">
        <div class="EchartsBOX" ref="Echarts3"></div>
      </div>
      <div
        class="cityAddEcharts"
        v-if="
          city !== '上海' &&
          city !== '北京' &&
          city !== '天津' &&
          city !== '重庆'
        "
      >
        <div class="EchartsBOX" ref="Echarts4"></div>
      </div>
      <div class="tabls">
        <div>
          <div class="title">
            <span>{{lastCityData.city}}疫情</span>
            <p>7:00-10:00为更新高峰期，数据如有滞后请谅解</p>
          </div>
          <div class="body">
            <table>
              <thead>
                <th>地区</th>
                <th>新增确诊</th>
                <th>累计确诊</th>
                <th>治愈</th>
                <th>死亡</th>
              </thead>
              <tbody>
                <tr v-for="(item,index) in citydata.children" :key="index">
                  <th>{{item.name}}</th>
                  <td>{{item.today.confirm ? item.today.confirm :'-'}}</td>
                  <td>{{item.total.confirm}}</td>
                  <td>{{item.total.heal}}</td>
                  <td>{{item.total.dead}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="Hospital">
        <div class="title">
          <span>医疗救治医院</span>
        </div>
        <div class="hospitalBox" v-if="SwiperArr.childrens.length">
          <Swiper
            :autoPlay="false"
            :showIndicator="false"
            ref="swiper2"
          >
            <Slide v-for="(item,i) in SwiperArr.childrens" :key="i" class="swiperbox">
              <div v-for="(items,ii) in item" :key="ii" class="items">
                <a :href="items.link.url" target="_blank">
                  <div class="citynames">
                    <div class="title">{{items.cityName}}</div>
                    <span class="num">{{items.count}}家</span>
                  </div>
                </a>
              </div>
            </Slide>
          </Swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "../components/banner.vue";
import pinyin from "chinese-to-pinyin";
import { Swiper, Slide } from "vue-swiper-component";
import { getChinaCityMapData, getChinaCityDetailData,getCityHospitalData} from "../api/request.js";
import echarts from "echarts";
export default {
  name: "detail",
  components: {
    Banner,
    Swiper,
    Slide
  },
  data() {
    return {
      city: "null",
      data: {},
      citydata: null,
      dataAdd: null,
      myChart: {
        myChart1: null,
        myChart2: null,
        myChart3: null,
        myChart4: null,
      },
      state: {
        NowConfirm: [],
        Confirm: [],
        cityAdd: {
          confirmAdd: [],
          healAdd: [],
          deadAdd: [],
          data: [],
        },
        citytotal: {
          nowConfirm: [],
          totalConfirm: [],
          totaHeal: [],
          totalDead: [],
        },
        cityDetailTotal: {
          data: [],
          confirm: [],
          heal: [],
          dead: [],
        },
      },
      mapdata: {},
      defaults: "NowConfirm",
      lastCityData: {},
      isMain: true,
      pages:0,
      SwiperArr:{
        pages:0,
        childrens:[]
      }
    };
  },
  async created() {
    this.city = this.$route.query.city;
    this.data = JSON.parse(localStorage.getItem("array"));
    this.provinceCompare = JSON.parse(localStorage.getItem("provinceCompare"));
    // console.log(this.provinceCompare);
    let city = this.data.areaTree[0].children.filter((item) => {
      return item.name === this.city;
    });
    this.citydata = city[0];
    console.log(this.citydata)
    this.citydata.children.forEach((item) => {
      this.state.NowConfirm.push({
        value: item.total.nowConfirm,
        name: item.name,
      });
      this.state.Confirm.push({
        value: item.total.confirm,
        name: item.name,
      });
    });
    this.getcity(this.city);
    let cityname = pinyin(this.city, { removeSpace: true, removeTone: true });
    // console.log(cityname);
    if (this.city === "陕西") {
      cityname = "shanxi1";
    }
    this.getJSONData(cityname);
    this.getCityDetailData(this.city);
    try{
      const hospital = await this.getCityHospitalDatas(this.city)
      let len = hospital.data.args.rsp.info.citys.length
      this.SwiperArr.pages = Math.round(len / 8)
      // console.log(this.SwiperArr.pages)
      this.SwiperArr.childrens = this.splitArr(hospital.data.args.rsp.info.citys,8)
      // console.log(this.SwiperArr.childrens)
      if (
        this.city !== "上海" &&
        this.city !== "重庆" &&
        this.city !== "北京" &&
        this.city !== "天津"
      ) {
        const maincitydata = await this.getMainDetailData(this.city);
        this.lastCityData = maincitydata.data.data[maincitydata.data.data.length - 1];
        let options = {
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
        };
        this.myChart.myChart4 = echarts.init(this.$refs.Echarts4);
        this.myChart.myChart4.setOption(options);
        // console.log('主城市：',this.lastCityData)
        maincitydata.data.data.forEach((item) => {
          this.state.cityDetailTotal.data.push(item.date.replace(".", "-"));
          this.state.cityDetailTotal.confirm.push(item.confirm);
          this.state.cityDetailTotal.dead.push(item.dead);
          this.state.cityDetailTotal.heal.push(item.heal);
        })
        // console.log('主城市数据：',this.state.cityDetailTotal)
        this.myChart.myChart4.setOption({
                title: {
            text: `${this.lastCityData.city}疫情新增趋势`,
          },
          color: ["#F06061", "#65B379", "#87878B"],
          legend: {
            data: ["新增确诊", "新增治愈", "新增死亡"],
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
              name: "新增确诊",
              data: this.state.cityDetailTotal.confirm,
              lineStyle: {
                color: "#F06061",
              },
            },
            {
              type: "line",
              name: "新增治愈",
              data: this.state.cityDetailTotal.heal,
              lineStyle: {
                color: "#65B379",
              },
            },
            {
              type: "line",
              name: "新增死亡",
              data: this.state.cityDetailTotal.dead,
              lineStyle: {
                color: "#87878B",
              },
            },
          ],
          xAxis: [
            {
              data: this.state.cityDetailTotal.data,
            },
          ],
        });
      }else {
        this.isMain = false;
      }
    } catch(err){
      console.log('错误',err)
    }
    
  },
  methods: {
    getJSONData(cityname) {
      getChinaCityMapData(cityname).then((res) => {
        this.mapdata = res.data;
        this.EchartsInit(this.mapdata);
        this.SetOptionHandler(this.city);
      });
    },
    getCityDetailData(city) {
      getChinaCityDetailData(city).then((res) => {
        // console.log(res.data.data);
        res.data.data.forEach((item) => {
          this.state.cityAdd.data.push(item.date.replace(".", "-"));
          this.state.cityAdd.confirmAdd.push(item.confirm_add);
          this.state.cityAdd.healAdd.push(item.newHeal);
          this.state.cityAdd.deadAdd.push(item.newDead);
          this.state.citytotal.totalConfirm.push(item.confirm);
          this.state.citytotal.nowConfirm.push(
            item.confirm - item.heal - item.dead
          );
          this.state.citytotal.totaHeal.push(item.heal);
          this.state.citytotal.totalDead.push(item.dead);
        });
        // console.log(this.state.cityAdd);
        // console.log(this.state.citytotal);
        this.setoption();
      });
    },
    getMainDetailData(city) {
        return new Promise((resolve,reject) => {
            getChinaCityDetailData(city, 1).then((res) => {
                resolve(res)
                
            }).catch(err => reject(err))
        });
    },
    getcity(city) {
      this.dataAdd = this.provinceCompare[city];
    },
    getCityHospitalDatas(city){
      return new Promise((resolve,reject) => {
        getCityHospitalData(city).then((res) => {
          resolve(res)
        }).catch((err) => {
          reject(err)
        })
      })
    },  
    EchartsInit(cityJson) {
      console.log("开始初始化地图");
      console.log(this.city,'地图数据:',cityJson)
      echarts.registerMap("city", cityJson, {
        三沙市: {
          left: 110.63119,
          top: 18.031971,
          width: 0.05,
        },
      });
      this.myChart.myChart1 = echarts.init(this.$refs.Echarts1);
      this.myChart.myChart1.setOption({
        tooltip: {
          triggerOn: "click",
          formatter: function (e) {
            let htmls = `<div style="width:85px;height:50px;text-align:center;font-size:10px"><div>${e.name}</div><div style="text-align:center;">现有确诊:${e.value}</div></div>`;
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
              label: "1万及以上",
              color: "#CC1E1E",
            },
            {
              gte: 1000,
              lte: 9999,
              label: "1000-9999",
              color: "#F04141",
            },
            {
              gte: 500,
              lte: 999,
              label: "500-999",
              color: "#FF704F",
            },
            {
              gte: 100,
              lte: 499,
              label: "100-499",
              color: "#FFC89E",
            },
            {
              gte: 50,
              lte: 99,
              label: "50-99",
              color: "#FFDAB3",
            },
            {
              gte: 10,
              lte: 49,
              label: "10-49",
              color: "#FFE7B8",
            },
            {
              gte: 1,
              lte: 9,
              label: "1-9",
              color: "#fdd49e",
            },
            {
              value: 0,
              label: "0",
              color: "#E2EBF4",
            },
          ],
          show: !0,
        },
        geo: {
          map: "city",
          top: "5%",
          left: "7%",
          right: "5%",
          bottom: "28%",
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
              areaColor: "#FFE766",
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
            data: [
              { name: "四川", value: "1000" },
              { name: "湖北", value: "9999" },
              { name: "新疆", value: "500" },
              { name: "西藏", value: "21" },
            ],
          },
        ],
      });
    },
    SetOptionHandler(cityname) {
      console.log("开始设置option", cityname);
      switch (cityname) {
        case "四川":
          this.myChart.myChart1.setOption({
            series: [
              {
                data: [
                  {
                    name: "甘孜藏族自治州",
                    value: this.filterCityHandler("甘孜"),
                  },
                  {
                    name: "凉山彝族自治州",
                    value: this.filterCityHandler("凉山"),
                  },
                  { name: "攀枝花市", value: this.filterCityHandler("攀枝花") },
                  {
                    name: "阿坝藏族羌族自治州",
                    value: this.filterCityHandler("阿坝"),
                  },
                  { name: "广元市", value: this.filterCityHandler("广元") },
                  { name: "巴中市", value: this.filterCityHandler("巴中") },
                  { name: "达州市", value: this.filterCityHandler("达州") },
                  { name: "南充市", value: this.filterCityHandler("南充") },
                  { name: "广安市", value: this.filterCityHandler("广安") },
                  { name: "内江市", value: this.filterCityHandler("内江") },
                  { name: "宜宾市", value: this.filterCityHandler("宜宾") },
                  { name: "自贡市", value: this.filterCityHandler("自贡") },
                  { name: "乐山市", value: this.filterCityHandler("乐山") },
                  { name: "绵阳市", value: this.filterCityHandler("绵阳") },
                  { name: "德阳市", value: this.filterCityHandler("德阳") },
                  { name: "乐山市", value: this.filterCityHandler("乐山") },
                  { name: "遂宁市", value: this.filterCityHandler("遂宁") },
                  { name: "眉山市", value: this.filterCityHandler("眉山") },
                  { name: "成都市", value: this.filterCityHandler("成都") },
                  { name: "资阳市", value: this.filterCityHandler("资阳") },
                  { name: "雅安市", value: this.filterCityHandler("雅安") },
                  { name: "泸州市", value: this.filterCityHandler("泸州") },
                ],
              },
            ],
          });
          break;
        case "上海":
          this.myChart.myChart1.setOption({
            series: [
              {
                data: [
                  { name: "金山区", value: this.filterCityHandler("金山") },
                  { name: "松江区", value: this.filterCityHandler("松江") },
                  { name: "奉贤区", value: this.filterCityHandler("奉贤") },
                  { name: "青浦区", value: this.filterCityHandler("青浦") },
                  { name: "嘉定区", value: this.filterCityHandler("嘉定") },
                  { name: "宝山区", value: this.filterCityHandler("宝山") },
                  { name: "徐汇区", value: this.filterCityHandler("徐汇") },
                  { name: "崇明区", value: this.filterCityHandler("崇明") },
                  { name: "浦东新区", value: this.filterCityHandler("浦东") },
                  { name: "长宁区", value: this.filterCityHandler("长宁") },
                  { name: "普陀区", value: this.filterCityHandler("普陀") },
                  { name: "静安区", value: this.filterCityHandler("静安") },
                  { name: "虹口区", value: this.filterCityHandler("虹口") },
                  { name: "杨浦区", value: this.filterCityHandler("杨浦") },
                  { name: "黄浦区", value: this.filterCityHandler("黄浦") },
                  { name: "闵行区", value: this.filterCityHandler("闵行") },
                ],
              },
            ],
          });
          break;
        case "黑龙江":
          this.myChart.myChart1.setOption({
            series: [
              {
                data: [
                  {
                    name: "大兴安岭地区",
                    value: this.filterCityHandler("大兴安岭"),
                  },
                  { name: "黑河市", value: this.filterCityHandler("黑河") },
                  {
                    name: "齐齐哈尔市",
                    value: this.filterCityHandler("齐齐哈尔"),
                  },
                  { name: "大庆市", value: this.filterCityHandler("大庆") },
                  { name: "哈尔滨市", value: this.filterCityHandler("哈尔滨") },
                  { name: "牡丹江市", value: this.filterCityHandler("牡丹江") },
                  { name: "鸡西市", value: this.filterCityHandler("鸡西") },
                  { name: "七台河市", value: this.filterCityHandler("七台河") },
                  { name: "双鸭山市", value: this.filterCityHandler("双鸭山") },
                  { name: "佳木斯市", value: this.filterCityHandler("佳木斯") },
                  { name: "鹤岗市", value: this.filterCityHandler("鹤岗") },
                  { name: "伊春市", value: this.filterCityHandler("伊春") },
                  { name: "绥化市", value: this.filterCityHandler("绥化") },
                ],
              },
            ],
          });
          break;
        case "北京":
          this.myChart.myChart1.setOption({
            series: [
              {
                data: [
                  { name: "延庆区", value: this.filterCityHandler("延庆") },
                  { name: "昌平区", value: this.filterCityHandler("昌平") },
                  { name: "怀柔区", value: this.filterCityHandler("怀柔") },
                  { name: "密云区", value: this.filterCityHandler("密云") },
                  { name: "平谷区", value: this.filterCityHandler("平谷") },
                  { name: "房山区", value: this.filterCityHandler("房山") },
                  { name: "门头沟区", value: this.filterCityHandler("门头沟") },
                  { name: "顺义区", value: this.filterCityHandler("顺义") },
                  { name: "海淀区", value: this.filterCityHandler("海淀") },
                  { name: "丰台区", value: this.filterCityHandler("丰台") },
                  { name: "朝阳区", value: this.filterCityHandler("朝阳") },
                  { name: "西城区", value: this.filterCityHandler("西城") },
                  { name: "石景山区", value: this.filterCityHandler("石景山") },
                  { name: "大兴区", value: this.filterCityHandler("大兴") },
                  { name: "通州区", value: this.filterCityHandler("通州") },
                  { name: "东城区", value: this.filterCityHandler("东城") },
                ],
              },
            ],
          });
          break;
        case "辽宁":
          this.myChart.myChart1.setOption({
            series: [
              {
                data: [
                  { name: "葫芦岛市", value: this.filterCityHandler("葫芦岛") },
                  { name: "大连市", value: this.filterCityHandler("大连") },
                  { name: "铁岭市", value: this.filterCityHandler("铁岭") },
                  { name: "沈阳市", value: this.filterCityHandler("沈阳") },
                  { name: "抚顺市", value: this.filterCityHandler("抚顺") },
                  { name: "朝阳市", value: this.filterCityHandler("朝阳市") },
                  { name: "丹东市", value: this.filterCityHandler("丹东") },
                  { name: "鞍山市", value: this.filterCityHandler("鞍山") },
                  { name: "锦州市", value: this.filterCityHandler("锦州") },
                  { name: "盘锦市", value: this.filterCityHandler("盘锦") },
                  { name: "本溪市", value: this.filterCityHandler("本溪") },
                  { name: "辽阳市", value: this.filterCityHandler("辽阳") },
                  { name: "营口市", value: this.filterCityHandler("营口") },
                  { name: "阜新市", value: this.filterCityHandler("阜新") },
                ],
              },
            ],
          });
          break;
        case "内蒙古":
          this.myChart.myChart1.setOption({
            series: [
              {
                data: [
                  {
                    name: "呼伦贝尔市",
                    value: this.filterCityHandler("呼伦贝尔"),
                  },
                  { name: "包头市", value: this.filterCityHandler("包头") },
                  {
                    name: "乌兰察布市",
                    value: this.filterCityHandler("乌兰察布"),
                  },
                  { name: "赤峰市", value: this.filterCityHandler("赤峰") },
                  {
                    name: "锡林郭勒盟",
                    value: this.filterCityHandler("锡林郭勒"),
                  },
                  { name: "通辽市", value: this.filterCityHandler("通辽") },
                  {
                    name: "鄂尔多斯市",
                    value: this.filterCityHandler("鄂尔多斯"),
                  },
                  {
                    name: "巴彦淖尔市",
                    value: this.filterCityHandler("巴彦淖尔"),
                  },
                  { name: "兴安盟", value: this.filterCityHandler("兴安盟") },
                  { name: "乌海市", value: this.filterCityHandler("乌海") },
                  {
                    name: "阿拉善盟",
                    value: this.filterCityHandler("阿拉善盟"),
                  },
                  {
                    name: "呼和浩特市",
                    value: this.filterCityHandler("呼和浩特"),
                  },
                ],
              },
            ],
          });
          break;
        case "天津":
          this.myChart.myChart1.setOption({
            series: [
              {
                data: [
                  {
                    name: "滨海新区",
                    value: this.filterCityHandler("滨海新区"),
                  },
                  { name: "和平区", value: this.filterCityHandler("和平区") },
                  { name: "宝坻区", value: this.filterCityHandler("宝坻区") },
                  { name: "河北区", value: this.filterCityHandler("河北区") },
                  { name: "津南区", value: this.filterCityHandler("津南区") },
                  { name: "南开区", value: this.filterCityHandler("南开区") },
                  { name: "河东区", value: this.filterCityHandler("河东区") },
                  { name: "北辰区", value: this.filterCityHandler("北辰区") },
                  { name: "宁河区", value: this.filterCityHandler("宁河区") },
                  { name: "河西区", value: this.filterCityHandler("河西区") },
                  { name: "东丽区", value: this.filterCityHandler("东丽区") },
                  { name: "武清区", value: this.filterCityHandler("武清区") },
                  { name: "西青区", value: this.filterCityHandler("西青区") },
                  { name: "红桥区", value: this.filterCityHandler("红桥区") },
                  { name: "静海区", value: this.filterCityHandler("静海区") },
                  { name: "蓟州区", value: this.filterCityHandler("蓟州区") },
                ],
              },
            ],
          });
          break;
        case "广东":
          this.myChart.myChart1.setOption({
            series: [
              {
                data: [
                  { name: "江门市", value: this.filterCityHandler("江门") },
                  { name: "汕尾市", value: this.filterCityHandler("汕尾") },
                  { name: "广州市", value: this.filterCityHandler("广州") },
                  { name: "潮州市", value: this.filterCityHandler("潮州") },
                  { name: "中山市", value: this.filterCityHandler("中山") },
                  { name: "河源市", value: this.filterCityHandler("河源") },
                  { name: "湛江市", value: this.filterCityHandler("湛江") },
                  { name: "珠海市", value: this.filterCityHandler("珠海") },
                  { name: "汕头市", value: this.filterCityHandler("汕头") },
                  { name: "揭阳市", value: this.filterCityHandler("揭阳") },
                  { name: "梅州市", value: this.filterCityHandler("梅州") },
                  { name: "深圳市", value: this.filterCityHandler("深圳") },
                  { name: "肇庆市", value: this.filterCityHandler("肇庆") },
                  { name: "茂名市", value: this.filterCityHandler("茂名") },
                  { name: "惠州市", value: this.filterCityHandler("惠州") },
                  { name: "阳江市", value: this.filterCityHandler("阳江") },
                  { name: "东莞市", value: this.filterCityHandler("东莞") },
                  { name: "韶关市", value: this.filterCityHandler("韶关") },
                  { name: "佛山市", value: this.filterCityHandler("佛山") },
                  { name: "清远市", value: this.filterCityHandler("清远") },
                  { name: "云浮市", value: this.filterCityHandler("云浮") },
                ],
              },
            ],
          });
          break;
        case "福建":
          this.myChart.myChart1.setOption({
            series: [
              {
                data: [
                  { name: "莆田市", value: this.filterCityHandler("莆田") },
                  { name: "泉州市", value: this.filterCityHandler("泉州") },
                  { name: "福州市", value: this.filterCityHandler("福州") },
                  { name: "厦门市", value: this.filterCityHandler("厦门") },
                  { name: "龙岩市", value: this.filterCityHandler("龙岩") },
                  { name: "三明市", value: this.filterCityHandler("三明") },
                  { name: "漳州市", value: this.filterCityHandler("漳州") },
                  { name: "宁德市", value: this.filterCityHandler("宁德") },
                  { name: "南平市", value: this.filterCityHandler("南平") },
                ],
              },
            ],
          });
          break;
        case "云南":
          this.myChart.myChart1.setOption({
            series: [
              {
                data: [
                  {
                    name: "德宏傣族景颇族自治州",
                    value: this.filterCityHandler("德宏州"),
                  },
                  { name: "保山市", value: this.filterCityHandler("保山市") },
                  { name: "普洱市", value: this.filterCityHandler("普洱") },
                  {
                    name: "西双版纳傣族自治州",
                    value: this.filterCityHandler("西双版纳州"),
                  },
                  {
                    name: "大理白族自治州",
                    value: this.filterCityHandler("大理"),
                  },
                  { name: "丽江市", value: this.filterCityHandler("丽江市") },
                  { name: "曲靖市", value: this.filterCityHandler("曲靖") },
                  { name: "昭通市", value: this.filterCityHandler("昭通市") },
                  {
                    name: "迪庆藏族自治州",
                    value: this.filterCityHandler("迪庆"),
                  },
                  {
                    name: "怒江傈僳族自治州",
                    value: this.filterCityHandler("怒江州"),
                  },
                  {
                    name: "楚雄彝族自治州",
                    value: this.filterCityHandler("楚雄州"),
                  },
                  { name: "玉溪市", value: this.filterCityHandler("玉溪") },
                  {
                    name: "红河哈尼族彝族自治州",
                    value: this.filterCityHandler("红河"),
                  },
                  {
                    name: "文山壮族苗族自治州",
                    value: this.filterCityHandler("文山州"),
                  },
                  { name: "昆明市", value: this.filterCityHandler("昆明") },
                  { name: "临沧市", value: this.filterCityHandler("临沧") },
                ],
              },
            ],
          });
          break;
        case "山西":
          this.myChart.myChart1.setOption({
            series: [
              {
                data: [
                  { name: "韩城市", value: this.filterCityHandler("韩城") },
                  { name: "临汾市", value: this.filterCityHandler("临汾") },
                  { name: "太原市", value: this.filterCityHandler("太原") },
                  { name: "阳泉市", value: this.filterCityHandler("阳泉") },
                  { name: "大同市", value: this.filterCityHandler("大同") },
                  { name: "朔州市", value: this.filterCityHandler("朔州") },
                  { name: "钦州市", value: this.filterCityHandler("钦州") },
                  { name: "吕梁市", value: this.filterCityHandler("吕梁") },
                  { name: "长治市", value: this.filterCityHandler("长治") },
                  { name: "晋中市", value: this.filterCityHandler("晋中") },
                  { name: "晋城市", value: this.filterCityHandler("晋城") },
                  { name: "运城市", value: this.filterCityHandler("运城") },
                  { name: "忻州市", value: this.filterCityHandler("忻州") },
                ],
              },
            ],
          });
          break;
        case "陕西":
          this.myChart.myChart1.setOption({
            series: [
              {
                data: [
                  { name: "延安市", value: this.filterCityHandler("延安") },
                  { name: "榆林市", value: this.filterCityHandler("榆林") },
                  { name: "铜川市", value: this.filterCityHandler("铜川") },
                  { name: "渭南市", value: this.filterCityHandler("渭南") },
                  { name: "咸阳市", value: this.filterCityHandler("咸阳") },
                  { name: "商洛市", value: this.filterCityHandler("商洛") },
                  { name: "安康市", value: this.filterCityHandler("安康") },
                  { name: "宝鸡市", value: this.filterCityHandler("宝鸡") },
                  { name: "汉中市", value: this.filterCityHandler("汉中") },
                  { name: "西安市", value: this.filterCityHandler("西安") },
                ],
              },
            ],
          });
          break;
        case "山东":
          this.myChart.myChart1.setOption({
            series: [
              {
                data: [
                  { name: "德州市", value: this.filterCityHandler("德州") },
                  { name: "滨州市", value: this.filterCityHandler("滨州") },
                  { name: "东营市", value: this.filterCityHandler("东营") },
                  { name: "烟台市", value: this.filterCityHandler("烟台") },
                  { name: "威海市", value: this.filterCityHandler("威海") },
                  { name: "青岛市", value: this.filterCityHandler("青岛") },
                  { name: "潍坊市", value: this.filterCityHandler("潍坊") },
                  { name: "淄博市", value: this.filterCityHandler("淄博") },
                  { name: "济南市", value: this.filterCityHandler("济南") },
                  { name: "聊城市", value: this.filterCityHandler("聊城") },
                  { name: "泰安市", value: this.filterCityHandler("泰安") },
                  { name: "临沂市", value: this.filterCityHandler("临沂") },
                  { name: "日照市", value: this.filterCityHandler("日照") },
                  { name: "济宁市", value: this.filterCityHandler("济宁") },
                  { name: "枣庄市", value: this.filterCityHandler("枣庄") },
                  { name: "菏泽市", value: this.filterCityHandler("菏泽") },
                ],
              },
            ],
          });
          break;
        case "浙江":
          this.myChart.myChart1.setOption({
            series: [
              {
                data: [
                  { name: "杭州市", value: this.filterCityHandler("杭州") },
                  { name: "金华市", value: this.filterCityHandler("金华") },
                  { name: "丽水市", value: this.filterCityHandler("丽水") },
                  { name: "台州市", value: this.filterCityHandler("台州") },
                  { name: "宁波市", value: this.filterCityHandler("宁波") },
                  { name: "舟山市", value: this.filterCityHandler("舟山") },
                  { name: "嘉兴市", value: this.filterCityHandler("嘉兴") },
                  { name: "湖州市", value: this.filterCityHandler("湖州") },
                  { name: "绍兴市", value: this.filterCityHandler("绍兴") },
                  { name: "温州市", value: this.filterCityHandler("温州") },
                  { name: "衢州市", value: this.filterCityHandler("衢州") },
                ],
              },
            ],
          });
          break;
        case "河南":
          this.myChart.myChart1.setOption({
            series: [
              {
                data: [
                  { name: "南阳市", value: this.filterCityHandler("南阳") },
                  { name: "平顶山市", value: this.filterCityHandler("平顶山") },
                  { name: "驻马店市", value: this.filterCityHandler("驻马店") },
                  { name: "信阳市", value: this.filterCityHandler("信阳") },
                  { name: "周口市", value: this.filterCityHandler("周口") },
                  { name: "漯河市", value: this.filterCityHandler("漯河") },
                  { name: "许昌市", value: this.filterCityHandler("许昌") },
                  { name: "商丘市", value: this.filterCityHandler("商丘") },
                  { name: "郑州市", value: this.filterCityHandler("郑州") },
                  { name: "洛阳市", value: this.filterCityHandler("洛阳") },
                  { name: "三门峡市", value: this.filterCityHandler("三门峡") },
                  {
                    name: "济源市",
                    value: this.filterCityHandler("济源示范区"),
                  },
                  { name: "焦作市", value: this.filterCityHandler("焦作") },
                  { name: "新乡市", value: this.filterCityHandler("新乡") },
                  { name: "开封市", value: this.filterCityHandler("开封") },
                  { name: "鹤壁市", value: this.filterCityHandler("鹤壁") },
                  { name: "安阳市", value: this.filterCityHandler("安阳") },
                  { name: "濮阳市", value: this.filterCityHandler("濮阳") },
                ],
              },
            ],
          });
          break;
        case "江苏":
          this.myChart.myChart1.setOption({
            series: [
              {
                data: [
                  { name: "徐州市", value: this.filterCityHandler("徐州") },
                  { name: "连云港市", value: this.filterCityHandler("连云港") },
                  { name: "淮安市", value: this.filterCityHandler("淮安") },
                  { name: "盐城市", value: this.filterCityHandler("盐城") },
                  { name: "泰州市", value: this.filterCityHandler("泰州") },
                  { name: "扬州市", value: this.filterCityHandler("扬州") },
                  { name: "常州市", value: this.filterCityHandler("常州") },
                  { name: "无锡市", value: this.filterCityHandler("无锡") },
                  { name: "苏州市", value: this.filterCityHandler("苏州") },
                  { name: "南通市", value: this.filterCityHandler("南通") },
                  { name: "镇江市", value: this.filterCityHandler("镇江") },
                  { name: "南京市", value: this.filterCityHandler("南京") },
                  { name: "宿迁市", value: this.filterCityHandler("宿迁") },
                ],
              },
            ],
          });
          break;
        case "广西":
          this.myChart.myChart1.setOption({
            series: [
              {
                data: [
                  { name: "来宾市", value: this.filterCityHandler("来宾") },
                  { name: "南宁市", value: this.filterCityHandler("南宁") },
                  { name: "玉林市", value: this.filterCityHandler("玉林") },
                  { name: "梧州市", value: this.filterCityHandler("梧州") },
                  { name: "贺州市", value: this.filterCityHandler("贺州") },
                  { name: "桂林市", value: this.filterCityHandler("桂林") },
                  { name: "河池市", value: this.filterCityHandler("河池") },
                  { name: "百色市", value: this.filterCityHandler("百色") },
                  { name: "崇左市", value: this.filterCityHandler("崇左") },
                  { name: "钦州市", value: this.filterCityHandler("钦州") },
                  { name: "防城港市", value: this.filterCityHandler("防城港") },
                  { name: "北海市", value: this.filterCityHandler("北海") },
                  { name: "贵港市", value: this.filterCityHandler("贵港") },
                  { name: "柳州市", value: this.filterCityHandler("柳州") },
                ],
              },
            ],
          });
          break;
        case "新疆":
          this.myChart.myChart1.setOption({
            series: [
              {
                data: [
                  {
                    name: "阿勒泰地区",
                    value: this.filterCityHandler("阿勒泰"),
                  },
                  { name: "哈密市", value: this.filterCityHandler("哈密") },
                  { name: "吐鲁番市", value: this.filterCityHandler("吐鲁番") },
                  { name: "和田地区", value: this.filterCityHandler("和田") },
                  {
                    name: "阿克苏地区",
                    value: this.filterCityHandler("阿克苏"),
                  },
                  { name: "塔城地区", value: this.filterCityHandler("桂林") },
                  { name: "阿拉尔市", value: this.filterCityHandler("阿拉尔") },
                  { name: "喀什地区", value: this.filterCityHandler("喀什") },
                  {
                    name: "巴音郭楞蒙古自治州",
                    value: this.filterCityHandler("巴州"),
                  },
                  {
                    name: "昌吉回族自治州",
                    value: this.filterCityHandler("昌吉州"),
                  },
                  {
                    name: "伊犁哈萨克自治州",
                    value: this.filterCityHandler("伊犁州"),
                  },
                  {
                    name: "博尔塔拉蒙古自治州",
                    value: this.filterCityHandler("北海"),
                  },
                  {
                    name: "克拉玛依市",
                    value: this.filterCityHandler("克拉玛依"),
                  },
                  {
                    name: "克孜勒苏柯尔克孜自治州",
                    value: this.filterCityHandler("柳州"),
                  },
                  {
                    name: "乌鲁木齐市",
                    value: this.filterCityHandler("乌鲁木齐"),
                  },
                  { name: "双河市", value: this.filterCityHandler("双河") },
                  {
                    name: "可克达拉市",
                    value: this.filterCityHandler("可克达拉"),
                  },
                ],
              },
            ],
          });
          break;
        case "宁夏":
          this.myChart.myChart1.setOption({
            series: [
              {
                data: [
                  { name: "石嘴山市", value: this.filterCityHandler("石嘴山") },
                  { name: "银川市", value: this.filterCityHandler("银川") },
                  { name: "吴忠市", value: this.filterCityHandler("吴忠") },
                  { name: "中卫市", value: this.filterCityHandler("中卫") },
                  { name: "固原市", value: this.filterCityHandler("固原") },
                ],
              },
            ],
          });
          break;
        case "河北":
          this.myChart.myChart1.setOption({
            series: [
              {
                data: [
                  { name: "承德市", value: this.filterCityHandler("承德") },
                  { name: "张家口市", value: this.filterCityHandler("张家口") },
                  { name: "秦皇岛市", value: this.filterCityHandler("秦皇岛") },
                  { name: "唐山市", value: this.filterCityHandler("唐山") },
                  { name: "廊坊市", value: this.filterCityHandler("廊坊") },
                  { name: "保定市", value: this.filterCityHandler("保定") },
                  { name: "石家庄市", value: this.filterCityHandler("石家庄") },
                  { name: "衡水市", value: this.filterCityHandler("衡水") },
                  { name: "沧州市", value: this.filterCityHandler("沧州") },
                  { name: "邢台市", value: this.filterCityHandler("邢台") },
                  { name: "邯郸市", value: this.filterCityHandler("邯郸") },
                ],
              },
            ],
          });
          break;
        case "湖北":
          this.myChart.myChart1.setOption({
            series: [
              {
                data: [
                  { name: "武汉市", value: this.filterCityHandler("武汉") },
                  { name: "十堰市", value: this.filterCityHandler("十堰") },
                  {
                    name: "神农架林区",
                    value: this.filterCityHandler("神农架"),
                  },
                  { name: "襄阳市", value: this.filterCityHandler("襄阳") },
                  { name: "随州市", value: this.filterCityHandler("随州") },
                  { name: "孝感市", value: this.filterCityHandler("孝感") },
                  { name: "天门市", value: this.filterCityHandler("天门") },
                  { name: "荆门市", value: this.filterCityHandler("荆门") },
                  { name: "宜昌市", value: this.filterCityHandler("宜昌") },
                  {
                    name: "恩施土家族苗族自治州",
                    value: this.filterCityHandler("恩施州"),
                  },
                  { name: "荆州市", value: this.filterCityHandler("荆州") },
                  { name: "潜江市", value: this.filterCityHandler("潜江") },
                  { name: "仙桃市", value: this.filterCityHandler("仙桃") },
                  { name: "咸宁市", value: this.filterCityHandler("咸宁") },
                  { name: "黄石市", value: this.filterCityHandler("黄石") },
                  { name: "黄冈市", value: this.filterCityHandler("黄冈") },
                  { name: "鄂州市", value: this.filterCityHandler("鄂州") },
                ],
              },
            ],
          });
          break;
        case "安徽":
          this.myChart.myChart1.setOption({
            series: [
              {
                data: [
                  { name: "淮北市", value: this.filterCityHandler("淮北") },
                  { name: "亳州市", value: this.filterCityHandler("亳州") },
                  { name: "宿州市", value: this.filterCityHandler("宿州") },
                  { name: "淮南市", value: this.filterCityHandler("淮南") },
                  { name: "六安市", value: this.filterCityHandler("六安") },
                  { name: "合肥市", value: this.filterCityHandler("合肥") },
                  { name: "马鞍山市", value: this.filterCityHandler("马鞍山") },
                  { name: "宣城市", value: this.filterCityHandler("宣城") },
                  { name: "黄山市", value: this.filterCityHandler("黄山") },
                  { name: "安庆市", value: this.filterCityHandler("安庆") },
                  { name: "池州市", value: this.filterCityHandler("池州") },
                  { name: "铜陵市", value: this.filterCityHandler("铜陵") },
                  { name: "芜湖市", value: this.filterCityHandler("芜湖") },
                  { name: "蚌埠市", value: this.filterCityHandler("蚌埠") },
                  { name: "滁州市", value: this.filterCityHandler("滁州") },
                  { name: "黄冈市", value: this.filterCityHandler("黄冈") },
                  { name: "阜阳市", value: this.filterCityHandler("阜阳") },
                ],
              },
            ],
          });
          break;
        case "湖南":
          this.myChart.myChart1.setOption({
            series: [
              {
                data: [
                  { name: "长沙市", value: this.filterCityHandler("长沙") },
                  { name: "邵阳市", value: this.filterCityHandler("邵阳") },
                  { name: "衡阳市", value: this.filterCityHandler("衡阳") },
                  { name: "娄底市", value: this.filterCityHandler("娄底") },
                  { name: "益阳市", value: this.filterCityHandler("益阳") },
                  { name: "岳阳市", value: this.filterCityHandler("岳阳") },
                  { name: "常德市", value: this.filterCityHandler("常德") },
                  { name: "张家界市", value: this.filterCityHandler("张家界") },
                  {
                    name: "湘西土家族苗族自治州",
                    value: this.filterCityHandler("湘西自治州"),
                  },
                  { name: "怀化市", value: this.filterCityHandler("怀化") },
                  { name: "永州市", value: this.filterCityHandler("永州") },
                  { name: "湘潭市", value: this.filterCityHandler("湘潭") },
                  { name: "株洲市", value: this.filterCityHandler("株洲") },
                  { name: "郴州市", value: this.filterCityHandler("郴州") },
                ],
              },
            ],
          });
          break;
        case "甘肃":
          this.myChart.myChart1.setOption({
            series: [
              {
                data: [
                  { name: "金昌市", value: this.filterCityHandler("金昌") },
                  { name: "天水市", value: this.filterCityHandler("天水") },
                  { name: "陇南市", value: this.filterCityHandler("陇南") },
                  { name: "平凉市", value: this.filterCityHandler("平凉") },
                  { name: "庆阳市", value: this.filterCityHandler("庆阳") },
                  {
                    name: "甘南藏族自治州",
                    value: this.filterCityHandler("甘南州"),
                  },
                  {
                    name: "临夏回族自治州",
                    value: this.filterCityHandler("临夏"),
                  },
                  { name: "兰州市", value: this.filterCityHandler("兰州") },
                  { name: "白银市", value: this.filterCityHandler("白银") },
                  { name: "武威市", value: this.filterCityHandler("武威") },
                  { name: "张掖市", value: this.filterCityHandler("张掖") },
                  { name: "酒泉市", value: this.filterCityHandler("酒泉") },
                  { name: "定西市", value: this.filterCityHandler("定西") },
                  { name: "嘉峪关市", value: this.filterCityHandler("嘉峪关") },
                ],
              },
            ],
          });
          break;
        case "西藏":
          this.myChart.myChart1.setOption({
            series: [
              {
                data: [
                  { name: "阿里地区", value: this.filterCityHandler("阿里") },
                  { name: "那曲地区", value: this.filterCityHandler("那曲") },
                  { name: "拉萨市", value: this.filterCityHandler("拉萨") },
                  { name: "林芝市", value: this.filterCityHandler("林芝") },
                  { name: "昌都市", value: this.filterCityHandler("昌都") },
                  { name: "山南市", value: this.filterCityHandler("山南") },
                  { name: "日喀则市", value: this.filterCityHandler("日喀则") },
                ],
              },
            ],
          });
          break;
        case "贵州":
          this.myChart.myChart1.setOption({
            series: [
              {
                data: [
                  { name: "贵阳市", value: this.filterCityHandler("贵阳") },
                  { name: "铜仁市", value: this.filterCityHandler("铜仁") },
                  { name: "遵义市", value: this.filterCityHandler("遵义") },
                  { name: "毕节市", value: this.filterCityHandler("毕节") },
                  { name: "六盘水市", value: this.filterCityHandler("六盘水") },
                  { name: "安顺市", value: this.filterCityHandler("安顺") },
                  {
                    name: "黔南布依族苗族自治州",
                    value: this.filterCityHandler("黔南州"),
                  },
                  {
                    name: "黔东南苗族侗族自治州",
                    value: this.filterCityHandler("黔东南州"),
                  },
                  {
                    name: "黔西南布依族苗族自治州",
                    value: this.filterCityHandler("黔西南州"),
                  },
                ],
              },
            ],
          });
          break;
        case "吉林":
          this.myChart.myChart1.setOption({
            series: [
              {
                data: [
                  { name: "吉林市", value: this.filterCityHandler("吉林") },
                  { name: "松原市", value: this.filterCityHandler("松原") },
                  { name: "白城市", value: this.filterCityHandler("白城") },
                  { name: "四平市", value: this.filterCityHandler("四平") },
                  { name: "长春市", value: this.filterCityHandler("长春") },
                  { name: "辽源市", value: this.filterCityHandler("辽源") },
                  { name: "白山市", value: this.filterCityHandler("白山") },
                  { name: "通化市", value: this.filterCityHandler("通化") },
                  {
                    name: "延边朝鲜族自治州",
                    value: this.filterCityHandler("延边"),
                  },
                ],
              },
            ],
          });
          break;
        case "青海":
          this.myChart.myChart1.setOption({
            series: [
              {
                data: [
                  {
                    name: "玉树藏族自治州",
                    value: this.filterCityHandler("玉树州"),
                  },
                  {
                    name: "果洛藏族自治州",
                    value: this.filterCityHandler("果洛州"),
                  },
                  {
                    name: "黄南藏族自治州",
                    value: this.filterCityHandler("黄南州"),
                  },
                  {
                    name: "海南藏族自治州",
                    value: this.filterCityHandler("海南州"),
                  },
                  { name: "西宁市", value: this.filterCityHandler("西宁") },
                  {
                    name: "海北藏族自治州",
                    value: this.filterCityHandler("海北州"),
                  },
                  {
                    name: "海西蒙古族藏族自治州",
                    value: this.filterCityHandler("海西州"),
                  },
                  { name: "海东市", value: this.filterCityHandler("海东") },
                ],
              },
            ],
          });
          break;
        case "江西":
          this.myChart.myChart1.setOption({
            series: [
              {
                data: [
                  { name: "九江市", value: this.filterCityHandler("九江") },
                  { name: "南昌市", value: this.filterCityHandler("南昌") },
                  { name: "景德镇市", value: this.filterCityHandler("景德镇") },
                  { name: "上饶市", value: this.filterCityHandler("上饶") },
                  { name: "鹰潭市", value: this.filterCityHandler("鹰潭") },
                  { name: "抚州市", value: this.filterCityHandler("抚州") },
                  { name: "宜春市", value: this.filterCityHandler("宜春") },
                  { name: "萍乡市", value: this.filterCityHandler("萍乡") },
                  { name: "赣州市", value: this.filterCityHandler("赣州") },
                  { name: "新余市", value: this.filterCityHandler("新余") },
                  { name: "吉安市", value: this.filterCityHandler("吉安") },
                ],
              },
            ],
          });
          break;
        case "重庆":
          this.myChart.myChart1.setOption({
            series: [
              {
                data: [
                  { name: "城口县", value: this.filterCityHandler("城口县") },
                  { name: "巫溪县", value: this.filterCityHandler("巫溪县") },
                  { name: "巫山县", value: this.filterCityHandler("巫山县") },
                  { name: "奉节县", value: this.filterCityHandler("奉节县") },
                  { name: "开州区", value: this.filterCityHandler("开州区") },
                  { name: "云阳县", value: this.filterCityHandler("云阳县") },
                  { name: "万州区", value: this.filterCityHandler("万州区") },
                  { name: "梁平县", value: this.filterCityHandler("梁平区") },
                  { name: "忠县", value: this.filterCityHandler("忠县") },
                  { name: "垫江县", value: this.filterCityHandler("垫江县") },
                  {
                    name: "石柱土家族自治县",
                    value: this.filterCityHandler("石柱县"),
                  },
                  { name: "丰都县", value: this.filterCityHandler("丰都县") },
                  { name: "黔江区", value: this.filterCityHandler("黔江区") },
                  {
                    name: "秀山土家族苗族自治县",
                    value: this.filterCityHandler("秀山县"),
                  },
                  {
                    name: "酉阳土家族苗族自治县",
                    value: this.filterCityHandler("酉阳县"),
                  },
                  {
                    name: "彭水苗族土家族自治县",
                    value: this.filterCityHandler("彭水县"),
                  },
                  { name: "武隆县", value: this.filterCityHandler("武隆区") },
                  { name: "涪陵区", value: this.filterCityHandler("涪陵区") },
                  { name: "长寿区", value: this.filterCityHandler("长寿区") },
                  { name: "南川区", value: this.filterCityHandler("南川区") },
                  { name: "江津区", value: this.filterCityHandler("江津区") },
                  { name: "江北区", value: this.filterCityHandler("江北区") },
                  { name: "荣昌区", value: this.filterCityHandler("荣昌区") },
                  { name: "大足区", value: this.filterCityHandler("大足区") },
                  { name: "铜梁区", value: this.filterCityHandler("铜梁区") },
                  { name: "合川区", value: this.filterCityHandler("合川区") },
                  { name: "潼南区", value: this.filterCityHandler("潼南区") },
                  {
                    name: "两江新区",
                    value: this.filterCityHandler("两江新区"),
                  },
                  { name: "璧山区", value: this.filterCityHandler("璧山区") },
                  {
                    name: "沙坪坝区",
                    value: this.filterCityHandler("沙坪坝区"),
                  },
                  { name: "巴南区", value: this.filterCityHandler("巴南区") },
                  { name: "渝北区", value: this.filterCityHandler("渝北区") },
                  {
                    name: "九龙坡区",
                    value: this.filterCityHandler("九龙坡区"),
                  },
                  { name: "渝中区", value: this.filterCityHandler("渝中区") },
                  { name: "南岸区", value: this.filterCityHandler("南岸区") },
                  { name: "永川区", value: this.filterCityHandler("永川区") },
                  { name: "綦江区", value: this.filterCityHandler("綦江区") },
                  {
                    name: "大渡口区",
                    value: this.filterCityHandler("大渡口区"),
                  },
                  { name: "高新区", value: this.filterCityHandler("高新区") },
                ],
              },
            ],
          });
          break;
        case "海南":
          this.mapdata.features.forEach((item) => {
            if (item.properties.name === "三沙市") {
              item.geometry.coordinates = [["@@HCFCFEBGEKMAMLCHAH"]];
              item.geometry.encodeOffsets = [[[115046, 17318]]];
              item.properties.childNum = 3;
            }
          });
          this.myChart.myChart1.setOption({
            series: [
              {
                data: [
                  { name: "三亚市", value: this.filterCityHandler("三亚") },
                  { name: "海口市", value: this.filterCityHandler("海口") },
                  { name: "东方市", value: this.filterCityHandler("东方") },
                  { name: "万宁市", value: this.filterCityHandler("万宁") },
                  { name: "澄迈县", value: this.filterCityHandler("澄迈县") },
                  {
                    name: "昌江黎族自治县",
                    value: this.filterCityHandler("昌江县"),
                  },
                  {
                    name: "保亭黎族苗族自治县",
                    value: this.filterCityHandler("保亭"),
                  },
                  { name: "琼海市", value: this.filterCityHandler("琼海") },
                  { name: "临高县", value: this.filterCityHandler("临高县") },
                  {
                    name: "陵水黎族自治县",
                    value: this.filterCityHandler("陵水县"),
                  },
                  {
                    name: "乐东黎族自治县",
                    value: this.filterCityHandler("乐东"),
                  },
                  { name: "文昌市", value: this.filterCityHandler("文昌") },
                  { name: "定安县", value: this.filterCityHandler("定安县") },
                  {
                    name: "琼中黎族苗族自治县",
                    value: this.filterCityHandler("琼中县"),
                  },
                  { name: "五指山市", value: this.filterCityHandler("五指山") },
                  {
                    name: "白沙黎族自治县",
                    value: this.filterCityHandler("白沙县"),
                  },
                  { name: "屯昌县", value: this.filterCityHandler("屯昌县") },
                  { name: "儋州市", value: this.filterCityHandler("儋州") },
                ],
              },
            ],
          });
          break;
        default:
          break;
      }
    },
    initCharts() {
      let option = {
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
      };
      this.myChart.myChart2 = echarts.init(this.$refs.Echarts2);
      this.myChart.myChart3 = echarts.init(this.$refs.Echarts3);
      this.myChart.myChart2.setOption(option);
      this.myChart.myChart3.setOption(option);
    },
    setoption() {
      // console.log(this.myChart.myChart2);
      this.myChart.myChart2.setOption({
        title: {
          text: `${this.city}疫情新增趋势`,
        },
        color: ["#F06061", "#65B379", "#87878B"],
        legend: {
          data: ["新增确诊", "新增治愈", "新增死亡"],
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
            name: "新增确诊",
            data: this.state.cityAdd.confirmAdd,
            lineStyle: {
              color: "#F06061",
            },
          },
          {
            type: "line",
            name: "新增治愈",
            data: this.state.cityAdd.healAdd,
            lineStyle: {
              color: "#65B379",
            },
          },
          {
            type: "line",
            name: "新增死亡",
            data: this.state.cityAdd.deadAdd,
            lineStyle: {
              color: "#87878B",
            },
          },
        ],
        xAxis: [
          {
            data: this.state.cityAdd.data,
          },
        ],
      });
      this.myChart.myChart3.setOption({
        title: {
          text: `${this.city}疫情累计趋势`,
        },
        color: ["#FF7B7C", "#9B0A0E", "#65B379", "#87878B"],
        legend: {
          data: ["现有确诊", "累计确诊", "累计治愈", "累计死亡"],
          right: "5%",
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
            name: "现有确诊",
            data: this.state.citytotal.nowConfirm,
            lineStyle: {
              color: "#FF7B7C",
            },
          },
          {
            type: "line",
            name: "累计确诊",
            data: this.state.citytotal.totalConfirm,
            lineStyle: {
              color: "#9B0A0E",
            },
          },
          {
            type: "line",
            name: "累计治愈",
            data: this.state.citytotal.totaHeal,
            lineStyle: {
              color: "#65B379",
            },
          },
          {
            type: "line",
            name: "累计死亡",
            data: this.state.citytotal.totalDead,
            lineStyle: {
              color: "#87878B",
            },
          },
        ],
        xAxis: [
          {
            data: this.state.cityAdd.data,
          },
        ],
      });

    },
    filterCityHandler(cityname, type = 0) {
      // console.log(cityname)
      let arr = "0";
      if (type !== 0) {
        this.defaults = "Confirm";
      }
      this.state[this.defaults].forEach((item) => {
        if (item.name === cityname) {
          arr = item.value;
        }
      });
      return arr;
    },
    changmaptype(num) {
      if (num === 0) {
        if (this.defaults === "NowConfirm") {
          console.log("biedianle");
        } else {
          this.defaults = "NowConfirm";
          this.SetOptionHandler(this.city);
        }
      } else {
        if (this.defaults === "Confirm") {
          console.log("biedianle");
        } else {
          this.defaults = "Confirm";
          this.SetOptionHandler(this.city);
        }
      }
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
  mounted() {
    this.initCharts();
    
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
};
</script>

<style lang="scss" scoped>
.detaiBox {
  background-color: blue;
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
      font-size: 2.667vw;
      line-height: 2.667vw;
      height: 2.667vw;
      font-weight: 500;
    }
    .num {
      font-size: 5.867vw;
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
  .address {
    background-color: #fff;
    padding: 5vw;
    .addressBox {
      background-color: #f8f8f8;
      border-radius: 1.6vw;
      padding: 3.2vw 0vw;
      .cityname {
        line-height: 3.733vw;
        font-size: 3.733vw;
        color: #005dff;
        font-weight: 600;
        padding-left: 4.267vw;
        margin-left: 4vw;
        position: relative;
        span {
          &::before {
            content: ".";
            font-size: 0;
            line-height: 0;
            display: block;
            position: absolute;
            width: 3.733vw;
            left: 1vw;
            top: 53%;
            height: 3.733vw;
            transform: translateY(-56%);
            background: url(https://mat1.gtimg.com/news/feiyanarea/icon_location.png);
            background-size: 100% 100%;
          }
        }
      }
      .detail {
        display: flex;
        margin: 3.2vw 0 0;
        line-height: 3.733vw;
        font-size: 3.733vw;
        justify-content: center;
        -webkit-box-pack: center;
        p {
          width: 25%;
          text-align: center;
          font-size: 1em;
          span {
            font-weight: 700;
            margin-right: 0.1vw;
          }
        }
      }
    }
  }
  .Echarts {
    height: 100vw;
    background-color: #fff;
    padding: 5vw;
    position: relative;
    .EchartsBOX {
      height: 100vw;
    }
    .btnbox {
      position: absolute;
      right: 5.333vw;
      bottom: 5vw;
      float: left;
      z-index: 2;
      height: 6.933vw;
      span {
        display: block;
        width: 17.067vw;
        line-height: normal;
        text-align: center;
        font-size: 3.2vw;
        padding: 0.8vw 0;
        border: 1px solid #efefef;
        float: left;
        position: relative;
        margin: 0 -1px;
        &:last-child {
          border-radius: 0 1.6vw 1.6vw 0;
        }
        &:first-child {
          border-radius: 1.6vw 0 0 1.6vw;
        }
      }
      .current {
        background-color: #eef4ff;
        border-color: #ccdeff;
        color: #005dff;
        z-index: 2;
      }
    }
  }
  .cityAddEcharts {
    padding: 2vw;
    background-color: #fff;
    .EchartsBOX {
      height: 50vw;
      width: 100%;
    }
  }
  .tabls {
    padding: 2vw 5vw;
    background-color: #fff;
    .title{
      margin:3vw 0;
      span{
        display: inline-block;
        position: relative;
        font-size: 4.267vw;
        margin:1vw 0;
        line-height: normal;
        color: #222;
        font-weight: 700;
      }
      p{
        font-size: 3.2vw;
        line-height: 3.467vw;
        color: #737373;
      }
    }
    .body {
      table{
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
            line-height: 10.667vw;
            text-align: center;
            font-size: 3.2vw;
            font-weight: 400;
            padding: 0;
            margin: 0;
            border: 0;
            border-right: 1px solid #fff;
            border-collapse: collapse;
            &:nth-child(2) {
              background-color: #e8effc;
              color: #005dff;
              width: 18.933vw;
            }
            &:nth-child(3) {
              background-color: #fdeeee;
              color: #f55253;
              width: 18.933vw;
            }
            &:nth-child(4) {
              background-color: #e9f7ec;
              color: #178b50;
              width: 13.867vw;
            }
            &:first-child {
              background-color: #f2f5f7;
              width: 20vw;
              text-align: left;
              padding-left: 2.133vw;
            }
            &:last-child {
              background-color: #f2f2f2;
              color: #66666c;
              border-right: 0;
            }
          }
        }
        tbody{
          line-height: 10.667vw;
          height: 10.667vw;
          font-size: 3.733vw;
          th{
            text-align: left;
            padding-left: 2.133vw;
            font-weight: 400;
            line-height: 4.8vw;
            vertical-align: center;
            position: relative;
            &::before{
              content: ".";
              font-size: 0;
              line-height: 0;
              display: block;
              position: absolute;
              left: 0;
              right: 0;
              height: 1px;
              background-color: #f5f5f5;
              bottom: 0;
            }
          }
          td{
            text-align: center;
            position: relative;
            &::before{
              content: ".";
              font-size: 0;
              line-height: 0;
              display: block;
              position: absolute;
              left: 0;
              right: 0;
              height: 1px;
              background-color: #f5f5f5;
              bottom: 0;
            }
          }
        }
      }
    }
  }
  .Hospital{
    background-color: #fff;
    padding: 2vw 5vw;
    .title{
      box-sizing: border-box;
      height: 4.8vw;
      line-height: normal;
      color: #222;
      font-size: 3.733vw;
      font-weight: 700;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 1vw 0;
      span{
        display: inline-block;
        position: relative;
        font-size: 4.267vw;
      }
    }
    .swiperbox{
    width: 90.133vw;
    position: relative;
      .items{
        width: 25%;
        overflow: hidden;
        position: relative;
        float: left;
        a{
          text-decoration:none
        }
        .citynames{
          height: 14.933vw;
          padding: 0 3.2vw;
          margin: 0 .8vw .8vw 0;
          border-radius: 1.6vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          background-color: #f3f6f8;
          .title{
                      font-size: 3.733vw;
          line-height: 4.267vw;
          max-height: 8.533vw;
          margin-bottom: 2.133vw;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          }
          .num{
            font-size: 3.2vw;
            line-height: 3.2vw;
            color: #2b78fd;
            position: relative;
            width: 12vw;
            &::before{
              content: ".";
              font-size: 0;
              line-height: 0;
              display: block;
              position: absolute;
              width: 2.667vw;
              height: 2.667vw;
              right: 1vw;
              top: 50%;
              -webkit-transform: translateY(-50%);
              transform: translateY(-50%);
              background: url(https://mat1.gtimg.com/news/feiyanarea/icon_news_more.png);
              background-size: 100% 100%;
            }
          }
        }
      }
    }
  }
}
</style>