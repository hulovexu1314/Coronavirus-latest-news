<template>
    <div class="head_box">
        <div class="head">
            <div v-if="!city" class="title"></div>
            <div  v-if="city" class="city">{{city}}<span v-if="city" class="after" ></span></div>
            <div class="info" :class="[{ current: city}]">数据来源：{{Datafrom === ''?'国家及各地卫健委每日信息发布':Datafrom}}</div>
            <router-link :to="{name:'home'}" tag="span" class="back" v-if="city"> &lt; 返回</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name:'banner',
    methods:{

    },
    props:{
        city:String,
        Datafrom:String
    }
}
</script>

<style lang="scss" scoped>
.head_box{
    width: 100vw;
    background: url(../assets/bg.gif);
    background-size: 100% 100%;
    height: 40vw;
    position: relative;
    .head{
        display: flex;
        justify-content: center;
        align-items: center;
        .title{
            width: 50.667vw;
            height: 16.533vw;
            position: absolute;
            left: 50%;
            transform: translate(-50%);
            top: 14vw;
            background: url(https://mat1.gtimg.com/news/images/inews/2020/feiyan/area/head_title.png);
            background-size: 100% 100%;
        }
        .city{
            display: inline-block;
            font-size: 5.867vw;
            font-weight: bolder;
            line-height: 8vw;
            color: #0056ee;
            background-color: #fff;
            padding: 0 1.333vw;
            border-radius: 1.067vw;
            position: absolute;
            bottom: 15vw;
            left: 5vw;
            &::after{
                content: ".";
                font-size: 0;
                line-height: 0;
                display: block;
                position: absolute;
                width: 29.867vw;
                height: 7.467vw;
                background: url(https://mat1.gtimg.com/news/images/inews/2020/feiyan/area/area_h2_bg.png);
                background-size: 100% 100%;
                right: -31.467vw;
                top: 50%;
                transform: translateY(-50%);
            }
        }
        .info{
            text-align: center;
            position: absolute;
            bottom: 5vw;
            line-height: 3.733vw;
            height: 3.733vw;
            font-size: 3.2vw;
            color: #fff;
        }
        .back{
            position: absolute;
            top: 4vw;
            left:0;
            width: 15vw;
            height: 6vw;
            font-family: '微软雅黑';
            font-size: 3.2vw;
            text-align: center;
            line-height: 6vw;
            color: #FFFFFF;
            background:#4587FF;
            border-radius:  0 3vw 3vw 0;
        }
        .current{
            left:6vw;
            bottom: 7vw;
        }
    }

}
</style>