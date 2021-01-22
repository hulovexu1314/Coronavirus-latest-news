<template>
  <div>
    <div class="head">
      
    </div>
    <div class="main">
      <Selects :datalist="datalist" />
    </div>
    <div class="footer">
      <Policy @datalists="cityData"/>
    </div>
  </div>
</template>

<script>
import {getcityListData,getLocationCity} from '../api/request.js'
import Selects from '../components/select.vue'
import Policy from '../components/policy.vue'
export default {
  name: "sftravel",
  components:{
    Selects,
    Policy
  },
  data(){
    return {
      datalist:['四川','四川','四川','四川','四川','四川','四川','四川','四川','四川','四川','四川','四川','四川',],
      cityData: {},
    }
  },
  async created(){
    try{
      const res = await this.getCityList()
      const ress = await this.getLocationAddress()
      const { result } = res.data
      let address = ress.data.slice(ress.data.indexOf('=') + 2)
      address = JSON.parse(address.slice(0,address.length-1))
      console.log(address);
      // console.log('国内城市列表',result);
      this.datalist = result
    }catch(err){
      console.log(err);
    }
  },
  methods:{
    getLocationAddress(){
      return new Promise((resolve,reject) => {
        getLocationCity().then((res) => {
        resolve(res)
      }).catch(err => reject(err))})
    },
    getCityList(){
      return new Promise((resolve,reject) => {
        getcityListData().then((res) => {
        resolve(res)
      }).catch(err => reject(err))})
    },
  }
};
</script>
<style scoped lang='scss'>

</style>