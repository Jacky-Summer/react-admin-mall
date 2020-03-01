import MUtil from 'util/mutil.js'

const _util = new MUtil()

class Statistic {
    // 首页数据统计
    getHomeCount(){
        return _util.request({
            url: '/manage/statistic/base_count.do'
        })
    }
}

export default Statistic