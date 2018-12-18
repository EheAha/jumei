const path = require('path')

function resolve (url) {
    return path.resolve(__dirname,url)
}

module.exports = {
    chainWebpack:(config)=>{
        config.resolve.alias
        .set('styles',resolve('./src/assets/styles'))
        .set('components',resolve('./src/components'))
        .set('pages',resolve('./src/pages'))
        .set('utils',resolve('./src/utils'))
    },
    devServer:{
        proxy:{
            '/index': {
                target: 'https://h5.jumei.com',
                changeOrigin: true,
                headers:{'Cookie':'default_site_25=bj; first_visit=1; first_visit_time=1541378420; _adwp=265569940.0047493922.1541378425.1541378425.1541378425.1; _adwr=265569940%23https%253A%252F%252Fwww.baidu.com%252Flink%253Furl%253DQIt50faJcKUbm_mRtXBi-6s12C9Q-9NurgFrk9PfSse%2526wd%253D%2526eqid%253Da806e5f200042445000000035bdf9170; __utma=1.976338288.1541378426.1541378426.1541378426.1; __utmz=1.1541378426.1.1.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; __xsptplus428=428.1.1541378426.1541378426.1%232%7Cwww.baidu.com%7C%7C%7C%7C%23%23HT38eDodGvSv1yh5b9UnfmLrqFUpHblV%23; frwap=wap; has_download=1; guide_download_show=1; from_source=browser; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22166e150cd00838-07dcb30e00878c-2d604637-250125-166e150cd0273a%22%2C%22props%22%3A%7B%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%7D%7D; referer_site_cps=wap_touch_; PHPSESSID=4ace4afc096baaf3d834a6d760385907; Hm_lvt_884477732c15fb2f2416fb892282394b=1541378426,1541512516; sid=4ace4afc096baaf3d834a6d760385907; route=584235e27154eb6f190a5228fa13dee8; TY_SESSION_ID=da483b99-fa44-4847-b4ad-4631641244aa; device_platform=iphone; referer_site=wap_touch_; jmdl14=2; jml14=2'}
              },
            '/product': {
                target: 'https://h5.jumei.com',
                changeOrigin: true,
                headers:{'Cookie':'sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22166f33e444b8f1-055a8d86212cc6-181c7151-1440000-166f33e444c5e%22%2C%22props%22%3A%7B%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%7D%7D; referer_site_cps=wap_touch_; guide_download_show=1; from_source=browser; has_download=1; Hm_lvt_884477732c15fb2f2416fb892282394b=1541679246; PHPSESSID=88cd946ae3b52b6c239068bbd8427b56; jmdl14=2; jml14=2; referer_site=wap_browser_wap_touch_; sid=88cd946ae3b52b6c239068bbd8427b56; route=09168854e227bb12e8716ae5f2136dfd; device_platform=iphone; TY_SESSION_ID=991a9059-7b6a-48fc-ab02-f4ae8d63d26f; jump_info=%7B%22com.jumei.iphone%22%3A%7B%22jumeimallUrl%22%3A%22jumeimall%253A%252F%252Fpage%252Fweb%253Furl%253Dhttp%25253A%25252F%25252Fh5.jumei.com%25252Factivity%25252Fdetailv2%25253Flabel%25253D20181111cosmetic_1145_app%252526type%25253Djmstore%22%7D%7D'}
            },
            '/yiqituan': {
                target: 'https://h5.jumei.com',
                changeOrigin: true
            }
        }      
    }
}