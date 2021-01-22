const CompressionPlugin = require("compression-webpack-plugin")
const productionGzipExtensions = ['js', 'css']
module.exports = {
  publicPath: './',
  devServer:{
        // https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5
        proxy:{
          '/inews': {
            target:'https://view.inews.qq.com/g2',
            ws:true,
            changeOrigin:true,
            pathRewrite:{
              '^/inews':''
            }
          },
          //https://mat1.gtimg.com/news/feiyanarea/hubei.json
          '/gtimg':{
            target:'https://mat1.gtimg.com/news/feiyanarea',
            ws:true,
            changeOrigin:true,
            pathRewrite:{
              '^/gtimg':''
            }
          },
          //https://wechat.wecity.qq.com/api/THPneumoniaService/getHospitalCityByProvince
          '/wecity':{
            target:'https://wechat.wecity.qq.com/api/THPneumoniaService',
            ws:true,
            changeOrigin:true,
            pathRewrite:{
              '^/wecity':''
            }
          },
          '/citylist':{
            target:'https://r.inews.qq.com/api/trackmap',
            ws:true,
            changeOrigin:true,
            pathRewrite:{
              '^/citylist':''
            }
          },
          '/souhu':{
            target:'http://pv.sohu.com',
            ws:true,
            changeOrigin:true,
            pathRewrite:{
              '^/souhu':''
            }
          },
        }
  },
  productionSourceMap: false,
  configureWebpack: config => {
    plugins: [
      new CompressionPlugin({
        filename: '[path].gz[query]',   // 提示compression-webpack-plugin@3.0.0的话asset改为filename
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }),
    ]
  }
}