<template>
  <div :class="formatColor">
      <p class="title">{{formatName}}</p>
      <div v-if="num !== 0" class="num">{{num}}个</div>
  </div>
</template>

<script>
export default {
    name:'tag',
    props:{
        type:{
            type:Number,
            default:0,
            required:false
        },
        num:{
            type:Number,
            default:0,
            required:false
        },
        styles:{
            type:Number,
            default:1,
            required:false
        }
    },
    data(){
        return{
            types:0
        }
    },
    computed:{
        formatName(){
            if(this.styles===1){
                switch (this.type) {
                    case 1:
                        return '中风险地区'
                    case 2:
                        return '高风险地区'
                    default:
                    return '低风险地区'
                }
            } else {
                switch (this.type) {
                    case 1:
                        return '中风险'
                    case 2:
                        return '高风险'
                    default:
                    return '低风险'
                }
            }
        },
        formatColor(){
            switch (this.type) {
                case 1:
                    return 'middlearea'
                case 2:
                    return 'higharea'
                default:
                return 'lowarea'
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.middlearea{
    border: .5px solid #ff9c42;
    background: #ffefe7;
    display: flex;
    border-radius: .8vw;
    margin: 0 0 0 3.2vw;
    overflow: hidden;
    .num{
        background: #ff7d32;
        font-size: 2.667vw;
        color: #fff;
        padding: .8vw;
        font-weight: 600;
    }
    .title{
        font-size: 2.667vw;
        color: #ff7d32;
        padding: .853vw .533vw 0 1.067vw;
    }
}
.higharea{
    border: .5px solid #ff5656;
    background: #ffebeb;
    display: flex;
    border-radius: .8vw;
    margin: 0 0 0 3.2vw;
    overflow: hidden;
    .num{
        background: #ff5656;
        font-size: 2.667vw;
        color: #fff;
        padding: .8vw;
        font-weight: 600;
    }
    .title{
        font-size: 2.667vw;
        color: #ff3939;
        padding: .853vw .533vw 0 1.067vw;
    }
}
.lowarea{
    border: .5px solid #11b000;
    background: #e2f3d7;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    border-radius: .8vw;
    margin: 0 0 0 3.2vw;
    padding: .853vw .8vw;
    overflow: hidden;
    .title{
    font-size: 2.667vw;
    color: #11b000;
    padding: 0 .533vw 0 1.067vw;
    }
}
</style>