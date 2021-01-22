import axios from 'axios'

export const getLocationCity = () => {
    return axios({
        url: '/souhu/cityjson',
        method: 'get'
    })
}

export const getcityListData = () => {
    return axios({
        url: '/citylist/citylist?',//disease_foreign
        method: 'get'
    })
}

export const getCityInfoData = (id,id2) => {
    let url = `/citylist/citypolicy?&city_id=${id},${id2}`
    return axios({
        url: url,
        method: 'get'
    })
}

export const getChinaData = () => {
    return axios({
        url: '/inews/getOnsInfo?name=disease_h5',//disease_foreign
        method: 'get'
    })
}
export const getChinaCityMapData = (cityname) => {
    return axios({
        url: `/gtimg/${cityname}.json`,//disease_foreign
        method: 'get'
    })
}
export const getCityHospitalData = (city) => {
    return axios({
        url: '/wecity/getHospitalCityByProvince',
        method: 'post',
        data: {
            "service": "THPneumoniaOuterService",
            "args": { "req": { "province": city } },
            "func": "getHospitalCityByProvince"
        }
    })
}
export const getUNDate = () => {
    return axios({
        url: '/inews/getOnsInfo?name=disease_foreign',
        method: 'get',
    })
}
export const getUnCityData = () => {
    return axios({
        url: 'https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=FAutoGlobalStatis,FAutoContinentStatis,FAutoGlobalDailyList,FAutoCountryConfirmAdd',
        method: 'post'
    })
}

export const getCountryDetailDatas = (city) => {
    return axios({
        url: `https://api.inews.qq.com/newsqa/v1/automation/foreign/daily/list?country=${city}`,
        method: 'post'
    })
}

export const getUnRankCityData = () => {
    return axios({
        url: 'https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=FAutoCountryWeekCompRank,FAutoContinentConfirmStatis,FAutoConfirmMillionRankList,FAutoHealDeadRateRankList',
        method: 'post'
    })
}

export const getUnRankDatas = () => {
    return axios({
        url: 'https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=FAutoforeignList',
        method: 'get'
    })
}

export const getFAutoCountryNowConfirmMerge = () => {
    return axios({
        url: 'https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=FAutoCountryNowConfirmMerge',
        method: 'post'
    })
}

export const getFAutoCountryHealMerge = () => {
    return axios({
        url: 'https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=FAutoCountryHealMerge',
        method: 'post'
    })
}

export const getChinaCityData = () => {
    return axios({
        url: 'https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=chinaDayList,chinaDayAddList,cityStatis,nowConfirmStatis,provinceCompare',
        method: 'post'
    })
}

export const getChinaCityDetailData = (cityname,type=0) => {
    let children = ''
    switch (cityname) {
        case '四川':
            children = '成都'
            break;
        case '辽宁':
            children = '沈阳'
            break;
        case '黑龙江':
            children = '哈尔滨'
            break;
        case '河北':
            children = '石家庄'
            break;
        case '云南':
            children = '昆明'
            break;
        case '甘肃':
            children = '兰州'
            break;
        case '吉林':
            children = '长春'
            break;
        case '青海':
            children = '西宁'
            break;
        case '陕西':
            children = '西安'
            break;
        case '河南':
            children = '郑州'
            break;
        case '山东':
            children = '济南'
            break;
        case '山西':
            children = '太原'
            break;
        case '安徽':
            children = '合肥'
            break;
        case '湖北':
            children = '武汉'
            break;
        case '湖南':
            children = '长沙'
            break;
        case '江苏':
            children = '南京'
            break;
        case '贵州':
            children = '贵阳'
            break;
        case '广西':
            children = '南宁'
            break;
        case '浙江':
            children = '杭州'
            break;
        case '江西':
            children = '南昌'
            break;
        case '广东':
            children = '广州'
            break;
        case '福建':
            children = '福州'
            break;
        case '内蒙古':
            children = '呼和浩特'
            break;
        case '海南':
            children = '海口'
            break;
        case '宁夏':
            children = '银川'
            break;
        case '新疆':
            children = '乌鲁木齐'
            break;
        case '西藏':
            children = '拉萨'
            break;
        default:
            break;
    }
    let url = `https://api.inews.qq.com/newsqa/v1/query/pubished/daily/list?province=${cityname}`
    if(type === 1){
        if (children !== '') {
            url = `https://api.inews.qq.com/newsqa/v1/query/pubished/daily/list?province=${cityname}&city=${children}`
        }
    }
    return axios({
        url: url,
        method: 'post'
    })
}
export const getRiskarea = () => {
    return axios({
        url: 'https://eyesight.news.qq.com/sars/riskarea',
        method: 'get'
    })
}
export const getUNRankData = () => {
    return axios({
        url: 'https://api.inews.qq.com/newsqa/v1/automation/foreign/country/ranklist',
        method: 'post'
    })
}
export const getUN8Data = () => {
    return axios({
        url: 'https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=FAutoCountryMerge',
        method: 'post'
    })
}

export const getChinaCityNow = () => {
    return axios({
        url: 'https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail',
        method: 'post'
    })
}

//获取无症状感染者
export const getAsymptomaticInfection = () => {
    return axios({
        url: 'https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=asymptomaticProvince',
        method: 'get'
    })
}